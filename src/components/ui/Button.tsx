import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  fullWidth = false,
  icon,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
        'disabled:opacity-50 disabled:pointer-events-none',
        
        // Variant styles
        variant === 'primary' && 'bg-primary text-white hover:bg-primary/90',
        variant === 'secondary' && 'bg-secondary text-text hover:bg-secondary/90',
        variant === 'outline' && 'border border-border hover:bg-hover',
        variant === 'ghost' && 'hover:bg-hover',
        variant === 'link' && 'underline-offset-4 hover:underline text-primary',
        
        // Size styles
        size === 'sm' && 'text-xs px-3 py-1',
        size === 'md' && 'text-sm px-4 py-2',
        size === 'lg' && 'text-base px-5 py-2.5',
        
        // Width
        fullWidth && 'w-full',
        
        className
      )}
      {...props}
    >
      {icon && <span className={cn('mr-2')}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;