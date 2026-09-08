import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';
import { Task, TaskType } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface TasksScreenProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenCreateTask: () => void;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onOpenCreateTask,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [statusTab, setStatusTab] = useState<'pending' | 'completed'>('pending');

  const todayIso = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (statusTab === 'pending' && task.completed) return false;
    if (statusTab === 'completed' && !task.completed) return false;

    // Type filter
    if (filterType !== 'all' && task.type !== filterType) return false;

    return true;
  });

  const getDeadlineStatus = (dueDate: string, completed: boolean) => {
    if (completed) return { text: 'Completed', variant: 'neutral' as const };
    if (dueDate < todayIso) return { text: 'Overdue', variant: 'danger' as const };
    if (dueDate === todayIso) return { text: 'Due Today', variant: 'warning' as const };
    return { text: `Due ${dueDate}`, variant: 'neutral' as const };
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-4 pb-8">
      {/* Top Header & Add Button */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-base font-bold text-[#1E293B]">Academic Tasks</h2>
          <p className="text-xs text-[#64748B]">Assignments, projects, and deadlines</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={onOpenCreateTask}
        >
          New Task
        </Button>
      </div>

      {/* Pending vs Completed tabs */}
      <div className="grid grid-cols-2 p-1 bg-[#F1F5F9] rounded-xl text-xs font-bold">
        <button
          type="button"
          onClick={() => setStatusTab('pending')}
          className={`py-2 rounded-lg transition-all cursor-pointer ${
            statusTab === 'pending'
              ? 'bg-white text-[#4056D6] shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          To Do ({pendingCount})
        </button>
        <button
          type="button"
          onClick={() => setStatusTab('completed')}
          className={`py-2 rounded-lg transition-all cursor-pointer ${
            statusTab === 'completed'
              ? 'bg-white text-[#4056D6] shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Type Filter Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
        {[
          { id: 'all', label: 'All Items' },
          { id: 'assignment', label: 'Assignments' },
          { id: 'project', label: 'Projects' },
          { id: 'reading', label: 'Readings' },
          { id: 'task', label: 'General' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilterType(item.id)}
            className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterType === item.id
                ? 'bg-[#4056D6] text-white'
                : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:bg-[#F1F5F9]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="border border-[#E2E8F0] rounded-xl p-8 text-center bg-[#F8FAFC]">
          <p className="text-sm font-semibold text-[#1E293B]">No tasks found</p>
          <p className="text-xs text-[#64748B] mt-1 mb-4">
            {statusTab === 'pending'
              ? 'You have completed all items in this category.'
              : 'No completed tasks yet.'}
          </p>
          {statusTab === 'pending' && (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={onOpenCreateTask}
            >
              Add Academic Task
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => {
            const status = getDeadlineStatus(task.dueDate, task.completed);

            return (
              <div
                key={task.id}
                className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 transition-colors hover:border-[#8190E4]"
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleTask(task.id)}
                    aria-label="Toggle completion"
                    className="mt-0.5 text-[#4056D6] shrink-0 cursor-pointer"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4056D6] fill-[#F2F4FC]" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#94A3B8]" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-sm font-bold leading-snug ${
                          task.completed ? 'line-through text-[#94A3B8]' : 'text-[#1E293B]'
                        }`}
                      >
                        {task.title}
                      </p>
                      <button
                        type="button"
                        onClick={() => onDeleteTask(task.id)}
                        className="text-[#94A3B8] hover:text-rose-500 p-1 rounded-md cursor-pointer transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {task.notes && (
                      <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{task.notes}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mt-2 pt-1 border-t border-[#F8FAFC]">
                      {task.courseCode && (
                        <span className="text-[11px] font-bold text-[#4056D6] bg-[#F2F4FC] px-2 py-0.5 rounded-md">
                          {task.courseCode}
                        </span>
                      )}

                      <Badge variant={status.variant} size="sm">
                        {status.text} {task.dueTime ? `at ${task.dueTime}` : ''}
                      </Badge>

                      <Badge variant="neutral" size="sm">
                        {task.type}
                      </Badge>

                      {task.estimatedMinutes && (
                        <span className="text-[11px] text-[#64748B] flex items-center gap-1 ml-auto">
                          <Clock className="w-3 h-3 text-[#94A3B8]" />
                          {task.estimatedMinutes}m
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
