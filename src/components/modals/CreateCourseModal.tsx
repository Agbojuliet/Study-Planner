import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Course } from '../../types';
import { Button } from '../ui/Button';
import { InputField } from '../ui/InputField';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCourse: (course: Course) => void;
}

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  isOpen,
  onClose,
  onCreateCourse,
}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [lecturerName, setLecturerName] = useState('');
  const [lecturerEmail, setLecturerEmail] = useState('');
  const [office, setOffice] = useState('');
  const [room, setRoom] = useState('');
  const [credits, setCredits] = useState('3');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) {
      setError('Course code and course title are required.');
      return;
    }

    const newCourse: Course = {
      id: `c_${Date.now()}`,
      code: code.trim().toUpperCase(),
      name: name.trim(),
      color: '#4056D6',
      credits: parseInt(credits, 10) || 3,
      progressPercentage: 0,
      room: room.trim() || undefined,
      lecturer: {
        name: lecturerName.trim() || 'Staff / Faculty',
        email: lecturerEmail.trim() || 'department@university.edu',
        office: office.trim() || undefined,
      },
      notes: notes.trim() || undefined,
    };

    onCreateCourse(newCourse);
    onClose();
    setCode('');
    setName('');
    setLecturerName('');
    setLecturerEmail('');
    setOffice('');
    setRoom('');
    setNotes('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4 overflow-y-auto">
      <div
        className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 border border-[#E2E8F0] shadow-xl max-h-[92vh] flex flex-col my-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] shrink-0">
          <div>
            <h2 className="text-base font-bold text-[#1E293B]">Add New Course</h2>
            <p className="text-xs text-[#64748B]">Enroll course and instructor info</p>
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

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <InputField
                label="Course Code"
                placeholder="e.g. CS 201"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2">
              <InputField
                label="Course Name"
                placeholder="e.g. Data Structures"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Credits"
              type="number"
              min="1"
              max="12"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              caption="Course credit units"
            />
            <InputField
              label="Default Room"
              placeholder="e.g. Hall B 204"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              caption="Primary lecture room"
            />
          </div>

          <div className="pt-2 border-t border-[#E2E8F0]">
            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
              Lecturer / Instructor Information
            </h3>
            <div className="space-y-3">
              <InputField
                label="Lecturer Name"
                placeholder="e.g. Dr. Martinez"
                value={lecturerName}
                onChange={(e) => setLecturerName(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Lecturer Email"
                  type="email"
                  placeholder="name@university.edu"
                  value={lecturerEmail}
                  onChange={(e) => setLecturerEmail(e.target.value)}
                />
                <InputField
                  label="Office / Hours"
                  placeholder="Rm 312, Tue 2-4"
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-full text-left">
            <label className="text-[13px] font-semibold text-[#1E293B]">
              Course Syllabus / Key Notes
            </label>
            <textarea
              rows={2}
              className="w-full bg-white border border-[#E2E8F0] text-[14px] text-[#1E293B] rounded-xl p-3 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4056D6] focus:ring-2 focus:ring-[#4056D6]/20"
              placeholder="e.g. 2 midterms, weekly homework, final exam 40%"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <p className="text-[12px] text-[#64748B]">Grading criteria or course policies</p>
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
              Save Course
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
