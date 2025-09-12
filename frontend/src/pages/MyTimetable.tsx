import React from 'react';
import { CalendarView } from '@/components/CalendarView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MyTimetable: React.FC = () => {
  const timetable = {
    monday: [
      { id: '1', subject: 'Mathematics', room: 'Room 101', faculty: 'Dr. Sharma' }, // 09:00 - 10:00
      { id: '2', subject: 'Physics', room: 'Room 102', faculty: 'Prof. Kumar' },     // 10:00 - 11:00
      { id: '3', subject: 'Chemistry', room: 'Lab 1', faculty: 'Dr. Singh' },        // 11:00 - 12:00
      null,                                                                          // 12:00 - 01:00 (Lunch)
      { id: '4', subject: 'Computer Science', room: 'Lab 2', faculty: 'Prof. Verma' }, // 02:00 - 03:00
      null,                                                                          // 03:00 - 04:00
      null,                                                                          // 04:00 - 05:00
    ],
    tuesday: [
      { id: '5', subject: 'English', room: 'Room 103', faculty: 'Ms. Patel' },
      { id: '6', subject: 'Mathematics', room: 'Room 101', faculty: 'Dr. Sharma' },
      { id: '7', subject: 'Physics Lab', room: 'Physics Lab', faculty: 'Prof. Kumar' },
      null,
      null,
      null,
      null,
    ],
    wednesday: [
      { id: '8', subject: 'Chemistry', room: 'Lab 1', faculty: 'Dr. Singh' },
      { id: '9', subject: 'Computer Science', room: 'Lab 2', faculty: 'Prof. Verma' },
      null,
      null,
      { id: '10', subject: 'Mathematics', room: 'Room 101', faculty: 'Dr. Sharma' },
      null,
      null,
    ],
    thursday: [
      { id: '11', subject: 'Physics', room: 'Room 102', faculty: 'Prof. Kumar' },
      { id: '12', subject: 'English', room: 'Room 103', faculty: 'Ms. Patel' },
      { id: '13', subject: 'Computer Lab', room: 'Lab 2', faculty: 'Prof. Verma' },
      null,
      null,
      null,
      null,
    ],
    friday: [
      { id: '14', subject: 'Chemistry Lab', room: 'Lab 1', faculty: 'Dr. Singh' },
      { id: '15', subject: 'Mathematics', room: 'Room 101', faculty: 'Dr. Sharma' },
      { id: '16', subject: 'Physics', room: 'Room 102', faculty: 'Prof. Kumar' },
      null,
      null,
      null,
      null,
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
          <CalendarView schedule={timetable} />
        </CardContent>
      </Card>
    </div>
  );
};
