import React from 'react';

interface LoaderProps {
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ fullScreen = false }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-slate-50/75 dark:bg-slate-950/75 backdrop-blur-sm z-50 transition-all duration-300"
    : "flex items-center justify-center p-8 w-full";

  return (
    <div className={containerClass}>
      <div className="w-10 h-10 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div>
    </div>
  );
};
