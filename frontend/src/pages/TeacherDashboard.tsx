import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarView } from '@/components/CalendarView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Phone, FolderOpen } from 'lucide-react';
import { DayOfWeek, TimeSlot } from '@/types';

const mockSchedule: { [key in DayOfWeek]: TimeSlot[] } = {
  monday: [
    { id: '1', startTime: '09:00', endTime: '10:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-101', batch: 'Batch A' },
    { id: '2', startTime: '10:00', endTime: '11:00', subject: 'Algorithms', faculty: 'Dr. Sharma', room: 'CS-102', batch: 'Batch B' },
  ],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: []
};

export const TeacherDashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="opacity-90">Manage your classes and review timetables</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Timetable Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-primary hover:opacity-90">
              <Send className="mr-2 h-4 w-4" />
              Send to Admin for Review
            </Button>
            <Button variant="outline" className="w-full">
              <Phone className="mr-2 h-4 w-4" />
              Call Admin (Follow-up)
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>{t('chapterManagement')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              <FolderOpen className="mr-2 h-4 w-4" />
              Create New Chapter
            </Button>
            <div className="text-sm text-muted-foreground">
              <p>• Chapter 1: Introduction</p>
              <p>• Chapter 2: Basic Concepts</p>
              <p>• Chapter 3: Advanced Topics</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>My Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarView schedule={mockSchedule} editable={true} />
        </CardContent>
      </Card>
    </div>
  );
};