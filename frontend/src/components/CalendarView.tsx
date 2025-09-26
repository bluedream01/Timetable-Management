import React from 'react';
import { Clock, MapPin, User, Book } from 'lucide-react';
import { DayOfWeek, TimeSlot } from '@/types';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  schedule: {
    [key in DayOfWeek]: (TimeSlot | null)[];
  };
  editable?: boolean;
  onEdit?: (day: DayOfWeek, slotIndex: number) => void;
}

const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 01:00', // lunch
  '01:00 - 02:00',
  '02:00 - 03:00',
  '03:00 - 04:00',
];

const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export const CalendarView: React.FC<CalendarViewProps> = ({
  schedule,
  editable = false,
  onEdit,
}) => {
  return (
    <div className="w-full overflow-x-auto shadow rounded-lg bg-card">
      {/* 🔥 Blink border style */}
      <style>
        {`
          @keyframes blinkBorder {
            0%, 100% { border-color: #facc15; }
            50% { border-color: transparent; }
          }
          .blink-border {
            border: 3.5px solid #facc15;
            animation: blinkBorder 1s infinite;
            border-radius: 0; /* no rounded corners */
          }
        `}
      </style>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-header">
            <th className="border p-3 text-left">
              <Clock className="inline-block w-4 h-4 mr-2" />
              Time
            </th>
            {days.map((day) => (
              <th
                key={day}
                className="border p-3 text-center min-w-[150px] capitalize"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={time} className={timeIndex === 3 ? 'bg-muted/30' : ''}>
              <td className="border p-3 font-medium text-muted-foreground bg-primary-light/30">
                {time}
              </td>
              {days.map((day) => {
                const slot = schedule[day]?.[timeIndex] ?? null;
                const isLunch = timeIndex === 3;

                // 🔴 HARD-CODED: Blink only "Monday, 09:00 - 10:00, Data Structures"
                const highlight =
                  slot &&
                  slot.subject === 'Data Structures' &&
                  slot.faculty === 'Dr. Sharma' &&
                  slot.room === 'CS-101' &&
                  day === 'monday' &&
                  time === '09:00 - 10:00';

                return (
                  <td
                    key={`${day}-${timeIndex}`}
                    className={cn(
                      'border p-2 text-sm align-top transition rounded-none', // sharp corners
                      isLunch && 'bg-muted/50',
                      editable && !isLunch && 'hover:bg-calendar-hover cursor-pointer',
                      highlight && 'blink-border' // 👈 hard-coded blinking border
                    )}
                    onClick={() => editable && !isLunch && onEdit?.(day, timeIndex)}
                  >
                    {isLunch ? (
                      <div className="text-center text-muted-foreground">
                        Lunch Break
                      </div>
                    ) : slot ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 font-semibold">
                          <Book className="w-3 h-3 text-primary" />
                          <span>{slot.subject}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span>{slot.faculty}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{slot.room}</span>
                        </div>
                        {slot.batch && (
                          <div className="text-xs bg-secondary-light text-secondary px-1 py-0.5 rounded">
                            {slot.batch}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        {editable ? '+ Add Class' : '-'}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
