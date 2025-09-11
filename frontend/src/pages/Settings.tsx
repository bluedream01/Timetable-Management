import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { LanguageSelector } from '@/components/LanguageSelector';
import { User, Bell, Shield, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Settings: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleNotificationToggle = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">{t('settings')}</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} disabled />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue={user?.department} />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue={user?.role} disabled />
              </div>
            </div>
            <Button onClick={handleSaveProfile} className="bg-gradient-primary hover:opacity-90">
              Save Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Language Preference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Select Your Preferred Language</p>
                <p className="text-sm text-muted-foreground">
                  The entire interface will be displayed in your selected language
                </p>
              </div>
              <LanguageSelector />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about timetable changes
                </p>
              </div>
              <Switch onCheckedChange={handleNotificationToggle} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Class Reminders</p>
                <p className="text-sm text-muted-foreground">
                  Get notified 30 minutes before class starts
                </p>
              </div>
              <Switch defaultChecked onCheckedChange={handleNotificationToggle} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Assignment Updates</p>
                <p className="text-sm text-muted-foreground">
                  Notify when new assignments are uploaded
                </p>
              </div>
              <Switch defaultChecked onCheckedChange={handleNotificationToggle} />
            </div>
          </CardContent>
        </Card>

        {user?.role === 'admin' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Admin Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Multi-Department Scheduling</p>
                  <p className="text-sm text-muted-foreground">
                    Enable scheduling across multiple departments
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Multi-Shift Support</p>
                  <p className="text-sm text-muted-foreground">
                    Allow morning and evening shift scheduling
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};