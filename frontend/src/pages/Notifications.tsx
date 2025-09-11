import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Notifications: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const notifications = [
    {
      id: 1,
      title: 'Timetable Updated',
      message: 'Your timetable for CS Department has been updated',
      time: '2 hours ago',
      type: 'info',
      read: false,
    },
    {
      id: 2,
      title: 'Class Reminder',
      message: 'Mathematics class starts in 30 minutes in Room 101',
      time: '30 minutes ago',
      type: 'warning',
      read: false,
    },
    {
      id: 3,
      title: 'New Assignment',
      message: 'Dr. Sharma has uploaded a new assignment for Physics',
      time: '1 day ago',
      type: 'success',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'success':
        return <Check className="h-5 w-5 text-success" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const handleMarkAsRead = (id: number) => {
    toast({
      title: "Marked as Read",
      description: "Notification has been marked as read.",
    });
  };

  const handleMarkAllAsRead = () => {
    toast({
      title: "All Marked as Read",
      description: "All notifications have been marked as read.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t('notifications')}</h1>
        <Button variant="outline" onClick={handleMarkAllAsRead}>
          <Check className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`transition-all ${
              !notification.read ? 'border-primary/50 bg-primary/5' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getIcon(notification.type)}
                  <div>
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
                {!notification.read && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {notification.time}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};