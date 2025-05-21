import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, closestCorners } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import KanbanTask from './KanbanTask';
import { Task } from '../tasks/TaskItem';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (tasks: Task[]) => void;
}

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskUpdate }) => {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', tasks: tasks.filter(t => !t.completed) },
    { id: 'inProgress', title: 'In Progress', tasks: [] },
    { id: 'completed', title: 'Completed', tasks: tasks.filter(t => t.completed) },
  ]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: any) => {
    const task = findTask(event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = findTask(active.id);
    const overColumn = columns.find(col => col.id === over.id);

    if (!activeTask || !overColumn) return;

    setColumns(prevColumns => {
      const oldColumn = prevColumns.find(col => 
        col.tasks.some(task => task.id === activeTask.id)
      );

      if (!oldColumn) return prevColumns;

      // Remove from old column
      const newOldColumn = {
        ...oldColumn,
        tasks: oldColumn.tasks.filter(task => task.id !== activeTask.id)
      };

      // Add to new column
      const newOverColumn = {
        ...overColumn,
        tasks: [...overColumn.tasks, activeTask]
      };

      return prevColumns.map(col => {
        if (col.id === oldColumn.id) return newOldColumn;
        if (col.id === overColumn.id) return newOverColumn;
        return col;
      });
    });

    setActiveTask(null);
  };

  const findTask = (id: string): Task | undefined => {
    return columns.reduce<Task | undefined>((found, column) => {
      if (found) return found;
      return column.tasks.find(task => task.id === id);
    }, undefined);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <KanbanTask task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;