import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PlayCircle, ChevronDown, LogOut, Menu } from 'lucide-react';
import { useAppStore, MOCK_USERS } from '@/store/useAppStore';
import { LogoutModal } from '@/components/common/LogoutModal';

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, setUser } = useAppStore();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const getPageTitle = () => {
    if (location.pathname === '/feedback-history') return 'Feedback History';
    return 'Dashboard';
  };

  return (
    <>
      <header className="h-[64px] bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-between px-4 md:px-6 shrink-0 z-10 w-full relative">
        <div className="flex items-center gap-3 flex-1 md:flex-none">
          <button 
            className="md:hidden p-1 -ml-1 text-slate-700 hover:bg-slate-100 rounded-md"
            onClick={onMenuClick}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="hidden md:block text-[20px] font-semibold text-slate-900 tracking-tight">{getPageTitle()}</h1>
        </div>

        {/* Centered Title for Mobile */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2">
          <h1 className="text-[18px] font-semibold text-slate-900 tracking-tight">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center justify-end flex-1 md:flex-none gap-4">
          {/* User Switcher */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100 rounded-md px-2 py-1">
            {MOCK_USERS.map((u) => (
              <button
                key={u.id}
                onClick={() => setUser(u)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  user?.id === u.id
                    ? 'bg-black text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white'
                }`}
              >
                {u.id.toUpperCase()}
              </button>
            ))}
          </div>

          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <PlayCircle className="w-4 h-4" />
            Watch Tutorial
          </button>
          
          {user && (
            <div className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-md transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <ChevronDown className="w-4 h-4 text-slate-500 hidden md:block" />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-[130px] bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.15)] rounded-[4px] flex items-center gap-[10px] cursor-pointer hover:bg-slate-50 transition-colors"
                  style={{ padding: '12px 20px 12px 12px' }}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                >
                  <LogOut className="w-[18px] h-[18px] text-slate-600 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">Log out</span>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
      />
    </>
  );
};
