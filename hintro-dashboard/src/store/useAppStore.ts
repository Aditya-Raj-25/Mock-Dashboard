import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Viewer',
    avatarUrl: 'https://i.pravatar.cc/150?u=john'
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Admin',
    avatarUrl: 'https://i.pravatar.cc/150?u=jane'
  }
];

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Default to u2 (populated user) for a better first impression
      user: MOCK_USERS[1],
      theme: 'light',
      sidebarOpen: true,

      setUser: (user) => set({ user }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen })
    }),
    {
      name: 'hintro-dashboard-storage',
      partialize: (state) => ({ theme: state.theme, user: state.user }),
    }
  )
);
