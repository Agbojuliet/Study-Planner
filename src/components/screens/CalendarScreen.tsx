import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, CheckSquare, Clock } from 'lucide-react';
import { ScheduleItem, Task, DayOfWeek } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface CalendarScreenProps {
  tasks: Task[];
  schedule: ScheduleItem[];
  onToggleTask: (taskId: string) => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({
  tasks,
  schedule,
  onToggleTask,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of current month
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  // Days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectedIso = selectedDate.toISOString().split('T')[0];
  const dayNames: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const selectedDayName = dayNames[selectedDate.getDay()];

  // Tasks for selected date
  const tasksOnSelected = tasks.filter((t) => t.dueDate === selectedIso);

  // Classes for selected date
  const classesOnSelected = schedule.filter((s) => s.day === selectedDayName);

  return (
    <div className="space-y-4 pb-8">
      {/* Month header & navigation */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-base font-bold text-[#1E293B]">
            {monthNames[month]} {year}
          </h2>
          <p className="text-xs text-[#64748B]">Academic Planning Calendar</p>
        </div>
        <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#1E293B] hover:bg-white cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              const now = new Date();
              setCurrentDate(now);
              setSelectedDate(now);
            }}
            className="px-2 py-1 text-xs font-bold text-[#4056D6] hover:bg-white rounded-lg cursor-pointer"
          >
            Today
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#1E293B] hover:bg-white cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="border border-[#E2E8F0] rounded-2xl bg-white p-3.5 shadow-xs">
        {/* Day headers: Su Mo Tu We Th Fr Sa */}
        <div className="grid grid-cols-7 text-center mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <span key={d} className="text-[11px] font-bold text-[#64748B]">
              {d}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNumber = idx + 1;
            const thisDate = new Date(year, month, dayNumber);
            const thisIso = thisDate.toISOString().split('T')[0];
            const isSelected = selectedIso === thisIso;
            const isToday =
              new Date().toISOString().split('T')[0] === thisIso;

            const dayTasks = tasks.filter((t) => t.dueDate === thisIso);
            const hasDeadlines = dayTasks.length > 0;

            return (
              <button
                key={dayNumber}
                type="button"
                onClick={() => setSelectedDate(thisDate)}
                className={`h-9 flex flex-col items-center justify-center rounded-xl text-xs font-semibold relative transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#4056D6] text-white'
                    : isToday
                    ? 'bg-[#F2F4FC] text-[#4056D6] font-bold border border-[#D5DAF6]'
                    : 'text-[#1E293B] hover:bg-[#F8FAFC]'
                }`}
              >
                <span>{dayNumber}</span>
                {hasDeadlines && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${
                      isSelected ? 'bg-white' : 'bg-rose-500'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Agenda */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1E293B]">
            Plan for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ({selectedDayName})
          </h3>
        </div>

        {/* Scheduled classes */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#4056D6]" /> Scheduled Classes ({classesOnSelected.length})
          </div>
          {classesOnSelected.length === 0 ? (
            <p className="text-xs text-[#94A3B8] italic">No classes scheduled on this day.</p>
          ) : (
            classesOnSelected.map((item) => (
              <Card key={item.id} padding="sm" variant="default">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#4056D6] mr-1.5">{item.courseCode}</span>
                    <span className="font-semibold text-[#1E293B]">{item.courseName}</span>
                    <span className="text-[#64748B] block mt-0.5">{item.room}</span>
                  </div>
                  <div className="text-right font-medium text-[#1E293B]">
                    {item.startTime} - {item.endTime}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Tasks Due */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] uppercase tracking-wider">
            <CheckSquare className="w-3.5 h-3.5 text-[#4056D6]" /> Tasks & Deadlines ({tasksOnSelected.length})
          </div>
          {tasksOnSelected.length === 0 ? (
            <p className="text-xs text-[#94A3B8] italic">No assignments or tasks due on this date.</p>
          ) : (
            tasksOnSelected.map((t) => (
              <Card key={t.id} padding="sm" variant="default">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => onToggleTask(t.id)}
                      className="rounded text-[#4056D6] focus:ring-[#4056D6] cursor-pointer"
                    />
                    <span
                      className={`font-semibold ${
                        t.completed ? 'line-through text-[#94A3B8]' : 'text-[#1E293B]'
                      }`}
                    >
                      {t.title}
                    </span>
                  </div>
                  <Badge variant={t.priority === 'high' ? 'danger' : 'neutral'} size="sm">
                    {t.dueTime || 'All Day'}
                  </Badge>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
