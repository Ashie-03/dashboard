import React, { useState } from 'react';
import { CheckCircle, Clock, MoreHorizontal, AlertCircle, Circle } from 'lucide-react';
import Badge from '../ui/Badge';
import { cn } from '../../utils/cn';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  project?: {
    id: string;
    name: string;
  };
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
    initials?: string;
  };
}

interface TaskItemProps {
  task: Task;
  onComplete: (id: string, completed: boolean) => void;
  onClick: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComplete(task.id, !task.completed);
  };
  
  const getPriorityBadge = () => {
    switch (task.priority) {
      case 'high':
        return <Badge variant="error" size="sm">High</Badge>;
      case 'medium':
        return <Badge variant="warning" size="sm">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" size="sm">Low</Badge>;
      default:
        return null;
    }
  };
  
  const getCheckboxIcon = () => {
    if (task.completed) {
      return <CheckCircle className="text-success" size={18} />;
    }
    
    if (isHovered) {
      return <Circle className="text-primary" size={18} />;
    }
    
    switch (task.priority) {
      case 'high':
        return <AlertCircle className="text-error/70" size={18} />;
      case 'medium':
        return <Clock className="text-warning/70" size={18} />;
      default:
        return <Circle className="text-border" size={18} />;
    }
  };
  
  return (
    <div 
      className={cn(
        "group p-3 rounded-md hover:bg-hover transition-colors flex items-center gap-3 cursor-pointer animate-fade-in",
        task.completed && "opacity-60"
      )}
      onClick={() => onClick(task.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        className="flex-shrink-0"
        onClick={handleCheckboxClick}
      >
        {getCheckboxIcon()}
      </button>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <p className={cn(
            "text-sm font-medium",
            task.completed && "line-through text-text/50"
          )}>
            {task.title}
          </p>
          
          <div className="hidden md:block mt-0.5">
            {task.project && (
              <Badge variant="outline" size="sm">
                {task.project.name}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-1">
          {task.dueDate && (
            <div className="flex items-center text-xs text-text/60">
              <Clock size={12} className="mr-1" />
              {task.dueDate}
            </div>
          )}
          
          <div className="md:hidden">
            {getPriorityBadge()}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="hidden md:block">
          {getPriorityBadge()}
        </div>
        
        {task.assignee && (
          <div 
            className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center overflow-hidden"
            title={task.assignee.name}
          >
            {task.assignee.avatar ? (
              <img src={task.assignee.avatar} alt={task.assignee.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[10px] font-medium">{task.assignee.initials}</span>
            )}
          </div>
        )}
        
        <button className="p-1 rounded-md hover:bg-border invisible group-hover:visible">
          <MoreHorizontal size={16} className="text-text/60" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;