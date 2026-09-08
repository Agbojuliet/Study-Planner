import React from 'react';
import { Clock, Calendar, CheckCircle2, Circle, ArrowRight, Play } from 'lucide-react';
import { Course, ScheduleItem, StudentProfile, StudySession, Task } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface HomeScreenProps {
  profile: StudentProfile;
  courses: Course[];
  tasks: Task[];
  schedule: ScheduleItem[];
  studySessions: StudySession[];
  onToggleTask: (taskId: string) => void;
  onNavigateTab: (tab: any) => void;
  onOpenStudyModal: () => void;
  onOpenQuickAdd: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  courses,
  tasks,
  schedule,
  studySessions,
  onToggleTask,
  onNavigateTab,
  onOpenStudyModal,
  onOpenQuickAdd,
}) => {
  // Current date formatting
  const today = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[today.getDay()] as ScheduleItem['day'];
  const todayIso = today.toISOString().split('T')[0];

  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  // Filter today's classes
  const todaysSchedule = schedule
    .filter((s) => s.day === todayName)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Filter tasks due today & pending
  const tasksDueToday = tasks.filter((t) => t.dueDate === todayIso);
  const completedTodayCount = tasksDueToday.filter((t) => t.completed).length;

  // Upcoming deadlines (next 7 days, excluding today)
  const upcomingDeadlines = tasks
    .filter((t) => t.dueDate > todayIso && !t.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 3);

  // Today's scheduled study sessions
  const todaysStudy = studySessions.filter((s) => s.scheduledDate === todayIso);

  // Highest priority academic focus item
  const focusTask = tasksDueToday.find((t) => !t.completed && t.priority === 'high') ||
    tasksDueToday.find((t) => !t.completed) ||
    tasks.find((t) => !t.completed && t.priority === 'high');

  // Overall course progress average
  const avgProgress = courses.length > 0
    ? Math.round(courses.reduce((acc, c) => acc + c.progressPercentage, 0) / courses.length)
    : 0;

  return (
    <div className="space-y-5 pb-8">
      {/* 1. Greeting / Current Day */}
      <section id="home-greeting-section" className="pt-2">
        <p className="text-xs font-semibold text-[#64748B] tracking-wide uppercase">
          {formattedDate}
        </p>
        <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight mt-0.5">
          Hello, {profile.name.split(' ')[0]}
        </h1>
        <p className="text-sm text-[#64748B]">
          {profile.semester} • {profile.major}
        </p>
      </section>

      {/* 2. Today's Academic Focus */}
      <section id="home-focus-section">
        <div className="bg-[#F2F4FC] border border-[#D5DAF6] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4056D6] uppercase tracking-wider">
              Today's Key Focus
            </span>
            {focusTask && (
              <Badge variant="primary" size="sm">
                Due {focusTask.dueTime || 'Today'}
              </Badge>
            )}
          </div>
          {focusTask ? (
            <div>
              <h2 className="text-base font-bold text-[#1E293B] leading-snug">
                {focusTask.title}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-xs text-[#64748B]">
                {focusTask.courseCode && (
                  <span className="font-semibold text-[#4056D6]">{focusTask.courseCode}</span>
                )}
                <span>•</span>
                <span>Est. {focusTask.estimatedMinutes || 60} mins</span>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-base font-bold text-[#1E293B]">
                All major tasks clear for today
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Use your free block to review upcoming readings or schedule a focused study session.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Today's Schedule */}
      <section id="home-schedule-section">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#1E293B]">Today's Classes</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B]">
              {todaysSchedule.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('schedule')}
            className="text-xs font-semibold text-[#4056D6] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Full Timetable <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {todaysSchedule.length === 0 ? (
          <Card padding="md" variant="subtle">
            <p className="text-xs text-[#64748B] text-center py-2">
              No classes scheduled for {todayName}. Great day for independent study!
            </p>
          </Card>
        ) : (
          <div className="space-y-2.5">
            {todaysSchedule.map((item) => (
              <Card key={item.id} padding="md" variant="default">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#4056D6] bg-[#F2F4FC] px-2 py-0.5 rounded-md">
                        {item.courseCode}
                      </span>
                      <span className="text-xs font-medium text-[#64748B]">{item.type}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#1E293B] mt-1.5">{item.courseName}</h3>
                    <p className="text-xs text-[#64748B] mt-1 flex items-center gap-1">
                      <span className="font-medium text-[#1E293B]">{item.room}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#1E293B]">
                      {item.startTime} - {item.endTime}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* 4. Tasks Due Today */}
      <section id="home-tasks-section">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#1E293B]">Tasks Due Today</h2>
            {tasksDueToday.length > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B]">
                {completedTodayCount}/{tasksDueToday.length} done
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('tasks')}
            className="text-xs font-semibold text-[#4056D6] hover:underline flex items-center gap-1 cursor-pointer"
          >
            All Tasks <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {tasksDueToday.length === 0 ? (
          <Card padding="md" variant="subtle">
            <p className="text-xs text-[#64748B] text-center py-2">
              No tasks due today. Check upcoming deadlines below.
            </p>
          </Card>
        ) : (
          <div className="space-y-2">
            {tasksDueToday.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className="flex items-start gap-3 p-3.5 bg-white border border-[#E2E8F0] rounded-xl cursor-pointer hover:border-[#8190E4] transition-colors select-none"
              >
                <button
                  type="button"
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                  className="mt-0.5 text-[#4056D6] shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#4056D6] fill-[#F2F4FC]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#94A3B8]" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold leading-snug ${
                      task.completed ? 'line-through text-[#94A3B8]' : 'text-[#1E293B]'
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {task.courseCode && (
                      <span className="text-[11px] font-semibold text-[#4056D6]">
                        {task.courseCode}
                      </span>
                    )}
                    <span className="text-[11px] text-[#64748B]">Due {task.dueTime}</span>
                    {task.priority === 'high' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-50 text-rose-600">
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Upcoming Deadlines */}
      <section id="home-upcoming-section">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-base font-bold text-[#1E293B]">Upcoming Deadlines</h2>
          <button
            type="button"
            onClick={onOpenQuickAdd}
            className="text-xs font-semibold text-[#4056D6] hover:underline cursor-pointer"
          >
            + Add Task
          </button>
        </div>

        {upcomingDeadlines.length === 0 ? (
          <Card padding="md" variant="subtle">
            <p className="text-xs text-[#64748B] text-center py-2">
              No upcoming deadlines in the next week.
            </p>
          </Card>
        ) : (
          <div className="space-y-2">
            {upcomingDeadlines.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-white border border-[#E2E8F0] rounded-xl"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-sm font-semibold text-[#1E293B] truncate">{task.title}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {task.courseCode ? `${task.courseCode} • ` : ''}
                    Due {task.dueDate} {task.dueTime ? `at ${task.dueTime}` : ''}
                  </p>
                </div>
                <Badge
                  variant={task.priority === 'high' ? 'danger' : 'neutral'}
                  size="sm"
                >
                  {task.type}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Study Session Block */}
      <section id="home-study-section">
        <div className="border border-[#E2E8F0] rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#4056D6]" />
              <h2 className="text-sm font-bold text-[#1E293B]">Study Focus & Break</h2>
            </div>
            <button
              type="button"
              onClick={onOpenStudyModal}
              className="text-xs font-semibold text-[#4056D6] hover:underline cursor-pointer"
            >
              Configure Plan
            </button>
          </div>

          {todaysStudy.length > 0 ? (
            <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0] mb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E293B]">{todaysStudy[0].title}</span>
                <span className="text-xs text-[#4056D6] font-semibold">
                  {todaysStudy[0].durationMinutes}m study + {todaysStudy[0].breakMinutes}m break
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-1">
                Scheduled for {todaysStudy[0].scheduledTime || 'today'}
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#64748B] mb-3">
              Maintain consistent study habits by planning 45-minute focus blocks with scheduled breaks.
            </p>
          )}

          <Button
            variant="secondary"
            size="sm"
            fullWidth
            leftIcon={<Play className="w-3.5 h-3.5" />}
            onClick={onOpenStudyModal}
          >
            Launch Active Study Timer
          </Button>
        </div>
      </section>

      {/* 7. Course & Academic Progress Summary */}
      <section id="home-progress-section">
        <div className="border border-[#E2E8F0] rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-[#1E293B]">Academic Progress</h2>
            <span className="text-xs font-bold text-[#4056D6]">{avgProgress}% avg</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#F1F5F9] rounded-full h-2 overflow-hidden mb-3">
            <div
              className="bg-[#4056D6] h-full rounded-full transition-all duration-300"
              style={{ width: `${avgProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>{courses.length} enrolled courses</span>
            <button
              type="button"
              onClick={() => onNavigateTab('courses')}
              className="font-semibold text-[#4056D6] hover:underline cursor-pointer"
            >
              View Course Details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
