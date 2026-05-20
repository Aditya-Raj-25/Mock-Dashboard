import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface FeedbackItem {
  id: string;
  content: string;
  rating: number;
  date: string;
}

export const FeedbackHistory: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('hintro_feedback') || '[]');
    setFeedbacks(data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const formatDateShort = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 ? 0 : day % 10) + (day > 10 && day < 14 ? -day % 10 : 0)] || 'th';
    const month = d.toLocaleDateString('en-US', { month: 'long' });
    const year = d.getFullYear();
    return `${day}${suffix} ${month} ${year}`;
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase();
  };

  const formatDateFull = (dateStr: string) => {
    return `${formatDateShort(dateStr)} . ${formatTime(dateStr)}`;
  };

  const truncate = (str: string, len: number) => {
    if (str.length <= len) return str;
    return '- ' + str.slice(0, len) + '...';
  };

  return (
    <div className="w-[1005px] max-w-full mx-auto mt-8 px-4 sm:px-0 animate-fade-in">
      <div className="mb-6">
        <p className="text-sm text-slate-500">Browse your previous feedback submissions</p>
      </div>

      {feedbacks.length === 0 ? (
        <div className="text-center py-12 text-slate-500 border border-slate-200 rounded-lg">
          No feedback submitted yet.
        </div>
      ) : (
        <>
          {/* ─── Desktop: Table View ─── */}
          <div className="hidden md:block">
            <table className="w-full border border-[#E2E2E8] rounded-lg overflow-hidden text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-500 font-medium text-xs">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Rating</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb) => (
                  <tr key={fb.id} className="border-t border-[#E2E2E8] hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-900 whitespace-nowrap">My First Call</td>
                    <td className="px-5 py-3 text-slate-700 whitespace-nowrap">{fb.rating}/5</td>
                    <td className="px-5 py-3 text-slate-500 max-w-[250px] truncate">{truncate(fb.content, 20)}</td>
                    <td className="px-5 py-3 text-slate-700 whitespace-nowrap">{formatDateShort(fb.date)}</td>
                    <td className="px-5 py-3 text-slate-700 whitespace-nowrap">{formatTime(fb.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ─── Mobile: Card View ─── */}
          <div className="md:hidden flex flex-col gap-4">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="bg-[#f4f5f7] border border-[#E2E2E8] rounded-xl p-5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-[15px] text-slate-900">Feedback Title</h3>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-[14px] h-[14px] ${star <= fb.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-300 text-slate-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[12px] text-slate-500 mb-3 line-clamp-1">
                  {fb.content}
                </p>
                <p className="text-[11px] font-medium text-blue-500">{formatDateFull(fb.date)}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackHistory;
