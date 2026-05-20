import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isTextArea?: boolean;
  rows?: number;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
  className,
  label,
  error,
  helperText,
  isTextArea = false,
  rows = 3,
  id,
  type = 'text',
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const descriptionId = `${inputId}-desc`;
  const errorId = `${inputId}-error`;

  const inputClasses = clsx(
    "w-full px-3.5 py-2 text-sm rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all duration-200",
    {
      "border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:ring-brand-500/25": !error,
      "border-feedback-error focus:border-feedback-error focus:ring-feedback-error/25": error,
    },
    className
  );

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">
          {label}
        </label>
      )}
      
      {isTextArea ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={inputId}
          rows={rows}
          className={inputClasses}
          aria-describedby={error ? errorId : (helperText ? descriptionId : undefined)}
          aria-invalid={!!error}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={inputId}
          type={type}
          className={inputClasses}
          aria-describedby={error ? errorId : (helperText ? descriptionId : undefined)}
          aria-invalid={!!error}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error ? (
        <p id={errorId} className="text-xs font-medium text-feedback-error animate-fade-in">
          {error}
        </p>
      ) : helperText ? (
        <p id={descriptionId} className="text-xs text-slate-450">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
