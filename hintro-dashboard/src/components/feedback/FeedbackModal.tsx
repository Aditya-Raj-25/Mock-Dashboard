import { useState, useEffect } from 'react';
import { MessageSquare, Star, Clock, Send } from 'lucide-react';
import clsx from 'clsx';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useToastStore } from '@/store/useToastStore';
import { storage } from '@/utils/storage';

interface FeedbackItem {
  id: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
}

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useToastStore();
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [history, setHistory] = useState<FeedbackItem[]>([]);

  // Load history from localStorage
  useEffect(() => {
    if (isOpen) {
      const stored = storage.get<FeedbackItem[]>('feedback_history', []);
      setHistory(stored);
    }
  }, [isOpen]);

  const validateEmail = (val: string) => {
    if (!val) {
      return 'Email is required';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      addToast('Please fix the errors in the form.', 'warning');
      return;
    }
    
    if (rating === 0) {
      addToast('Please select a rating.', 'warning');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newItem: FeedbackItem = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        rating,
        comment,
        date: new Date().toISOString(),
      };
      
      const newHistory = [newItem, ...history];
      storage.set('feedback_history', newHistory);
      setHistory(newHistory);
      
      addToast('Thank you! Your feedback has been submitted.', 'success');
      
      // Reset form
      setIsSubmitting(false);
      setEmail('');
      setRating(0);
      setComment('');
      setEmailError('');
      
      // Switch to history tab to show user their submission
      setActiveTab('history');
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Feedback Portal">
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('form')}
          className={clsx(
            "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors duration-200",
            activeTab === 'form'
              ? "border-brand-500 text-brand-600 dark:text-brand-450"
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350"
          )}
        >
          <Send className="w-4 h-4" />
          Submit Feedback
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={clsx(
            "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors duration-200",
            activeTab === 'history'
              ? "border-brand-500 text-brand-600 dark:text-brand-450"
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350"
          )}
        >
          <Clock className="w-4 h-4" />
          History ({history.length})
        </button>
      </div>

      {activeTab === 'form' ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/40 text-brand-500 rounded-full flex items-center justify-center mb-2">
              <MessageSquare className="w-6 h-6" />
            </div>
            <p className="text-center text-slate-600 dark:text-slate-350 text-sm">
              How would you rate your experience with Hintro Dashboard?
            </p>
            
            <div className="flex items-center gap-2.5 pt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110 p-1"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star className={clsx(
                    "w-8 h-8 transition-colors",
                    (hoveredRating || rating) >= star 
                      ? "fill-feedback-warning text-feedback-warning" 
                      : "text-slate-300 dark:text-slate-700"
                  )} />
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(validateEmail(e.target.value));
            }}
            placeholder="you@company.com"
            error={emailError}
            required
          />

          <Input
            isTextArea
            label="Additional Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what you love or what could be improved..."
          />

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={rating === 0 || !email}
              className="px-6"
            >
              Submit Feedback
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Clock className="w-10 h-10 mb-2 opacity-50" />
              <p className="text-sm font-medium">No submission history yet.</p>
              <p className="text-xs mt-1 text-slate-500">Your feedback drafts will show up here.</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-850 dark:text-slate-200 truncate">{item.email}</p>
                    <p className="text-[10px] text-slate-450 mt-0.5">
                      {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      }).format(new Date(item.date))}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0 bg-yellow-50 dark:bg-yellow-950/20 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-feedback-warning text-feedback-warning" />
                    <span className="text-xs font-bold text-feedback-warning">{item.rating}</span>
                  </div>
                </div>
                {item.comment && (
                  <p className="text-xs text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-950/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-900/50 italic">
                    "{item.comment}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </Modal>
  );
};
