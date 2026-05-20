import React from 'react';
import clsx from 'clsx';
import { PhoneOutgoing, PhoneIncoming, PhoneMissed } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { EmptyState } from '@/components/states/EmptyState';
import { formatDate, formatDuration } from '@/utils/formatters';

interface Call {
  id: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  type: 'incoming' | 'outgoing' | 'missed';
  duration: number; // in seconds
  date: string;
  status: 'completed' | 'failed' | 'ongoing';
}

interface RecentCallsProps {
  calls: Call[];
  isEmpty?: boolean;
}

export const RecentCalls: React.FC<RecentCallsProps> = ({ calls, isEmpty = false }) => {
  return (
    <Card noPadding className="overflow-hidden flex flex-col h-full border border-slate-200 dark:border-slate-800">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">Recent Activity</h2>
        {!isEmpty && (
          <button className="text-sm text-brand-500 font-semibold hover:text-brand-600 dark:text-brand-450 dark:hover:text-brand-400 transition-colors">
            View All
          </button>
        )}
      </div>
      
      {isEmpty ? (
        <div className="flex-1 flex flex-col justify-center py-8">
          <EmptyState 
            title="No Recent Activity" 
            description="You have not made or received any calls recently." 
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="bg-slate-50/75 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-3.5 font-bold">User</th>
                <th className="px-6 py-3.5 font-bold">Type</th>
                <th className="px-6 py-3.5 font-bold">Duration</th>
                <th className="px-6 py-3.5 font-bold">Date</th>
                <th className="px-6 py-3.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {calls.map((call) => (
                <tr key={call.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={call.user.avatar} alt={call.user.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-850" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{call.user.name}</p>
                        <p className="text-xs text-slate-450 truncate">{call.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      {call.type === 'incoming' && <PhoneIncoming className="w-4 h-4 text-brand-500 shrink-0" />}
                      {call.type === 'outgoing' && <PhoneOutgoing className="w-4 h-4 text-slate-450 shrink-0" />}
                      {call.type === 'missed' && <PhoneMissed className="w-4 h-4 text-feedback-error shrink-0" />}
                      <span className="text-sm text-slate-605 dark:text-slate-400 capitalize font-medium">{call.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-655 dark:text-slate-350 font-medium">
                    {formatDuration(call.duration)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-450 dark:text-slate-500">
                    {formatDate(call.date)}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={clsx(
                      "px-2.5 py-1 text-xs font-bold rounded-full",
                      call.status === 'completed' && "bg-emerald-50 dark:bg-emerald-950/20 text-feedback-success",
                      call.status === 'failed' && "bg-red-50 dark:bg-red-950/20 text-feedback-error",
                      call.status === 'ongoing' && "bg-brand-50 dark:bg-brand-950/20 text-brand-500"
                    )}>
                      {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
