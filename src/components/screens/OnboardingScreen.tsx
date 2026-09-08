import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';
import { StudentProfile } from '../../types';

interface OnboardingScreenProps {
  initialProfile: StudentProfile;
  onComplete: (updatedProfile: StudentProfile) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  initialProfile,
  onComplete,
}) => {
  const [currentYear, setCurrentYear] = useState(initialProfile.currentYear || 'Year 2');
  const [semester, setSemester] = useState(initialProfile.semester || 'Fall Semester');
  const [weeklyStudyGoalHours, setWeeklyStudyGoalHours] = useState(
    initialProfile.weeklyStudyGoalHours?.toString() || '15'
  );

  const yearOptions = [
    { value: 'Year 1 / Freshman', label: 'Year 1 / Freshman' },
    { value: 'Year 2 / Sophomore', label: 'Year 2 / Sophomore' },
    { value: 'Year 3 / Junior', label: 'Year 3 / Junior' },
    { value: 'Year 4 / Senior', label: 'Year 4 / Senior' },
    { value: 'Postgraduate / Master', label: 'Postgraduate / Master' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      ...initialProfile,
      currentYear,
      semester,
      weeklyStudyGoalHours: parseInt(weeklyStudyGoalHours, 10) || 15,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-5 py-8 max-w-md mx-auto">
      <div className="mb-6">
        <span className="text-xs font-bold text-[#4056D6] tracking-wider uppercase">
          Step 1 of 1 • Academic Setup
        </span>
        <h1 className="text-2xl font-bold text-[#1E293B] mt-1 tracking-tight">
          Welcome, {initialProfile.name || 'Student'}!
        </h1>
        <p className="text-sm text-[#64748B] mt-1.5 leading-relaxed">
          Set up your current academic term so your study schedule and deadlines align with your goals.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-[#E2E8F0] rounded-2xl p-5 bg-white space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <SelectField
          label="Academic Level / Standing"
          options={yearOptions}
          value={currentYear}
          onChange={(e) => setCurrentYear(e.target.value)}
          caption="Current level of study"
        />

        <InputField
          label="Current Academic Term / Semester"
          placeholder="e.g. Fall Semester, Semester 1"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          caption="Helps organize your courses and timetable"
          required
        />

        <InputField
          label="Weekly Study Goal (Hours)"
          type="number"
          min="2"
          max="80"
          value={weeklyStudyGoalHours}
          onChange={(e) => setWeeklyStudyGoalHours(e.target.value)}
          caption="Target hours dedicated to independent coursework & revision"
          required
        />

        <div className="pt-3">
          <Button
            type="submit"
            variant="primary"
            fullWidth
          >
            Enter Study Planner
          </Button>
        </div>
      </form>
    </div>
  );
};
