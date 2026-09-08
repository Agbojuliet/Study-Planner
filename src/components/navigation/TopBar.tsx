import React from 'react';
import { Bell, CalendarDays } from 'lucide-react';
import { TabType } from '../../types';

interface TopBarProps {
  currentTab: TabType;
  onNavigateTab: (tab: TabType) => void;
  unreadNotificationsCount?: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onNavigateTab,
  unreadNotificationsCount = 0,
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'home':
        return 'Study Planner';
      case 'schedule':
        return 'Academic Schedule';
      case 'tasks':
        return 'Tasks & Deadlines';
      case 'courses':
        return 'Enrolled Courses';
      case 'profile':
        return 'Student Profile';
      case 'calendar':
        return 'Academic Calendar';
      case 'notifications':
        return 'Notifications';
      default:
        return 'Study Planner';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#4056D6] flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-xs">
          SP
        </div>
        <h1 className="text-base font-bold text-[#1E293B] tracking-tight">{getTabTitle()}</h1>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Calendar shortcut */}
        <button
          type="button"
          id="topbar-btn-calendar"
          aria-label="Open Academic Calendar"
          onClick={() => onNavigateTab('calendar')}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
            currentTab === 'calendar'
              ? 'bg-[#F2F4FC] text-[#4056D6]'
              : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]'
          }`}
        >
          <CalendarDays className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Notifications shortcut */}
        <button
          type="button"
          id="topbar-btn-notifications"
          aria-label="Open Notifications"
          onClick={() => onNavigateTab('notifications')}
          className={`w-9 h-9 rounded-xl flex items-center justify-center relative transition-colors cursor-pointer ${
            currentTab === 'notifications'
              ? 'bg-[#F2F4FC] text-[#4056D6]'
              : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]'
          }`}
        >
          <Bell className="w-4 h-4 stroke-[2.2]" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4056D6] rounded-full ring-2 ring-white" />
          )}
        </button>
      </div>
    </header>
  );
};
