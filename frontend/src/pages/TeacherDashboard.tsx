import React, { useEffect, useRef, useState } from 'react';
import { Clock, MapPin, User, Book, Send, Phone, FolderOpen } from 'lucide-react';
import { DayOfWeek, TimeSlot } from '@/types';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface CalendarViewProps {
  schedule: {
    [key in DayOfWeek]: (TimeSlot | null)[];
  };
  editable?: boolean;
}

const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 01:00', // lunch
  '02:00 - 03:00',
  '03:00 - 04:00',
  '04:00 - 05:00',
];

const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

// Full mock schedule
const mockSchedule: { [key in DayOfWeek]: TimeSlot[] } = {
  monday: [
    { id: '1', startTime: '09:00', endTime: '10:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-101', batch: 'Batch A' },
    { id: '2', startTime: '10:00', endTime: '11:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-102', batch: 'Batch B' },
    { id: '3', startTime: '11:00', endTime: '12:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-103', batch: 'Batch C' },
  ],
  tuesday: [
    { id: '12', startTime: '02:00', endTime: '03:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-110', batch: 'Batch D' },
    { id: '13', startTime: '03:00', endTime: '04:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-111', batch: 'Batch E' },
    { id: '14', startTime: '04:00', endTime: '05:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-112', batch: 'Batch F' },
  ],
  wednesday: [
    { id: '15', startTime: '09:00', endTime: '10:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-113', batch: 'Batch A' },
    { id: '19', startTime: '02:00', endTime: '03:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-116', batch: 'Batch D' },
    { id: '20', startTime: '03:00', endTime: '04:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-117', batch: 'Batch E' },
  ],
  thursday: [
    { id: '28', startTime: '04:00', endTime: '05:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-124', batch: 'Batch F' },
  ],
  friday: [
    { id: '29', startTime: '09:00', endTime: '10:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-125', batch: 'Batch A' },
    { id: '30', startTime: '10:00', endTime: '11:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'CS-126', batch: 'Batch B' },
  ],
};

// Calendar View Component
const CalendarView: React.FC<CalendarViewProps> = ({ schedule, editable = false }) => {
  const currentSlotRef = useRef<HTMLTableCellElement | null>(null);

  // Fixed highlight: Monday, 09:00–10:00
  const highlightedDay: DayOfWeek = 'monday';
  const highlightedIndex = 0;

  useEffect(() => {
    currentSlotRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div className="w-full overflow-x-auto shadow rounded-lg bg-card">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-header">
            <th className="border p-3 text-left">
              <Clock className="inline-block w-4 h-4 mr-2" />Time
            </th>
            {days.map(day => (
              <th key={day} className="border p-3 text-center min-w-[150px] capitalize">
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
              {days.map(day => {
                const slot = schedule[day]?.[timeIndex] ?? null;
                const isLunch = timeIndex === 3;

                // highlight only one slot
                const highlight = !isLunch && slot && day === highlightedDay && timeIndex === highlightedIndex;

                return (
                  <td
                    key={`${day}-${timeIndex}`}
                    ref={highlight ? currentSlotRef : null}
                    className={cn(
                      'border p-2 text-sm align-top transition duration-300',
                      isLunch && 'bg-muted/50',
                      editable && !isLunch && 'hover:bg-calendar-hover cursor-pointer',
                      highlight
                        ? 'bg-yellow-50 ring-2 ring-yellow-400 opacity-100'
                        : !isLunch && 'opacity-30' // fade others
                    )}
                    onClick={() => editable && !isLunch && console.log(`Edit ${day} slot ${timeIndex}`)}
                  >
                    {isLunch ? (
                      <div className="text-center text-muted-foreground">Lunch Break</div>
                    ) : slot ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 font-semibold">
                          <Book className="w-3 h-3 text-primary" />{slot.subject}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />{slot.faculty}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />{slot.room}
                        </div>
                        {slot.batch && (
                          <div className="text-xs bg-secondary-light text-secondary px-1 py-0.5 rounded">
                            {slot.batch}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">{editable ? '+ Add Class' : '-'}</div>
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

// Teacher Dashboard
export const TeacherDashboard: React.FC = () => {
  const { t } = useLanguage();
  const folderInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const fileArray = Array.from(files).map(f => f.webkitRelativePath || f.name);
    setUploadedFiles(fileArray);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="opacity-90">Manage your classes and review timetables</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg shadow p-3 space-y-3">
          <h2 className="font-semibold">Timetable Actions</h2>
          <button className="w-full bg-gradient-primary hover:opacity-90 flex items-center justify-center gap-2 py-1 rounded">
            <Send className="w-4 h-4" /> Send to Admin for Review
          </button>
          <button className="w-full border flex items-center justify-center gap-2 py-1 rounded">
            <Phone className="w-4 h-4" /> Call Admin (Follow-up)
          </button>
        </div>

        <div className="border rounded-lg shadow p-3 space-y-3">
          <h2 className="font-semibold">{t('chapterManagement')}</h2>

          {/* hidden input */}
          <input
            type="file"
            ref={folderInputRef}
            style={{ display: 'none' }}
            webkitdirectory="true"
            directory=""
            onChange={handleFolderSelect}
          />

          <button
            className="w-full border flex items-center justify-center gap-2 py-1 rounded hover:bg-calendar-hover"
            onClick={() => folderInputRef.current?.click()}
          >
            <FolderOpen className="w-4 h-4" /> Upload Chapter Folder
          </button>

          <div className="text-sm text-muted-foreground">
            {uploadedFiles.length === 0 ? (
              <>
                <p>• Chapter 1: Introduction</p>
                <p>• Chapter 2: Basic Concepts</p>
                <p>• Chapter 3: Advanced Topics</p>
              </>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {uploadedFiles.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="border rounded-lg shadow p-3">
        <h2 className="font-semibold mb-2">My Schedule</h2>
        <CalendarView schedule={mockSchedule} editable />
      </div>
    </div>
  );
};
