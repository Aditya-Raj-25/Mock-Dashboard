import React, { useState } from 'react';
import { Star, ArrowLeft } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem('hintro_feedback') || '[]');
    existing.push({
      id: Date.now().toString(),
      content: feedback,
      rating,
      date: new Date().toISOString()
    });
    localStorage.setItem('hintro_feedback', JSON.stringify(existing));

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFeedback('');
      setRating(0);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative bg-white rounded-lg shadow-xl flex flex-col w-[540px] max-w-full p-8 animate-fade-in">
        <div className="flex flex-col mb-6">
          <h3 className="text-xl font-bold text-slate-900">Give Feedback</h3>
          <p className="text-sm text-slate-400 mt-1">
            Describe your experience using Hintro...
          </p>
        </div>
        
        {submitted ? (
          <div className="py-8 text-center animate-fade-in">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <p className="text-slate-900 font-medium">Thank you for your feedback!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Star Rating */}
            <div className="flex justify-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-9 h-9 cursor-pointer transition-colors ${
                    star <= rating 
                      ? 'fill-amber-400 text-amber-400' 
                      : 'fill-slate-200 text-slate-200 hover:fill-slate-300 hover:text-slate-300'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What frustrated you or felt confusing?"
              className="w-full h-24 p-3 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
            />
            
            <div className="flex justify-between items-center mt-2 border-t border-slate-100 pt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button 
                type="submit"
                disabled={!feedback.trim() && rating === 0}
                className="px-6 py-2 bg-slate-500 text-white rounded-md text-sm font-medium hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
// feat: build feedback modal - updated at Thu May 21 20:37:21 IST 2026
