import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium',
        'whitespace-nowrap transition-colors',
        
        // Variant styles
        variant === 'default' && 'bg-text/10 text-text/80',
        variant === 'primary' && 'bg-primary/10 text-primary',
        variant === 'secondary' && 'bg-secondary text-text/80',
        variant === 'success' && 'bg-success/10 text-success',
        variant === 'warning' && 'bg-warning/10 text-warning',
        variant === 'error' && 'bg-error/10 text-error',
        variant === 'outline' && 'border border-border text-text/70',
        
        // Size styles
        size === 'sm' && 'text-xs px-2 py-0.5',
        size === 'md' && 'text-xs px-2.5 py-1',
        
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;