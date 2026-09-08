import React from 'react';
import { Home, Calendar, CheckSquare, BookOpen, User, Plus } from 'lucide-react';
import { TabType } from '../../types';

interface BottomNavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenQuickAdd: () => void;
  pendingTasksCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuickAdd,
  pendingTasksCount = 0,
}) => {
  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] shadow-sm max-w-md mx-auto"
    >
      <div className="flex items-center justify-between px-2 h-16">
        {/* Tab 1: Home */}
        <button
          id="nav-tab-home"
          type="button"
          onClick={() => onSelectTab('home')}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-colors ${
            currentTab === 'home' ? 'text-[#4056D6]' : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] font-semibold mt-1 tracking-tight">Home</span>
        </button>

        {/* Tab 2: Schedule */}
        <button
          id="nav-tab-schedule"
          type="button"
          onClick={() => onSelectTab('schedule')}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-colors ${
            currentTab === 'schedule' ? 'text-[#4056D6]' : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <Calendar className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] font-semibold mt-1 tracking-tight">Schedule</span>
        </button>

        {/* Global Action: Elevated Add Button */}
        <div className="flex-1 flex items-center justify-center">
          <button
            id="nav-btn-quick-add"
            type="button"
            onClick={onOpenQuickAdd}
            aria-label="Add new academic item"
            className="w-12 h-12 rounded-full bg-[#4056D6] text-white flex items-center justify-center shadow-md hover:bg-[#3446b8] active:bg-[#2b3a9a] transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4056D6] focus:ring-offset-2 -mt-3 cursor-pointer"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab 3: Tasks */}
        <button
          id="nav-tab-tasks"
          type="button"
          onClick={() => onSelectTab('tasks')}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] py-1 relative transition-colors ${
            currentTab === 'tasks' ? 'text-[#4056D6]' : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <div className="relative">
            <CheckSquare className="w-5 h-5 stroke-[2.2]" />
            {pendingTasksCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#4056D6] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
                {pendingTasksCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold mt-1 tracking-tight">Tasks</span>
        </button>

        {/* Tab 4: Courses */}
        <button
          id="nav-tab-courses"
          type="button"
          onClick={() => onSelectTab('courses')}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-colors ${
            currentTab === 'courses' ? 'text-[#4056D6]' : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <BookOpen className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] font-semibold mt-1 tracking-tight">Courses</span>
        </button>

        {/* Tab 5: Profile */}
        <button
          id="nav-tab-profile"
          type="button"
          onClick={() => onSelectTab('profile')}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-colors ${
            currentTab === 'profile' ? 'text-[#4056D6]' : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <User className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] font-semibold mt-1 tracking-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};
