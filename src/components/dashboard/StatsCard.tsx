import React from 'react';
import { Card } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  className,
}) => {
  return (
    <Card className={cn("h-full", className)}>
      <div className="p-5">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-text/60">{title}</p>
            <p className="text-2xl font-heading font-semibold mt-1">{value}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>

        {change && (
          <div className="mt-4 flex items-center">
            <div
              className={cn(
                "text-xs font-medium flex items-center gap-1 px-1.5 py-0.5 rounded-full",
                change.trend === 'up' && "text-success bg-success/10",
                change.trend === 'down' && "text-error bg-error/10",
                change.trend === 'neutral' && "text-text/60 bg-text/5",
              )}
            >
              {change.trend === 'up' && <ArrowUpRight size={12} />}
              {change.trend === 'down' && <ArrowDownRight size={12} />}
              {change.value}%
            </div>
            <span className="text-xs text-text/60 ml-2">vs previous week</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;