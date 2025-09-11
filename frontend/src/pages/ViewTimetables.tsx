import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarView } from '@/components/CalendarView';
import { Eye, Edit, Send, CheckCircle, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ViewTimetables: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTimetable, setSelectedTimetable] = useState<any>(null);

  const timetables = [
    {
      id: 1,
      name: 'CS Department - Semester 1',
      createdDate: '2024-01-15',
      status: 'finalized',
      department: 'CS',
    },
    {
      id: 2,
      name: 'ECE Department - Semester 1',
      createdDate: '2024-01-14',
      status: 'underReview',
      department: 'ECE',
    },
    {
      id: 3,
      name: 'EEE Department - Semester 1',
      createdDate: '2024-01-13',
      status: 'draft',
      department: 'EEE',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      finalized: 'default',
      underReview: 'secondary',
      draft: 'outline',
    };
    return <Badge variant={variants[status] || 'outline'}>{t(status)}</Badge>;
  };

  const handleView = (id: number) => {
    const mockTimetable = {
      monday: [
        { time: '9:00-10:00', subject: 'Mathematics', room: 'Room 101', faculty: 'Dr. Sharma' },
        { time: '10:00-11:00', subject: 'Physics', room: 'Room 102', faculty: 'Prof. Kumar' },
      ],
    };
    setSelectedTimetable(mockTimetable);
    toast({
      title: "Timetable Loaded",
      description: "Viewing timetable details.",
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Mode",
      description: "You can now edit this timetable.",
    });
  };

  const handleSendToAdmin = (id: number) => {
    toast({
      title: "Sent to Admin",
      description: "Timetable has been sent for admin review.",
    });
  };

  const handleApprove = (id: number) => {
    toast({
      title: "Timetable Approved",
      description: "The timetable has been approved and sent to students.",
    });
  };

  const handleCallAdmin = () => {
    toast({
      title: "Admin Notified",
      description: "Admin has been notified about the delay.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t('viewTimetables')}</h1>
        {user?.role === 'teacher' && (
          <Button onClick={handleCallAdmin} variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Call Admin (Follow-up)
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {timetables.map((timetable) => (
          <Card key={timetable.id} className="hover:shadow-card transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{timetable.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Created: {new Date(timetable.createdDate).toLocaleDateString()}
                  </p>
                </div>
                {getStatusBadge(timetable.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleView(timetable.id)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                
                {(user?.role === 'admin' || user?.role === 'teacher') && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(timetable.id)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}

                {user?.role === 'teacher' && timetable.status === 'draft' && (
                  <Button
                    size="sm"
                    onClick={() => handleSendToAdmin(timetable.id)}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send to Admin
                  </Button>
                )}

                {user?.role === 'admin' && timetable.status === 'underReview' && (
                  <Button
                    size="sm"
                    onClick={() => handleApprove(timetable.id)}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTimetable && (
        <Card>
          <CardHeader>
            <CardTitle>Timetable Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarView timetable={selectedTimetable} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};