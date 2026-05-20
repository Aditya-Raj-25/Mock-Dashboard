import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';



interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const setUser = useAppStore(state => state.setUser);
  if (!isOpen) return null;

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div 
        className="relative bg-white rounded-lg shadow-xl flex flex-col w-full max-w-[420px]"
        style={{ height: '229px', padding: '32px', gap: '10px' }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Leaving already?</h3>
        
        <div className="w-full h-px bg-[#E2E2E8] mb-4" />
        
        <p className="text-sm text-slate-900 leading-relaxed max-w-sm mb-auto">
          You can log back in anytime to continue your meetings with Hintro.
        </p>
        
        <div className="flex items-center gap-3 mt-auto">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
