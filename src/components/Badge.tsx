
import { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'tech' | 'creative' | 'business' | 'marketing' | 'leadership' | 'finance';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const Badge = ({ variant = 'primary', children, className = '' }: BadgeProps) => {
  const baseClasses = 'badge';
  
  const variantClasses: Record<BadgeVariant, string> = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    tech: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    creative: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    business: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    marketing: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    leadership: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
    finance: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
