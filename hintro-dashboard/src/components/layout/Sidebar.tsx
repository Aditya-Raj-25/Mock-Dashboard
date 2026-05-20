import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PhoneCall,
  BookOpen,
  MessageSquare,
  Sliders,
  History,
  Gift,
  AlertCircle,
  X,
  Download,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { ROUTES } from '@/constants/routes';
import { FeedbackModal } from '@/components/common/FeedbackModal';
import clsx from 'clsx';

const topNavItems = [
  { to: ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { to: ROUTES.ANALYTICS, icon: PhoneCall, label: 'Call Insights' },
  { to: ROUTES.USERS, icon: BookOpen, label: 'Knowledge Base', hasInfo: true },
  { to: '/prompts', icon: MessageSquare, label: 'Prompts', hasInfo: true },
  { to: '/boxy-controls', icon: Sliders, label: 'Boxy Controls', hasInfo: true },
];

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { } = useAppStore();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <>
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen?.(false)}
        />
      )}
      <aside
        style={{ width: '262px', minWidth: '262px' }}
        className={clsx(
          "flex flex-col h-screen bg-white border-r border-[#E2E2E8] shrink-0",
          "fixed md:relative z-50 transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-[64px] flex items-center px-6 border-b border-[#E2E2E8]">
          <span className="text-xl font-bold text-slate-800 tracking-tight select-none hidden md:block">Hintro</span>
          <button 
            className="md:hidden p-1 -ml-2 text-slate-700 hover:bg-slate-100 rounded-md"
            onClick={() => setIsMobileMenuOpen?.(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Top Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {topNavItems.map(({ to, icon: Icon, label, hasInfo }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.DASHBOARD}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                )
              }
              onClick={(e) => {
                if (hasInfo) {
                  e.preventDefault();
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={clsx(
                      'w-[18px] h-[18px] shrink-0',
                      isActive && !hasInfo ? 'text-indigo-500' : 'text-slate-400 group-hover:text-slate-600'
                    )}
                  />
                  <span className="flex-1 truncate">{label}</span>
                  {hasInfo && (
                    <AlertCircle className="w-[14px] h-[14px] text-slate-800 shrink-0" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Nav */}
        <div className="px-3 py-4 space-y-1 mt-auto bg-[#F1F1F1] border-t border-[#E2E2E8]">
          <NavLink
            to="/feedback-history"
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
              )
            }
          >
            {({ isActive }) => (
              <>
                <History className={clsx("w-[18px] h-[18px] shrink-0", isActive ? 'text-blue-500' : 'text-slate-400')} />
                <span className="truncate">Feedback History</span>
              </>
            )}
          </NavLink>

          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-slate-500 hover:bg-white/60 hover:text-slate-700 text-left"
          >
            <Download className="w-[18px] h-[18px] shrink-0 text-slate-400" />
            <span className="truncate">Download Desktop App</span>
          </button>

          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-slate-500 hover:bg-white/60 hover:text-slate-700 text-left"
          >
            <Gift className="w-[18px] h-[18px] shrink-0 text-slate-400" />
            <span className="truncate">Feedback</span>
          </button>

          {/* Usage & Upgrade Box */}
          <div className="mt-3 p-3 bg-[#E4E4E4] rounded-lg flex flex-col gap-2">
            <p className="text-[12px] text-slate-600 font-medium text-center">
              <span className="text-slate-900 font-bold">0 of 1000</span> hours used
            </p>
            <button className="w-full py-2 px-4 rounded-md bg-[#828282] hover:bg-slate-600 text-white text-sm font-medium transition-colors">
              Upgrade
            </button>
          </div>
          
          <div className="pt-3 text-center">
            <p className="text-[10px] font-medium text-slate-500">
              © 2025 Hintro. Made in India 🇮🇳
            </p>
          </div>
        </div>
      </aside>

      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </>
  );
};

// feat: create sidebar component - updated at Thu May 21 20:37:20 IST 2026
