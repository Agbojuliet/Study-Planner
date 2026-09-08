import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Course, DayOfWeek, ScheduleItem } from '../../types';
import { Button } from '../ui/Button';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';

interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onCreateSchedule: (item: ScheduleItem) => void;
}

export const CreateScheduleModal: React.FC<CreateScheduleModalProps> = ({
  isOpen,
  onClose,
  courses,
  onCreateSchedule,
}) => {
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [day, setDay] = useState<DayOfWeek>('Monday');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');
  const [type, setType] = useState<'Lecture' | 'Lab' | 'Tutorial' | 'Seminar'>('Lecture');
  const [room, setRoom] = useState(courses[0]?.room || 'Hall B');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCourse = courses.find((c) => c.id === courseId);
    if (!selectedCourse) {
      setError('Please select a course.');
      return;
    }

    if (startTime >= endTime) {
      setError('End time must be after start time.');
      return;
    }

    const newItem: ScheduleItem = {
      id: `sched_${Date.now()}`,
      courseId: selectedCourse.id,
      courseCode: selectedCourse.code,
      courseName: selectedCourse.name,
      day,
      startTime,
      endTime,
      type,
      room: room.trim() || selectedCourse.room || 'TBD',
    };

    onCreateSchedule(newItem);
    onClose();
    setError('');
  };

  const courseOptions = courses.map((c) => ({
    value: c.id,
    label: `${c.code} - ${c.name}`,
  }));

  const dayOptions: { value: DayOfWeek; label: string }[] = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ];

  const typeOptions = [
    { value: 'Lecture', label: 'Lecture' },
    { value: 'Lab', label: 'Lab' },
    { value: 'Tutorial', label: 'Tutorial' },
    { value: 'Seminar', label: 'Seminar' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4 overflow-y-auto">
      <div
        className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 border border-[#E2E8F0] shadow-xl max-h-[92vh] flex flex-col my-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] shrink-0">
          <div>
            <h2 className="text-base font-bold text-[#1E293B]">Add Class Schedule</h2>
            <p className="text-xs text-[#64748B]">Set recurring weekly timetable block</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4">
          {error && <p className="text-xs font-semibold text-rose-500">{error}</p>}

          <SelectField
            label="Course"
            options={courseOptions}
            value={courseId}
            onChange={(e) => {
              setCourseId(e.target.value);
              const found = courses.find((c) => c.id === e.target.value);
              if (found?.room) setRoom(found.room);
            }}
            required
            caption="Course for this scheduled time block"
          />

          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Day of the Week"
              options={dayOptions}
              value={day}
              onChange={(e) => setDay(e.target.value as DayOfWeek)}
              required
            />

            <SelectField
              label="Session Type"
              options={typeOptions}
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Start Time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />

            <InputField
              label="End Time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <InputField
            label="Classroom / Hall / Lab"
            placeholder="e.g. Science Block 102"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            caption="Where the class meets"
          />

          <div className="pt-2 flex items-center gap-3 shrink-0">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
            >
              Add to Timetable
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
