import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  MessageSquare, 
  Paperclip,
  CheckSquare,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { Task } from './TaskItem';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

interface TaskDrawerProps {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDrawer: React.FC<TaskDrawerProps> = ({ task, isOpen, onClose }) => {
  if (!task) return null;
  
  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.4 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed inset-0 z-40 bg-black !m-0",
          !isOpen && "pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? '0%' : '100%' }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed top-0 right-0 z-50 h-screen w-full md:w-[600px] bg-background dark:bg-background-dark shadow-2xl !m-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border dark:border-border-dark">
            <div className="flex items-center gap-3">
              <button 
                className="p-2 rounded-md hover:bg-hover dark:hover:bg-hover-dark text-text/70"
                onClick={onClose}
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <Badge
                  variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'secondary'}
                  size="sm"
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                More
                <ChevronDown size={14} className="ml-1" />
              </Button>
              <Button size="sm">Save Changes</Button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto p-6">
              <div className="flex items-start gap-3 mb-8">
                <div className="mt-1">
                  {task.completed ? (
                    <CheckSquare className="text-success" size={24} />
                  ) : (
                    <CheckSquare className="text-text/30" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-heading font-medium">{task.title}</h2>
                  <p className="text-sm text-text/70 mt-1">
                    Created on May 12, 2025 • Updated 2 days ago
                  </p>
                </div>
              </div>
              
              {/* Details Section */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {task.dueDate && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-text/60">Due Date</p>
                        <p className="text-base font-medium mt-0.5">{task.dueDate}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-text/60">Project</p>
                      <p className="text-base font-medium mt-0.5">{task.project?.name || 'None'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-text">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-text/60">Assignee</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {task.assignee ? (
                          <>
                            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                              {task.assignee.avatar ? (
                                <img src={task.assignee.avatar} alt={task.assignee.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs font-medium">{task.assignee.initials}</span>
                              )}
                            </div>
                            <p className="text-base font-medium">{task.assignee.name}</p>
                          </>
                        ) : (
                          <p className="text-base font-medium">Unassigned</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center text-info">
                      <Tag size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-text/60">Tags</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <Badge variant="outline" size="sm">
                          #feature
                        </Badge>
                        <Badge variant="outline" size="sm">
                          #frontend
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-base font-medium mb-3">Description</h3>
                <div className="p-4 rounded-md border border-border dark:border-border-dark bg-hover/30 dark:bg-hover-dark/30">
                  <p className="text-sm text-text/70">
                    This is a placeholder description for the task. Click to add a proper description for your task.
                  </p>
                </div>
              </div>
              
              {/* Subtasks */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium">Subtasks (0/3)</h3>
                  <button className="text-sm text-primary font-medium">
                    Add
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-hover dark:hover:bg-hover-dark">
                    <input type="checkbox" className="rounded-full" />
                    <span className="text-sm">Research design options</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-hover dark:hover:bg-hover-dark">
                    <input type="checkbox" className="rounded-full" />
                    <span className="text-sm">Create mockups</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-hover dark:hover:bg-hover-dark">
                    <input type="checkbox" className="rounded-full" />
                    <span className="text-sm">Get feedback from team</span>
                  </div>
                </div>
              </div>
              
              {/* Comments */}
              <div>
                <h3 className="text-base font-medium mb-3">Comments</h3>
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xs font-medium">JS</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Add a comment..."
                      className="w-full min-h-20 p-3 text-sm border border-border dark:border-border-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 dark:focus:ring-primary-dark/30 resize-none bg-transparent"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <button className="p-1.5 rounded-md hover:bg-hover dark:hover:bg-hover-dark text-text/60">
                          <Paperclip size={16} />
                        </button>
                      </div>
                      <Button size="sm">Comment</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-xs font-medium">AK</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Alex King</p>
                        <p className="text-xs text-text/60">2 days ago</p>
                      </div>
                      <p className="text-sm mt-1">Let's make sure we prioritize this task as it's blocking other work.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TaskDrawer;