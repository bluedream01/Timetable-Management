import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarView } from '@/components/CalendarView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, User } from 'lucide-react';
import { DayOfWeek, TimeSlot } from '@/types';

const mockSchedule: { [key in DayOfWeek]: TimeSlot[] } = {
  monday: [
    { id: '1', startTime: '09:00', endTime: '10:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-101' },
    { id: '2', startTime: '10:00', endTime: '11:00', subject: 'Operating Systems', faculty: 'Prof. Kumar', room: 'CS-102' },
    { id: '3', startTime: '11:00', endTime: '12:00', subject: 'Database Management', faculty: 'Dr. Patel', room: 'CS-Lab' },
    { id: '4', startTime: '12:00', endTime: '01:00', subject: '', faculty: '', room: '' },
    { id: '5', startTime: '01:00', endTime: '03:00', subject: 'Computer Networks', faculty: 'Prof. Singh', room: 'CS-101' },
  ],
  tuesday: [
    { id: '6', startTime: '09:00', endTime: '10:00', subject: 'Software Engineering', faculty: 'Dr. Gupta', room: 'CS-103' },
    { id: '7', startTime: '10:00', endTime: '11:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-Lab' },
  ],
  wednesday: [],
  thursday: [],
  friday: [],
};

// Inline keyframes & class
const blinkStyle = `
@keyframes blinkBorder {
  0%, 100% { border-color: #facc15; } /* yellow-400 */
  50% { border-color: transparent; }
}
.blink-border {
  border: 2px solid #facc15;
  animation: blinkBorder 1s infinite;
  border-radius: 0.5rem; /* keep rounded look */
}
`;

export const StudentDashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Inject blink style directly */}
      <style>{blinkStyle}</style>

      <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="opacity-90">View your class schedule and current sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 🔴 Current Class with Border Blink */}
        <Card className="lg:col-span-1 blink-border">
          <CardHeader>
            <CardTitle className="text-accent">{t('currentClass')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">10:00 - 11:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Prof. Kumar</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Room CS-102</span>
              </div>
              <div className="p-3 bg-accent-light rounded-lg">
                <p className="font-semibold text-accent">Operating Systems</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('upcomingClass')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">11:00 AM</p>
                <p className="font-medium">Database Management</p>
                <p className="text-sm">CS-Lab</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">2:00 PM</p>
                <p className="font-medium">Computer Networks</p>
                <p className="text-sm">CS-101</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Weekly Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarView schedule={mockSchedule} highlightCurrentClass={true} />
        </CardContent>
      </Card>
    </div>
  );
};
