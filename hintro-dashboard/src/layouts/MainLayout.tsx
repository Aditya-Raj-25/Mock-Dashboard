import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { ToastContainer } from '@/components/common/ToastContainer';

export const MainLayout: React.FC = () => {
  const { theme } = useAppStore();

  // Apply dark mode class to html element for Tailwind selector support
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Outlet />
      <ToastContainer />
    </div>
  );
};
