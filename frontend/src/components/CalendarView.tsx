import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DayOfWeek, TimeSlot } from '@/types';
import { Clock, MapPin, User, Book } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  schedule: {
    [key in DayOfWeek]: TimeSlot[];
  };
  currentClassHighlight?: boolean;
  editable?: boolean;
  onEdit?: (day: DayOfWeek, slotIndex: number) => void;
}

const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 01:00',
  '02:00 - 03:00',
  '03:00 - 04:00',
  '04:00 - 05:00',
];

const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const CalendarView: React.FC<CalendarViewProps> = ({
  schedule,
  currentClassHighlight = false,
  editable = false,
  onEdit,
}) => {
  const { t } = useLanguage();
  const [currentSlot, setCurrentSlot] = useState<{ day: DayOfWeek; time: string } | null>(null);

  useEffect(() => {
    if (!currentClassHighlight) return;

    const updateCurrentSlot = () => {
      const now = new Date();
      const currentDay = days[now.getDay() - 1];
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = `${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;

      for (const slot of timeSlots) {
        const [start, end] = slot.split(' - ');
        if (currentTime >= start && currentTime < end) {
          setCurrentSlot({ day: currentDay, time: slot });
          break;
        }
      }
    };

    updateCurrentSlot();
    const interval = setInterval(updateCurrentSlot, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [currentClassHighlight]);

  const isCurrentClass = (day: DayOfWeek, time: string) => {
    return currentSlot?.day === day && currentSlot?.time === time;
  };

  return (
    <div className="w-full overflow-x-auto shadow-card rounded-lg bg-card">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-header">
            <th className="border border-border p-3 text-primary-foreground font-semibold text-left">
              <Clock className="inline-block w-4 h-4 mr-2" />
              {t('time')}
            </th>
            {days.map((day) => (
              <th
                key={day}
                className="border border-border p-3 text-primary-foreground font-semibold text-center min-w-[150px]"
              >
                {t(day)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={time} className={timeIndex === 3 ? 'bg-muted/30' : ''}>
              <td className="border border-border p-3 font-medium text-muted-foreground bg-primary-light/30">
                {time}
              </td>
              {days.map((day) => {
                const slot = schedule[day]?.[timeIndex];
                const isCurrent = isCurrentClass(day, time);
                const isLunchBreak = timeIndex === 3;

                return (
                  <td
                    key={`${day}-${time}`}
                    className={cn(
                      'border border-border p-2 relative transition-all',
                      isCurrent && 'bg-calendar-current/20 ring-2 ring-calendar-current animate-pulse',
                      isLunchBreak && 'bg-muted/50',
                      !slot && !isLunchBreak && 'bg-background',
                      editable && !isLunchBreak && 'hover:bg-calendar-hover cursor-pointer'
                    )}
                    onClick={() => editable && !isLunchBreak && onEdit?.(day, timeIndex)}
                  >
                    {isLunchBreak ? (
                      <div className="text-center text-muted-foreground font-medium py-2">
                        Lunch Break
                      </div>
                    ) : slot ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                          <Book className="w-3 h-3 text-primary" />
                          <span className="truncate">{slot.subject}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span className="truncate">{slot.faculty}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{slot.room}</span>
                        </div>
                        {slot.batch && (
                          <div className="text-xs bg-secondary-light text-secondary px-1 py-0.5 rounded inline-block">
                            {slot.batch}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground text-sm py-4">
                        {editable ? '+ Add Class' : '-'}
                      </div>
                    )}
                    {isCurrent && (
                      <div className="absolute top-1 right-1">
                        <span className="inline-flex h-2 w-2 rounded-full bg-calendar-current animate-ping"></span>
                        <span className="absolute inline-flex h-2 w-2 rounded-full bg-calendar-current"></span>
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