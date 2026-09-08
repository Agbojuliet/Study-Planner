import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { InputField } from '../ui/InputField';
import { StudentProfile } from '../../types';

interface AuthScreenProps {
  onAuthenticate: (profile: StudentProfile) => void;
  onSkipToDemo: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onAuthenticate,
  onSkipToDemo,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@university.edu');
  const [password, setPassword] = useState('••••••••');
  const [institution, setInstitution] = useState('State University of Technology');
  const [major, setMajor] = useState('Computer Science');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticate({
      name: name.trim() || 'Student User',
      email: email.trim() || 'student@university.edu',
      institution: institution.trim() || 'Higher Education Institute',
      major: major.trim() || 'General Studies',
      currentYear: 'Year 2',
      semester: 'Current Semester',
      weeklyStudyGoalHours: 15,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-5 py-8 max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#4056D6] text-white flex items-center justify-center font-bold text-xl mb-4 shadow-sm">
          SP
        </div>
        <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">
          Student Study Planner
        </h1>
        <p className="text-sm text-[#64748B] mt-1.5 leading-relaxed">
          Your entire academic plan, clearly organized in one place.
        </p>
      </div>

      <div className="border border-[#E2E8F0] rounded-2xl p-5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Toggle between Login and Register */}
        <div className="grid grid-cols-2 p-1 bg-[#F1F5F9] rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              isLogin
                ? 'bg-white text-[#4056D6] shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Student Log In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              !isLogin
                ? 'bg-white text-[#4056D6] shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <InputField
                label="Full Name"
                placeholder="e.g. Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <InputField
                label="Institution / University"
                placeholder="e.g. State University of Technology"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
              />

              <InputField
                label="Degree / Major"
                placeholder="e.g. Computer Science, Engineering"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                required
              />
            </>
          )}

          <InputField
            label="Student Email Address"
            type="email"
            placeholder="student@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            caption="Use your university email address"
            required
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
            >
              {isLogin ? 'Sign In to Planner' : 'Complete Registration'}
            </Button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-[#E2E8F0] text-center">
          <button
            type="button"
            onClick={onSkipToDemo}
            className="text-xs font-semibold text-[#4056D6] hover:underline cursor-pointer"
          >
            Explore as Guest Student (Pre-populated sample data)
          </button>
        </div>
      </div>
    </div>
  );
};
