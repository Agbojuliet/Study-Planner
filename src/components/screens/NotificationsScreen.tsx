import React from 'react';
import { CheckCheck, Bell, Clock, Calendar, AlertCircle } from 'lucide-react';
import { NotificationItem } from '../../types';
import { Card } from '../ui/Card';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onMarkAllAsRead,
  onClearAll,
}) => {
  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'deadline':
        return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case 'class':
        return <Calendar className="w-4 h-4 text-[#4056D6]" />;
      case 'study':
        return <Clock className="w-4 h-4 text-[#4056D6]" />;
      default:
        return <Bell className="w-4 h-4 text-[#64748B]" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-base font-bold text-[#1E293B]">Notifications & Reminders</h2>
          <p className="text-xs text-[#64748B]">
            {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount === 1 ? '' : 's'}` : 'All caught up'}
          </p>
        </div>
        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="text-xs font-semibold text-[#4056D6] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Mark read
            </button>
          </div>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card padding="lg" variant="subtle" className="text-center py-8">
          <Bell className="w-8 h-8 mx-auto text-[#94A3B8] mb-2 stroke-[1.5]" />
          <p className="text-sm font-semibold text-[#1E293B]">No notifications</p>
          <p className="text-xs text-[#64748B] mt-1">
            You'll receive reminders for upcoming classes, assignments, and study blocks.
          </p>
        </Card>
      ) : (
        <div className="space-y-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-colors ${
                item.read
                  ? 'bg-white border-[#E2E8F0]'
                  : 'bg-[#F2F4FC]/50 border-[#ABB5ED]/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-[#1E293B] truncate">{item.title}</h3>
                    <span className="text-[11px] text-[#94A3B8] shrink-0">{item.timeAgo}</span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{item.message}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-[#94A3B8] hover:text-rose-500 font-semibold cursor-pointer"
            >
              Clear all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
