import React from 'react';
import { X, CheckSquare, Calendar, BookOpen, Clock } from 'lucide-react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: 'task' | 'schedule' | 'course' | 'study') => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  if (!isOpen) return null;

  const actions = [
    {
      id: 'task' as const,
      title: 'New Task / Assignment',
      description: 'Track homework, projects, or reading assignments',
      icon: <CheckSquare className="w-5 h-5 text-[#4056D6]" />,
      bg: 'bg-[#F2F4FC]',
    },
    {
      id: 'schedule' as const,
      title: 'Add Class Schedule',
      description: 'Add a recurring lecture, lab, or tutorial time',
      icon: <Calendar className="w-5 h-5 text-[#4056D6]" />,
      bg: 'bg-[#F2F4FC]',
    },
    {
      id: 'study' as const,
      title: 'Schedule Study Session',
      description: 'Plan focused study time with structured breaks',
      icon: <Clock className="w-5 h-5 text-[#4056D6]" />,
      bg: 'bg-[#F2F4FC]',
    },
    {
      id: 'course' as const,
      title: 'Enroll New Course',
      description: 'Add course code, lecturer info, and credits',
      icon: <BookOpen className="w-5 h-5 text-[#4056D6]" />,
      bg: 'bg-[#F2F4FC]',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4 transition-opacity">
      <div
        className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 border border-[#E2E8F0] shadow-xl animate-in fade-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-base font-bold text-[#1E293B]">Quick Add</h2>
            <p className="text-xs text-[#64748B]">What would you like to plan?</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5 pt-4">
          {actions.map((act) => (
            <button
              key={act.id}
              type="button"
              onClick={() => {
                onClose();
                onSelectAction(act.id);
              }}
              className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[#E2E8F0] hover:border-[#8190E4] hover:bg-[#F2F4FC]/40 transition-colors text-left cursor-pointer active:scale-[0.99]"
            >
              <div className={`w-10 h-10 rounded-xl ${act.bg} flex items-center justify-center shrink-0`}>
                {act.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-[#1E293B]">{act.title}</div>
                <div className="text-xs text-[#64748B] truncate">{act.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
