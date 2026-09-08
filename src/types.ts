export type Priority = 'low' | 'medium' | 'high';

export type TaskType = 'assignment' | 'project' | 'task' | 'reading';

export interface Task {
  id: string;
  title: string;
  courseId?: string;
  courseCode?: string;
  type: TaskType;
  dueDate: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  completed: boolean;
  priority: Priority;
  estimatedMinutes?: number;
  notes?: string;
}

export interface Lecturer {
  name: string;
  email: string;
  office?: string;
  officeHours?: string;
}

export interface Course {
  id: string;
  code: string; // e.g. CS201, ECON101
  name: string; // e.g. Data Structures & Algorithms
  color: string; // Primary scale or approved tint
  lecturer: Lecturer;
  room?: string;
  credits: number;
  progressPercentage: number; // 0 - 100
  notes?: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface ScheduleItem {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  day: DayOfWeek;
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "10:30"
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Seminar';
  room: string;
}

export interface StudySession {
  id: string;
  title: string;
  courseCode?: string;
  durationMinutes: number;
  breakMinutes: number;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime?: string; // HH:mm
  completed: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'deadline' | 'class' | 'study' | 'general';
  read: boolean;
}

export interface StudentProfile {
  name: string;
  email: string;
  institution: string;
  major: string;
  currentYear: string;
  semester: string;
  weeklyStudyGoalHours: number;
}

export type TabType = 'home' | 'schedule' | 'tasks' | 'courses' | 'profile' | 'calendar' | 'notifications';
