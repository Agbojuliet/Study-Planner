import { useState, useEffect } from 'react';
import {
  initialCourses,
  initialNotifications,
  initialSchedule,
  initialStudentProfile,
  initialStudySessions,
  initialTasks,
} from './data/initialData';
import {
  Course,
  NotificationItem,
  ScheduleItem,
  StudentProfile,
  StudySession,
  TabType,
  Task,
} from './types';

// UI & Navigation
import { TopBar } from './components/navigation/TopBar';
import { BottomNavigation } from './components/navigation/BottomNavigation';

// Screens
import { HomeScreen } from './components/screens/HomeScreen';
import { ScheduleScreen } from './components/screens/ScheduleScreen';
import { TasksScreen } from './components/screens/TasksScreen';
import { CoursesScreen } from './components/screens/CoursesScreen';
import { CalendarScreen } from './components/screens/CalendarScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';

// Modals
import { QuickAddModal } from './components/modals/QuickAddModal';
import { CreateTaskModal } from './components/modals/CreateTaskModal';
import { CreateCourseModal } from './components/modals/CreateCourseModal';
import { CreateScheduleModal } from './components/modals/CreateScheduleModal';
import { StudySessionModal } from './components/modals/StudySessionModal';

export default function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('ssp_auth');
    return saved ? JSON.parse(saved) : true;
  });

  const [isOnboarding, setIsOnboarding] = useState<boolean>(() => {
    const saved = localStorage.getItem('ssp_onboarding');
    return saved ? JSON.parse(saved) : false;
  });

  // Navigation tab
  const [currentTab, setCurrentTab] = useState<TabType>('home');

  // Academic Planner State with localStorage persistence
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('ssp_profile');
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ssp_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('ssp_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('ssp_schedule');
    return saved ? JSON.parse(saved) : initialSchedule;
  });

  const [studySessions, setStudySessions] = useState<StudySession[]>(() => {
    const saved = localStorage.getItem('ssp_study_sessions');
    return saved ? JSON.parse(saved) : initialStudySessions;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ssp_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Modal states
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isCreateScheduleOpen, setIsCreateScheduleOpen] = useState(false);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ssp_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('ssp_onboarding', JSON.stringify(isOnboarding));
  }, [isOnboarding]);

  useEffect(() => {
    localStorage.setItem('ssp_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('ssp_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('ssp_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('ssp_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('ssp_study_sessions', JSON.stringify(studySessions));
  }, [studySessions]);

  useEffect(() => {
    localStorage.setItem('ssp_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Task Actions
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleCreateTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // Course Actions
  const handleCreateCourse = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  const handleUpdateCourseProgress = (courseId: string, progress: number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, progressPercentage: progress } : c))
    );
  };

  // Schedule Actions
  const handleCreateSchedule = (newItem: ScheduleItem) => {
    setSchedule((prev) => [...prev, newItem]);
  };

  // Study Session Actions
  const handleSaveStudySession = (newSession: StudySession) => {
    setStudySessions((prev) => [newSession, ...prev]);
  };

  // Notification Actions
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Reset to initial sample data
  const handleResetData = () => {
    setProfile(initialStudentProfile);
    setCourses(initialCourses);
    setTasks(initialTasks);
    setSchedule(initialSchedule);
    setStudySessions(initialStudySessions);
    setNotifications(initialNotifications);
  };

  // Auth handlers
  const handleAuthenticate = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    setIsAuthenticated(true);
    setIsOnboarding(true);
  };

  const handleCompleteOnboarding = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    setIsOnboarding(false);
    setCurrentTab('home');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  // Quick Add action router
  const handleQuickAddSelect = (action: 'task' | 'schedule' | 'course' | 'study') => {
    switch (action) {
      case 'task':
        setIsCreateTaskOpen(true);
        break;
      case 'schedule':
        setIsCreateScheduleOpen(true);
        break;
      case 'course':
        setIsCreateCourseOpen(true);
        break;
      case 'study':
        setIsStudyModalOpen(true);
        break;
    }
  };

  // If unauthenticated, show AuthScreen
  if (!isAuthenticated) {
    return (
      <AuthScreen
        onAuthenticate={handleAuthenticate}
        onSkipToDemo={() => {
          setIsAuthenticated(true);
          setIsOnboarding(false);
        }}
      />
    );
  }

  // If onboarding required, show OnboardingScreen
  if (isOnboarding) {
    return (
      <OnboardingScreen
        initialProfile={profile}
        onComplete={handleCompleteOnboarding}
      />
    );
  }

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center text-[#1E293B]">
      {/* Mobile-first viewport container max-w-md */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-sm flex flex-col relative border-x border-[#E2E8F0]">
        {/* Top Header */}
        <TopBar
          currentTab={currentTab}
          onNavigateTab={setCurrentTab}
          unreadNotificationsCount={unreadNotificationsCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 pt-3 pb-20 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeScreen
              profile={profile}
              courses={courses}
              tasks={tasks}
              schedule={schedule}
              studySessions={studySessions}
              onToggleTask={handleToggleTask}
              onNavigateTab={setCurrentTab}
              onOpenStudyModal={() => setIsStudyModalOpen(true)}
              onOpenQuickAdd={() => setIsQuickAddOpen(true)}
            />
          )}

          {currentTab === 'schedule' && (
            <ScheduleScreen
              schedule={schedule}
              onOpenAddSchedule={() => setIsCreateScheduleOpen(true)}
            />
          )}

          {currentTab === 'tasks' && (
            <TasksScreen
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onOpenCreateTask={() => setIsCreateTaskOpen(true)}
            />
          )}

          {currentTab === 'courses' && (
            <CoursesScreen
              courses={courses}
              tasks={tasks}
              onOpenCreateCourse={() => setIsCreateCourseOpen(true)}
              onUpdateCourseProgress={handleUpdateCourseProgress}
            />
          )}

          {currentTab === 'calendar' && (
            <CalendarScreen
              tasks={tasks}
              schedule={schedule}
              onToggleTask={handleToggleTask}
            />
          )}

          {currentTab === 'notifications' && (
            <NotificationsScreen
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearAll={handleClearNotifications}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen
              profile={profile}
              totalCourses={courses.length}
              totalTasksCompleted={tasks.filter((t) => t.completed).length}
              onUpdateProfile={setProfile}
              onResetData={handleResetData}
              onSignOut={handleSignOut}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenQuickAdd={() => setIsQuickAddOpen(true)}
          pendingTasksCount={pendingTasksCount}
        />

        {/* Modals */}
        <QuickAddModal
          isOpen={isQuickAddOpen}
          onClose={() => setIsQuickAddOpen(false)}
          onSelectAction={handleQuickAddSelect}
        />

        <CreateTaskModal
          isOpen={isCreateTaskOpen}
          onClose={() => setIsCreateTaskOpen(false)}
          courses={courses}
          onCreateTask={handleCreateTask}
        />

        <CreateCourseModal
          isOpen={isCreateCourseOpen}
          onClose={() => setIsCreateCourseOpen(false)}
          onCreateCourse={handleCreateCourse}
        />

        <CreateScheduleModal
          isOpen={isCreateScheduleOpen}
          onClose={() => setIsCreateScheduleOpen(false)}
          courses={courses}
          onCreateSchedule={handleCreateSchedule}
        />

        <StudySessionModal
          isOpen={isStudyModalOpen}
          onClose={() => setIsStudyModalOpen(false)}
          courses={courses}
          onSaveSession={handleSaveStudySession}
        />
      </div>
    </div>
  );
}
