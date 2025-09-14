import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarView } from '@/components/CalendarView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, User } from 'lucide-react';
import { DayOfWeek, TimeSlot } from '@/types';

const mockSchedule: { [key in DayOfWeek]: TimeSlot[] } = {
  monday: [
    { id: "1", startTime: "09:00", endTime: "10:00", subject: "DSA", faculty: "Dr. Sharma", room: "Room 101" },
    { id: "2", startTime: "10:00", endTime: "11:00", subject: "Analog", faculty: "Prof. Verma", room: "Room 102" },
    { id: "3", startTime: "11:00", endTime: "12:00", subject: "Maths-III", faculty: "Ms. Gupta", room: "Room 103" },
    { id: "4", startTime: "12:00", endTime: "01:00", subject: "DSA Lab", faculty: "Prof. Nair", room: "Lab 201" },
  ],
  tuesday: [
    { id: "5", startTime: "09:00", endTime: "10:00", subject: "Signal & Systems", faculty: "Dr. Banerjee", room: "Room 104" },
    { id: "6", startTime: "10:00", endTime: "11:00", subject: "Operating Systems", faculty: "Dr. Singh", room: "Room 105" },
    { id: "7", startTime: "11:00", endTime: "12:00", subject: "Maths-III", faculty: "Dr. Rao", room: "Room 106" },
    { id: "8", startTime: "12:00", endTime: "01:00", subject: "DBMS Lab", faculty: "Ms. Roy", room: "Lab 202" },
  ],
  wednesday: [
    { id: "9", startTime: "09:00", endTime: "10:00", subject: "Analog", faculty: "Dr. Raghavan", room: "Room 107" },
    { id: "10", startTime: "10:00", endTime: "11:00", subject: "Computer Networks", faculty: "Mr. Mehta", room: "Room 108" },
    { id: "11", startTime: "11:00", endTime: "12:00", subject: "Maths-III", faculty: "Prof. Kulkarni", room: "Room 109" },
    { id: "12", startTime: "12:00", endTime: "01:00", subject: "Digital Electronics", faculty: "Prof. Iyer", room: "Room 110" },
    { id: "13", startTime: "02:00", endTime: "03:00", subject: "Signal & Systems", faculty: "Mr. Khan", room: "Room 111" },
  ],
  thursday: [
    { id: "14", startTime: "09:00", endTime: "10:00", subject: "Operating Systems", faculty: "Ms. Joshi", room: "Room 112" },
    { id: "15", startTime: "10:00", endTime: "11:00", subject: "DBMS", faculty: "Dr. Krishnan", room: "Room 113" },
    { id: "16", startTime: "11:00", endTime: "12:00", subject: "DSA", faculty: "Ms. Kapoor", room: "Room 114" },
    { id: "17", startTime: "12:00", endTime: "01:00", subject: "Networks Lab", faculty: "Prof. Mukherjee", room: "Lab 203" },
  ],
  friday: [
    { id: "18", startTime: "09:00", endTime: "10:00", subject: "Digital Electronics", faculty: "Ms. Fernandes", room: "Room 115" },
    { id: "19", startTime: "10:00", endTime: "11:00", subject: "Signal & Systems", faculty: "Ms. Thomas", room: "Room 116" },
    { id: "20", startTime: "11:00", endTime: "12:00", subject: "Analog", faculty: "Mr. Sinha", room: "Room 117" },
    { id: "21", startTime: "12:00", endTime: "01:00", subject: "Operating Systems", faculty: "Prof. Menon", room: "Room 118" },
    { id: "22", startTime: "02:00", endTime: "03:00", subject: "DBMS", faculty: "Mr. Joseph", room: "Room 119" },
  ],
};

export const StudentDashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="opacity-90">View your class schedule and current sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-border lg:col-span-1">
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