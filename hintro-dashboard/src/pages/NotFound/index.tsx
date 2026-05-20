import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center p-6 select-none transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none animate-slide-in-right">
        <div className="w-16 h-16 bg-brand-50 dark:bg-brand-950/20 text-brand-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">404</h1>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Page not found</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The page you are looking for doesn't exist or has been moved to another path.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="flex-1"
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            leftIcon={<Home className="w-4 h-4" />}
            className="flex-1"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
