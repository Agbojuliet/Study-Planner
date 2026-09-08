import React, { useState } from 'react';
import { User, BookOpen, Clock, LogOut, RotateCcw } from 'lucide-react';
import { StudentProfile } from '../../types';
import { Button } from '../ui/Button';
import { InputField } from '../ui/InputField';
import { Card } from '../ui/Card';

interface ProfileScreenProps {
  profile: StudentProfile;
  totalCourses: number;
  totalTasksCompleted: number;
  onUpdateProfile: (updated: StudentProfile) => void;
  onResetData: () => void;
  onSignOut: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  totalCourses,
  totalTasksCompleted,
  onUpdateProfile,
  onResetData,
  onSignOut,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [institution, setInstitution] = useState(profile.institution);
  const [major, setMajor] = useState(profile.major);
  const [currentYear, setCurrentYear] = useState(profile.currentYear);
  const [semester, setSemester] = useState(profile.semester);
  const [weeklyGoal, setWeeklyGoal] = useState(profile.weeklyStudyGoalHours.toString());

  // Settings
  const [classReminders, setClassReminders] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      institution,
      major,
      currentYear,
      semester,
      weeklyStudyGoalHours: parseInt(weeklyGoal, 10) || 15,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Profile Header */}
      <div className="pt-1 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#1E293B]">Student Profile</h2>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs font-semibold text-[#4056D6] hover:underline cursor-pointer"
        >
          {isEditing ? 'Cancel' : 'Edit Info'}
        </button>
      </div>

      <Card padding="md" variant="default">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-[#4056D6] text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
            {profile.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-[#1E293B] truncate">{profile.name}</h3>
            <p className="text-xs text-[#64748B] truncate">{profile.email}</p>
            <p className="text-xs text-[#4056D6] font-semibold mt-0.5">
              {profile.institution}
            </p>
          </div>
        </div>
      </Card>

      {/* Academic Highlights */}
      <div className="grid grid-cols-2 gap-3">
        <Card padding="md" variant="subtle" className="text-center">
          <BookOpen className="w-4 h-4 text-[#4056D6] mx-auto mb-1" />
          <div className="text-lg font-bold text-[#1E293B]">{totalCourses}</div>
          <div className="text-xs text-[#64748B]">Active Courses</div>
        </Card>

        <Card padding="md" variant="subtle" className="text-center">
          <Clock className="w-4 h-4 text-[#4056D6] mx-auto mb-1" />
          <div className="text-lg font-bold text-[#1E293B]">{totalTasksCompleted}</div>
          <div className="text-xs text-[#64748B]">Tasks Completed</div>
        </Card>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="border border-[#E2E8F0] rounded-xl p-4 bg-white space-y-3">
          <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            Academic Information
          </h4>

          <InputField
            label="Institution / University"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />

          <InputField
            label="Degree / Major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Academic Year"
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
            />
            <InputField
              label="Term / Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
          </div>

          <InputField
            label="Weekly Study Goal (Hours)"
            type="number"
            min="2"
            max="80"
            value={weeklyGoal}
            onChange={(e) => setWeeklyGoal(e.target.value)}
          />

          <div className="pt-2 flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              fullWidth
            >
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <Card padding="md" variant="default" className="space-y-2.5">
          <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            Academic Status
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[#64748B] block">Degree & Major:</span>
              <span className="font-semibold text-[#1E293B]">{profile.major}</span>
            </div>
            <div>
              <span className="text-[#64748B] block">Current Standing:</span>
              <span className="font-semibold text-[#1E293B]">{profile.currentYear}</span>
            </div>
            <div>
              <span className="text-[#64748B] block">Academic Term:</span>
              <span className="font-semibold text-[#1E293B]">{profile.semester}</span>
            </div>
            <div>
              <span className="text-[#64748B] block">Study Goal:</span>
              <span className="font-semibold text-[#4056D6]">{profile.weeklyStudyGoalHours} hrs/week</span>
            </div>
          </div>
        </Card>
      )}

      {/* Reminder & Notification Settings */}
      <Card padding="md" variant="default" className="space-y-3">
        <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
          Reminder Preferences
        </h4>

        <div className="flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-[#1E293B]">Class Schedule Alerts</div>
            <div className="text-[#64748B]">Notify 30 mins before lectures & labs</div>
          </div>
          <input
            type="checkbox"
            checked={classReminders}
            onChange={() => setClassReminders(!classReminders)}
            className="w-4 h-4 rounded text-[#4056D6] focus:ring-[#4056D6] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F1F5F9]">
          <div>
            <div className="font-bold text-[#1E293B]">Assignment Deadlines</div>
            <div className="text-[#64748B]">Alert 24h & 2h before due time</div>
          </div>
          <input
            type="checkbox"
            checked={deadlineAlerts}
            onChange={() => setDeadlineAlerts(!deadlineAlerts)}
            className="w-4 h-4 rounded text-[#4056D6] focus:ring-[#4056D6] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F1F5F9]">
          <div>
            <div className="font-bold text-[#1E293B]">Study Focus Reminders</div>
            <div className="text-[#64748B]">Remind when scheduled study blocks begin</div>
          </div>
          <input
            type="checkbox"
            checked={studyReminders}
            onChange={() => setStudyReminders(!studyReminders)}
            className="w-4 h-4 rounded text-[#4056D6] focus:ring-[#4056D6] cursor-pointer"
          />
        </div>
      </Card>

      {/* Actions */}
      <div className="space-y-2 pt-2">
        <Button
          variant="outline"
          fullWidth
          size="sm"
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          onClick={onResetData}
        >
          Reset Sample Planner Data
        </Button>

        <Button
          variant="ghost"
          fullWidth
          size="sm"
          leftIcon={<LogOut className="w-3.5 h-3.5 text-rose-500" />}
          className="text-rose-600 hover:bg-rose-50"
          onClick={onSignOut}
        >
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
};
