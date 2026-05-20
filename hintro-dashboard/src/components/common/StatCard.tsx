import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number; // percentage (positive or negative)
  isCurrency?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  isCurrency = false 
}) => {
  const isPositive = trend && trend > 0;
  
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md dark:hover:shadow-black/20 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</h3>
        <div className="p-2 bg-brand-50 dark:bg-brand-950/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
          <Icon className="w-5 h-5 text-brand-500" />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          <AnimatedCounter value={value} isCurrency={isCurrency} />
        </div>
        
        {trend !== undefined && (
          <div className={clsx(
            "flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold",
            isPositive 
              ? "text-feedback-success bg-emerald-50 dark:bg-emerald-950/20" 
              : "text-feedback-error bg-red-50 dark:bg-red-950/20"
          )}>
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default StatCard;
