import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Coffee, BookOpen } from 'lucide-react';
import { Course, StudySession } from '../../types';
import { Button } from '../ui/Button';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';

interface StudySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onSaveSession: (session: StudySession) => void;
}

export const StudySessionModal: React.FC<StudySessionModalProps> = ({
  isOpen,
  onClose,
  courses,
  onSaveSession,
}) => {
  const [mode, setMode] = useState<'plan' | 'timer'>('plan');
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState(courses[0]?.code || '');
  const [durationMinutes, setDurationMinutes] = useState('45');
  const [breakMinutes, setBreakMinutes] = useState('10');
  const [scheduledDate, setScheduledDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [scheduledTime, setScheduledTime] = useState('15:00');

  // Active Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [isBreakPhase, setIsBreakPhase] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(45 * 60);

  useEffect(() => {
    let interval: any;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timerRunning && secondsRemaining === 0) {
      if (!isBreakPhase) {
        // Switch to break phase!
        setIsBreakPhase(true);
        const breakSecs = (parseInt(breakMinutes, 10) || 5) * 60;
        setSecondsRemaining(breakSecs);
      } else {
        // Done with both study and break
        setTimerRunning(false);
      }
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsRemaining, isBreakPhase, breakMinutes]);

  if (!isOpen) return null;

  const handleStartTimerMode = () => {
    const durMins = parseInt(durationMinutes, 10) || 45;
    setSecondsRemaining(durMins * 60);
    setIsBreakPhase(false);
    setTimerRunning(true);
    setMode('timer');
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: StudySession = {
      id: `ss_${Date.now()}`,
      title: title.trim() || `${courseCode || 'Academic'} Study Block`,
      courseCode: courseCode || undefined,
      durationMinutes: parseInt(durationMinutes, 10) || 45,
      breakMinutes: parseInt(breakMinutes, 10) || 10,
      scheduledDate,
      scheduledTime,
      completed: false,
    };
    onSaveSession(newSession);
    onClose();
    setTitle('');
  };

  const courseOptions = [
    { value: '', label: 'General / No specific course' },
    ...courses.map((c) => ({ value: c.code, label: `${c.code} - ${c.name}` })),
  ];

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4 overflow-y-auto">
      <div
        className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 border border-[#E2E8F0] shadow-xl max-h-[92vh] flex flex-col my-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#1E293B]">
              {mode === 'timer' ? 'Active Focus Session' : 'Plan Study & Break'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {mode === 'plan' ? (
          <form onSubmit={handleSavePlan} className="flex-1 overflow-y-auto py-4 space-y-4">
            <InputField
              label="Study Focus / Topic"
              placeholder="e.g. Chapter 4 Practice Problems, Paper Outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              caption="Define what you will focus on during this block"
            />

            <SelectField
              label="Course"
              options={courseOptions}
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              caption="Attach this focus session to a specific course"
            />

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Study Duration (mins)"
                type="number"
                min="15"
                step="5"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                caption="Recommended: 45-50 min"
                required
              />

              <InputField
                label="Break Duration (mins)"
                type="number"
                min="5"
                step="5"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(e.target.value)}
                caption="Scheduled rest: 5-15 min"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
              />

              <InputField
                label="Start Time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>

            <div className="pt-3 flex flex-col gap-2.5">
              <Button
                type="button"
                variant="secondary"
                fullWidth
                leftIcon={<Play className="w-4 h-4" />}
                onClick={handleStartTimerMode}
              >
                Start Focus Timer Now
              </Button>
              <Button
                type="submit"
                variant="primary"
                fullWidth
              >
                Schedule in Planner
              </Button>
            </div>
          </form>
        ) : (
          <div className="py-6 flex flex-col items-center text-center space-y-5">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                isBreakPhase
                  ? 'bg-[#B5FFE1]/30 text-[#0F766E] border border-[#B5FFE1]'
                  : 'bg-[#F2F4FC] text-[#4056D6] border border-[#D5DAF6]'
              }`}
            >
              {isBreakPhase ? (
                <>
                  <Coffee className="w-3.5 h-3.5" /> Break Time ({breakMinutes}m)
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" /> Focused Study Block
                </>
              )}
            </div>

            <div>
              <div className="text-5xl font-extrabold text-[#1E293B] font-mono tracking-tight">
                {formatTimer(secondsRemaining)}
              </div>
              <p className="text-sm font-semibold text-[#64748B] mt-2">
                {title || (courseCode ? `${courseCode} Study Session` : 'Academic Study')}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full max-w-xs justify-center pt-2">
              <button
                type="button"
                onClick={() => setTimerRunning(!timerRunning)}
                className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[#4056D6] text-white font-semibold flex items-center gap-2 hover:bg-[#3446b8] active:bg-[#2b3a9a] cursor-pointer shadow-xs"
              >
                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{timerRunning ? 'Pause' : 'Resume'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  const dur = parseInt(durationMinutes, 10) || 45;
                  setSecondsRemaining(dur * 60);
                  setIsBreakPhase(false);
                }}
                className="min-h-[48px] px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMode('plan')}
              className="text-xs font-semibold text-[#4056D6] hover:underline pt-2 cursor-pointer"
            >
              Back to study planner
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
