import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { getProfile, getCallStats, getCallHistory } from '@/api/dashboardService';
import type { CallSession, CallStats } from '@/api/dashboardService';
import { PieChart, Clock, Sparkles, Calendar, MoreVertical } from 'lucide-react';

// Helper to format seconds -> "Xm Ysec"
const formatDuration = (seconds: number) => {
  if (!seconds) return '0';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}sec`;
};

// Helper to group calls by date
const groupCallsByDate = (calls: CallSession[]) => {
  const groups: Record<string, CallSession[]> = {};
  calls.forEach(call => {
    const dateObj = new Date(call.started_at);
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const suffix = ['th', 'st', 'nd', 'rd'][(dateObj.getDate() % 10 > 3 ? 0 : dateObj.getDate() % 10) + (dateObj.getDate() > 10 && dateObj.getDate() < 14 ? -dateObj.getDate() % 10 : 0)] || 'th';
    const formattedDate = `${dateStr}${suffix}`;

    if (!groups[formattedDate]) {
      groups[formattedDate] = [];
    }
    groups[formattedDate].push(call);
  });
  
  return Object.entries(groups).map(([date, calls]) => ({ id: date, date, calls }));
};

export const Dashboard: React.FC = () => {
  const { user } = useAppStore();
  
  const [greeting, setGreeting] = useState('');
  const [stats, setStats] = useState<CallStats>({ totalSessions: 0, averageDuration: 0, totalAIInteractions: 0, lastSession: [] });
  const [calls, setCalls] = useState<CallSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileRes, statsRes, historyRes] = await Promise.all([
          getProfile(),
          getCallStats(),
          getCallHistory(10)
        ]);
        
        setGreeting(`Hi, ${profileRes.firstName} 👋`);
        setStats(statsRes);
        setCalls(historyRes.callSessions || []);
      } catch (err) {
        console.error('Dashboard fetch error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const groupedCalls = groupCallsByDate(calls);

  const getLastSessionString = (dates: string[]) => {
    if (!dates || dates.length === 0) return '-';
    // Simplified logic: just say "2 days ago" or similar based on first date
    const date = new Date(dates[0]);
    const diff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  };

  return (
    <div className="w-[1005px] max-w-full mx-auto mt-8 px-4 sm:px-0 animate-fade-in">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4 md:gap-0">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-1">
            {greeting} Welcome to Hintro
          </h2>
          <p className="text-[11px] md:text-sm text-slate-500">
            Ready to make your next call smarter ?
          </p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md text-xs md:text-sm font-medium hover:bg-slate-800 transition-colors self-start">
          Start Call
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
        {/* Card 1 */}
        <div className="bg-white border border-[#E2E2E8] rounded-xl p-4 flex items-center gap-4 h-[80px]">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
            <PieChart className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Total Sessions</p>
            <p className="text-[17px] font-bold text-slate-900 leading-none">
              {loading ? '-' : stats.totalSessions}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#E2E2E8] rounded-xl p-4 flex items-center gap-4 h-[80px]">
          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Average Duration</p>
            <p className="text-[17px] font-bold text-slate-900 leading-none">
              {loading ? '-' : formatDuration(stats.averageDuration)}
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#E2E2E8] rounded-xl p-4 flex items-center gap-4 h-[80px]">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">AI Used</p>
            <p className="text-[17px] font-bold text-slate-900 leading-none">
              {loading ? '-' : `${stats.totalAIInteractions} times`}
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-[#E2E2E8] rounded-xl p-4 flex items-center gap-4 h-[80px]">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Last Session</p>
            <p className="text-[17px] font-bold text-slate-900 leading-none">
              {loading ? '-' : getLastSessionString(stats.lastSession)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Calls Section */}
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-semibold text-slate-900 mb-6">Recent calls</h3>
        
        <div className="w-[802px] max-w-full flex flex-col gap-6">
          {!loading && calls.length === 0 ? (
            // Empty State
            <div className="w-[802px] max-w-full h-[219px] bg-white border-0 md:border md:border-[#E2E2E8] rounded-2xl flex flex-col items-center justify-center gap-[12px] animate-fade-in">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-1">
                <Calendar className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="text-[15px] font-semibold text-slate-900">No Recent Calls</h4>
              <p className="text-[12px] text-slate-400 text-center max-w-[360px] leading-relaxed">
                Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
              </p>
              <button className="mt-2 px-4 py-1.5 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Start a Call
              </button>
            </div>
          ) : (
            // Populated State
            groupedCalls.map((group) => (
              <div key={group.id} className="flex flex-col gap-2 animate-slide-up mb-2">
                <span className="text-[13px] text-slate-500 font-medium pl-1 mb-1">{group.date}</span>
                
                <div className="flex flex-col gap-2">
                  {group.calls.map((call) => {
                    const time = new Date(call.started_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase();
                    const initial = call.client ? call.client.charAt(0) : call.description.charAt(0);
                    return (
                      <div key={call._id} className="flex items-center justify-between py-2 rounded-lg transition-colors cursor-pointer group">
                        {/* Left: Icon and Details */}
                        <div className="flex items-center gap-4">
                          <div className="w-[42px] h-[42px] rounded-lg bg-[#8B5CF6] flex items-center justify-center text-slate-900 font-normal text-[17px] shrink-0">
                            {initial.toUpperCase()}
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[15px] font-medium text-slate-900">{call.description}</span>
                            {/* Avatars */}
                            <div className="flex -space-x-1.5">
                              {call.participants?.map((p, i) => (
                                <img
                                  key={i}
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`}
                                  alt={p.name}
                                  className="w-5 h-5 rounded-full border border-white bg-slate-100"
                                  title={p.name}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// feat: implement responsive dashboard grid - updated at Thu May 21 20:37:21 IST 2026
