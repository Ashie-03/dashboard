import React from 'react';
import { Calendar, Clock, GripVertical } from 'lucide-react';
import { Task } from '../tasks/TaskItem';
import Badge from '../ui/Badge';
import { cn } from '../../utils/cn';

interface KanbanTaskProps {
  task: Task;
}

const KanbanTask: React.FC<KanbanTaskProps> = ({ task }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg p-3 shadow-sm border border-border",
        "hover:border-primary/30 transition-colors cursor-grab active:cursor-grabbing"
      )}
    >
      <div className="flex items-start gap-2">
        <div className="mt-1 text-text/40">
          <GripVertical size={16} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-sm">{task.title}</h4>
          
          <div className="mt-2 flex items-center gap-3 text-xs text-text/60">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{task.dueDate}</span>
              </div>
            )}
            
            {task.project && (
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{task.project.name}</span>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <Badge
              variant={
                task.priority === 'high' ? 'error' :
                task.priority === 'medium' ? 'warning' : 'secondary'
              }
              size="sm"
            >
              {task.priority}
            </Badge>

            {task.assignee && (
              <div 
                className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center"
                title={task.assignee.name}
              >
                {task.assignee.avatar ? (
                  <img src={task.assignee.avatar} alt={task.assignee.name} className="w-full h-full rounded-full" />
                ) : (
                  <span className="text-[10px] font-medium">{task.assignee.initials}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanTask;