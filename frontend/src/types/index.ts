export type UserRole = 'admin' | 'student' | 'teacher';
export type Language = 'en' | 'hi' | 'nagpuri' | 'santali';
export type Department = 'CS' | 'ECE' | 'EEE';
export type TimetableStatus = 'draft' | 'under-review' | 'finalized';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' ;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: Department;
  language: Language;
}

export interface TimeSlot {
  id: string;
  startTime?: string;
  endTime?: string;
  subject: string;
  faculty: string;
  room: string;
  batch?: string;
}

export interface Timetable {
  id: string;
  name: string;
  department: Department;
  status: TimetableStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  schedule: {
    monday: TimeSlot[];
    tuesday: TimeSlot[];
    wednesday: TimeSlot[];
    thursday: TimeSlot[];
    friday: TimeSlot[]; // ✅ optional now
  };
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  department: Department;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: Department;
  subjects: string[];
  availability: {
    [key in DayOfWeek]: string[];
  };
}

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  building: string;
  hasProjector: boolean;
  hasLab: boolean;
}