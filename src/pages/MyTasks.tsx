import React, { useState } from 'react';
import { TagsIcon as TabsIcon, Calendar, Filter, Plus, Kanban as LayoutKanban, List } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import TaskItem, { Task } from '../components/tasks/TaskItem';
import TaskDrawer from '../components/tasks/TaskDrawer';
import KanbanBoard from '../components/kanban/KanbanBoard';
import { cn } from '../utils/cn';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design homepage mockups',
    completed: false,
    dueDate: 'Today, 5:00 PM',
    priority: 'high',
    project: { id: '1', name: 'Website Redesign' },
    assignee: { id: '1', name: 'Jane Smith', initials: 'JS' },
  },
  {
    id: '2',
    title: 'Review client feedback',
    completed: false,
    dueDate: 'Tomorrow, 10:00 AM',
    priority: 'medium',
    project: { id: '1', name: 'Website Redesign' },
    assignee: { id: '1', name: 'Jane Smith', initials: 'JS' },
  },
  {
    id: '3',
    title: 'Weekly team meeting',
    completed: false,
    dueDate: 'May 15, 2:00 PM',
    priority: 'medium',
    assignee: { id: '1', name: 'Jane Smith', initials: 'JS' },
  },
  {
    id: '4',
    title: 'Update project timeline',
    completed: false,
    dueDate: 'May 16',
    priority: 'low',
    project: { id: '2', name: 'Mobile App' },
    assignee: { id: '1', name: 'Jane Smith', initials: 'JS' },
  },
  {
    id: '5',
    title: 'Create wireframes for dashboard',
    completed: true,
    dueDate: 'May 10',
    priority: 'high',
    project: { id: '1', name: 'Website Redesign' },
    assignee: { id: '1', name: 'Jane Smith', initials: 'JS' },
  },
  {
    id: '6',
    title: 'Prepare client presentation',
    completed: true,
    priority: 'medium',
    project: { id: '1', name: 'Website Redesign' },
    assignee: { id: '1', name: 'Jane Smith', initials: 'JS' },
  },
];

const MyTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  
  const handleTaskComplete = (id: string, completed: boolean) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed } : task
    ));
  };
  
  const handleTaskClick = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    setSelectedTask(task);
    setDrawerOpen(true);
  };
  
  const handleTasksUpdate = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };
  
  const getTodayTasks = () => tasks.filter(task => 
    !task.completed && task.dueDate?.includes('Today')
  );
  
  const getUpcomingTasks = () => tasks.filter(task => 
    !task.completed && (!task.dueDate?.includes('Today') || !task.dueDate)
  );
  
  const getCompletedTasks = () => tasks.filter(task => task.completed);
  
  return (
    <div className="space-y-6 pb-16 lg:pb-0 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-hover rounded-md">
            <button
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === 'list' ? "bg-white shadow-sm text-primary" : "text-text/70 hover:text-text"
              )}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
            <button
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === 'kanban' ? "bg-white shadow-sm text-primary" : "text-text/70 hover:text-text"
              )}
              onClick={() => setViewMode('kanban')}
            >
              <LayoutKanban size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Filter size={14} />}>
            Filter
          </Button>
          <Button size="sm" icon={<Plus size={14} />}>New Task</Button>
        </div>
      </div>
      
      {viewMode === 'list' ? (
        <div className="space-y-6">
          {/* Today's Tasks */}
          <Card>
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-medium">Today • {getTodayTasks().length}</h2>
                <span className="text-xs text-text/60">May 12, 2025</span>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {getTodayTasks().length > 0 ? (
                <div className="divide-y divide-border">
                  {getTodayTasks().map((task) => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      onComplete={handleTaskComplete}
                      onClick={handleTaskClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-sm text-text/60">No tasks due today</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader className="py-3">
              <h2 className="font-heading font-medium">Upcoming • {getUpcomingTasks().length}</h2>
            </CardHeader>
            
            <CardContent className="p-0">
              {getUpcomingTasks().length > 0 ? (
                <div className="divide-y divide-border">
                  {getUpcomingTasks().map((task) => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      onComplete={handleTaskComplete}
                      onClick={handleTaskClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-sm text-text/60">No upcoming tasks</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Completed Tasks */}
          <Card>
            <CardHeader className="py-3">
              <h2 className="font-heading font-medium">Completed • {getCompletedTasks().length}</h2>
            </CardHeader>
            
            <CardContent className="p-0">
              {getCompletedTasks().length > 0 ? (
                <div className="divide-y divide-border">
                  {getCompletedTasks().map((task) => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      onComplete={handleTaskComplete}
                      onClick={handleTaskClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-sm text-text/60">No completed tasks</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <KanbanBoard tasks={tasks} onTaskUpdate={handleTasksUpdate} />
      )}
      
      <TaskDrawer 
        task={selectedTask} 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
      />
    </div>
  );
};

export default MyTasks;