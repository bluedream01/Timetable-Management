import React from 'react';
import { CalendarView } from '@/components/CalendarView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MyTimetable: React.FC = () => {
  const timetable = {
    monday: [
      { time: '9:00-10:00', subject: 'Mathematics', room: 'Room 101', faculty: 'Dr. Sharma', current: true },
      { time: '10:00-11:00', subject: 'Physics', room: 'Room 102', faculty: 'Prof. Kumar' },
      { time: '11:00-12:00', subject: 'Chemistry', room: 'Lab 1', faculty: 'Dr. Singh' },
      { time: '2:00-3:00', subject: 'Computer Science', room: 'Lab 2', faculty: 'Prof. Verma' },
    ],
    tuesday: [
      { time: '9:00-10:00', subject: 'English', room: 'Room 103', faculty: 'Ms. Patel' },
      { time: '10:00-11:00', subject: 'Mathematics', room: 'Room 101', faculty: 'Dr. Sharma' },
      { time: '11:00-12:00', subject: 'Physics Lab', room: 'Physics Lab', faculty: 'Prof. Kumar' },
    ],
    wednesday: [
      { time: '9:00-10:00', subject: 'Chemistry', room: 'Lab 1', faculty: 'Dr. Singh' },
      { time: '10:00-11:00', subject: 'Computer Science', room: 'Lab 2', faculty: 'Prof. Verma' },
      { time: '2:00-3:00', subject: 'Mathematics', room: 'Room 101', faculty: 'Dr. Sharma' },
    ],
    thursday: [
      { time: '9:00-10:00', subject: 'Physics', room: 'Room 102', faculty: 'Prof. Kumar' },
      { time: '10:00-11:00', subject: 'English', room: 'Room 103', faculty: 'Ms. Patel' },
      { time: '11:00-12:00', subject: 'Computer Lab', room: 'Lab 2', faculty: 'Prof. Verma' },
    ],
    friday: [
      { time: '9:00-10:00', subject: 'Chemistry Lab', room: 'Lab 1', faculty: 'Dr. Singh' },
      { time: '10:00-11:00', subject: 'Mathematics', room: 'Room 101', faculty: 'Dr. Sharma' },
      { time: '11:00-12:00', subject: 'Physics', room: 'Room 102', faculty: 'Prof. Kumar' },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">My Timetable</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarView timetable={timetable} />
        </CardContent>
      </Card>
    </div>
  );
};