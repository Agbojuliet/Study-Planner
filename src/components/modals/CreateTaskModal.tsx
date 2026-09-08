import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Course, Priority, Task, TaskType } from '../../types';
import { Button } from '../ui/Button';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onCreateTask: (task: Task) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  courses,
  onCreateTask,
}) => {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [type, setType] = useState<TaskType>('assignment');
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [dueTime, setDueTime] = useState('23:59');
  const [priority, setPriority] = useState<Priority>('medium');
  const [estimatedMinutes, setEstimatedMinutes] = useState('60');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task or assignment title.');
      return;
    }

    const selectedCourse = courses.find((c) => c.id === courseId);

    const newTask: Task = {
      id: `task_${Date.now()}`,
      title: title.trim(),
      courseId: selectedCourse?.id,
      courseCode: selectedCourse?.code,
      type,
      dueDate,
      dueTime,
      completed: false,
      priority,
      estimatedMinutes: parseInt(estimatedMinutes, 10) || 60,
      notes: notes.trim() || undefined,
    };

    onCreateTask(newTask);
    onClose();
    setTitle('');
    setNotes('');
    setError('');
  };

  const courseOptions = [
    { value: '', label: 'General / Non-course' },
    ...courses.map((c) => ({ value: c.id, label: `${c.code} - ${c.name}` })),
  ];

  const typeOptions = [
    { value: 'assignment', label: 'Assignment' },
    { value: 'project', label: 'Project' },
    { value: 'task', label: 'General Task' },
    { value: 'reading', label: 'Reading' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
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
            <h2 className="text-base font-bold text-[#1E293B]">Create Academic Task</h2>
            <p className="text-xs text-[#64748B]">Track assignments, projects, or prep</p>
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
          <InputField
            label="Task or Assignment Title"
            placeholder="e.g. Problem Set 3, Research Draft"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            error={error}
            caption="Clear, descriptive title for your planner"
            required
          />

          <SelectField
            label="Associated Course"
            options={courseOptions}
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            caption="Select the course this item belongs to"
          />

          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Item Type"
              options={typeOptions}
              value={type}
              onChange={(e) => setType(e.target.value as TaskType)}
            />

            <SelectField
              label="Priority Level"
              options={priorityOptions}
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <InputField
              label="Due Time"
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              caption="Submission deadline"
            />
          </div>

          <InputField
            label="Estimated Study Time (minutes)"
            type="number"
            min="10"
            step="5"
            placeholder="60"
            value={estimatedMinutes}
            onChange={(e) => setEstimatedMinutes(e.target.value)}
            caption="Helps with daily study planning"
          />

          <div className="flex flex-col gap-1.5 w-full text-left">
            <label className="text-[13px] font-semibold text-[#1E293B]">
              Submission Notes / Instructions
            </label>
            <textarea
              rows={2}
              className="w-full bg-white border border-[#E2E8F0] text-[14px] text-[#1E293B] rounded-xl p-3 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4056D6] focus:ring-2 focus:ring-[#4056D6]/20"
              placeholder="e.g. Submit PDF via Canvas, attach rubric checklist"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <p className="text-[12px] text-[#64748B]">Optional details or submission links</p>
          </div>

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
              Save Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
