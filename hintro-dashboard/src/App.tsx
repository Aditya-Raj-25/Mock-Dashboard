import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ROUTES } from '@/constants/routes';
import { Loader } from '@/components/states/Loader';

// Lazy load pages for better initial bundle sizes
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const FeedbackHistory = lazy(() => import('@/pages/FeedbackHistory'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Login = lazy(() => import('@/pages/Auth/Login'));

import { Hammer } from 'lucide-react';

// Placeholder for unbuilt pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 select-none animate-fade-in">
    <div className="w-16 h-16 bg-brand-50 dark:bg-brand-950/20 text-brand-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
      <Hammer className="w-8 h-8 animate-bounce" />
    </div>
    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{title} Page Under Construction</h2>
    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
      We are actively working on this feature to bring you a premium experience!
    </p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Authenticated Routes with Sidebar/Navbar */}
            <Route element={<DashboardLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path="/feedback-history" element={<FeedbackHistory />} />
              <Route path={ROUTES.ANALYTICS} element={<Placeholder title="Analytics" />} />
              <Route path={ROUTES.USERS} element={<Placeholder title="Users" />} />
              <Route path={ROUTES.SETTINGS} element={<Placeholder title="Settings" />} />
            </Route>
            
            {/* Public/Auth Routes (No Sidebar) */}
            <Route path={ROUTES.LOGIN} element={<Login />} />
            
            {/* Fallback 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
// chore: final UI polish and cleanup - updated at Thu May 21 20:37:21 IST 2026
