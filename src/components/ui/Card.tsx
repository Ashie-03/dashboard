import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  className, 
  children, 
  hover = false,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "bg-white border border-border rounded-lg shadow-soft overflow-hidden",
        hover && "hover:border-primary/30 transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn("p-4 border-b border-border", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn("p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn("p-4 border-t border-border", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter };