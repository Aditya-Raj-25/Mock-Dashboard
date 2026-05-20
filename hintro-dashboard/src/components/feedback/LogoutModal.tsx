import React from 'react';
import { LogOut } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Logout" maxWidth="sm">
      <div className="flex flex-col items-center justify-center py-4 select-none">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-feedback-error rounded-full flex items-center justify-center mb-4 shadow-xs">
          <LogOut className="w-8 h-8 ml-1 shrink-0" />
        </div>
        
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ready to leave?</h4>
        <p className="text-slate-500 dark:text-slate-400 text-center text-sm px-4">
          You are about to sign out of your account. You will need to log back in to access your dashboard.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-8">
        <Button
          variant="ghost"
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          className="w-full sm:w-auto px-6"
        >
          Yes, Sign out
        </Button>
      </div>
    </Modal>
  );
};
