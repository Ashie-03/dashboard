import React from 'react';
import { cn } from '../../utils/cn';

export interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  action: string;
  target: string;
  time: string;
  type: 'task' | 'comment' | 'project' | 'client';
}

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const { user, action, target, time, type } = activity;

  const getActionColor = () => {
    switch (type) {
      case 'task':
        return 'bg-success/10';
      case 'comment':
        return 'bg-info/10';
      case 'project':
        return 'bg-primary/10';
      case 'client':
        return 'bg-secondary';
      default:
        return 'bg-text/10';
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-hover rounded-md -mx-3 animate-fade-in transition-colors">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
        ) : (
          <span className="text-xs font-medium">{user.initials}</span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{user.name}</span>{' '}
          <span className="text-text/70">{action}</span>{' '}
          <span className={cn(
            "inline-block font-medium px-1 py-0.5 rounded text-xs whitespace-nowrap",
            getActionColor()
          )}>
            {target}
          </span>
        </p>
        <p className="text-xs text-text/60 mt-1">{time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;