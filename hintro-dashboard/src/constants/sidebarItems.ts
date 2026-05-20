import { LayoutDashboard, Users, Settings, BarChart2 } from 'lucide-react';
import { ROUTES } from './routes';

export const SIDEBAR_ITEMS = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: 'Analytics',
    path: ROUTES.ANALYTICS,
    icon: BarChart2,
  },
  {
    title: 'Users',
    path: ROUTES.USERS,
    icon: Users,
  },
  {
    title: 'Settings',
    path: ROUTES.SETTINGS,
    icon: Settings,
  }
];
