import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '../tasks/TaskItem';
import SortableTask from './SortableTask';
import { cn } from '../../utils/cn';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "bg-hover/50 rounded-lg p-4",
        "border border-border/50"
      )}
    >
      <h3 className="font-medium mb-4 flex items-center justify-between">
        <span>{title}</span>
        <span className="text-sm text-text/60">{tasks.length}</span>
      </h3>

      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {tasks.map(task => (
            <SortableTask key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;