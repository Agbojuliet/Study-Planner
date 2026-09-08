import React, { useState } from 'react';
import { Plus, MapPin, Clock } from 'lucide-react';
import { DayOfWeek, ScheduleItem } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ScheduleScreenProps {
  schedule: ScheduleItem[];
  onOpenAddSchedule: () => void;
  onDeleteScheduleItem?: (id: string) => void;
}

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  schedule,
  onOpenAddSchedule,
}) => {
  // Determine current day
  const todayDayName = (['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
    new Date().getDay()
  ] as DayOfWeek) || 'Monday';

  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(todayDayName);

  const filteredItems = schedule
    .filter((s) => s.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-4 pb-8">
      {/* View Switcher: Daily vs Weekly */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex bg-[#F1F5F9] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('daily')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              viewMode === 'daily'
                ? 'bg-white text-[#4056D6] shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Daily Schedule
          </button>
          <button
            type="button"
            onClick={() => setViewMode('weekly')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              viewMode === 'weekly'
                ? 'bg-white text-[#4056D6] shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Weekly Timetable
          </button>
        </div>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={onOpenAddSchedule}
        >
          Add Class
        </Button>
      </div>

      {viewMode === 'daily' ? (
        <div className="space-y-4">
          {/* Day selection pill scroll */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {DAYS.map((day) => {
              const isSelected = selectedDay === day;
              const isToday = day === todayDayName;
              const count = schedule.filter((s) => s.day === day).length;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`min-h-[44px] flex flex-col items-center justify-center px-3.5 py-1.5 rounded-xl border text-xs font-bold shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#4056D6] text-white border-[#4056D6]'
                      : 'bg-white text-[#64748B] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span>{day.slice(0, 3)}</span>
                  <span
                    className={`text-[10px] font-medium mt-0.5 ${
                      isSelected ? 'text-white/80' : 'text-[#94A3B8]'
                    }`}
                  >
                    {isToday ? 'Today' : `${count} class${count === 1 ? '' : 'es'}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Schedule items for selected day */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#1E293B]">
                {selectedDay} Schedule ({filteredItems.length})
              </h2>
            </div>

            {filteredItems.length === 0 ? (
              <Card padding="lg" variant="subtle" className="text-center py-8">
                <p className="text-sm font-semibold text-[#1E293B]">No classes scheduled</p>
                <p className="text-xs text-[#64748B] mt-1 mb-3">
                  You have no scheduled classes on {selectedDay}.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  onClick={onOpenAddSchedule}
                >
                  Schedule a Class
                </Button>
              </Card>
            ) : (
              filteredItems.map((item) => (
                <Card key={item.id} padding="md" variant="default">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#4056D6] bg-[#F2F4FC] px-2 py-0.5 rounded-md">
                          {item.courseCode}
                        </span>
                        <span className="text-xs font-semibold text-[#64748B]">{item.type}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#1E293B] mt-1.5">
                        {item.courseName}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-xs text-[#64748B]">
                        <span className="flex items-center gap-1 font-medium text-[#1E293B]">
                          <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                          {item.room}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                          {item.startTime} - {item.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Weekly Timetable View */
        <div className="space-y-4">
          <p className="text-xs text-[#64748B]">
            Weekly overview of all lectures, labs, and recitations.
          </p>
          <div className="space-y-3">
            {DAYS.slice(0, 5).map((day) => {
              const dayClasses = schedule
                .filter((s) => s.day === day)
                .sort((a, b) => a.startTime.localeCompare(b.startTime));

              return (
                <div
                  key={day}
                  className="border border-[#E2E8F0] rounded-xl bg-white p-3.5 space-y-2"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#F1F5F9]">
                    <span className="text-xs font-bold text-[#1E293B] uppercase tracking-wide">
                      {day}
                    </span>
                    <span className="text-xs text-[#64748B]">
                      {dayClasses.length} {dayClasses.length === 1 ? 'class' : 'classes'}
                    </span>
                  </div>

                  {dayClasses.length === 0 ? (
                    <p className="text-xs text-[#94A3B8] italic py-1">No classes scheduled</p>
                  ) : (
                    <div className="space-y-2 pt-1">
                      {dayClasses.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]/60 text-xs"
                        >
                          <div>
                            <div className="font-bold text-[#1E293B] flex items-center gap-1.5">
                              <span className="text-[#4056D6]">{item.courseCode}</span>
                              <span className="text-[#64748B] font-normal">• {item.type}</span>
                            </div>
                            <div className="text-[#64748B] mt-0.5">{item.room}</div>
                          </div>
                          <div className="font-semibold text-[#1E293B] text-right">
                            {item.startTime} - {item.endTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
