import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  ChevronDown,
  Users,
  Calendar,
  CheckSquare,
  Trash2
} from 'lucide-react';
import { Project } from './ProjectCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

interface ProjectDrawerProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

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
                  variant={
                    project.status === 'active' ? 'primary' :
                    project.status === 'completed' ? 'success' :
                    project.status === 'on-hold' ? 'warning' : 'secondary'
                  }
                  size="sm"
                >
                  {project.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" icon={<Trash2 size={14} />} className="text-error">
                Delete
              </Button>
              <Button size="sm">Save Changes</Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto p-6">
              <div className="space-y-8">
                {/* Basic Info */}
                <div>
                  <h2 className="text-2xl font-heading font-medium mb-6">Project Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Project Name</label>
                      <input
                        type="text"
                        defaultValue={project.name}
                        className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        defaultValue={project.description}
                        rows={4}
                        className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select 
                          defaultValue={project.status}
                          className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                        >
                          <option value="planning">Planning</option>
                          <option value="active">Active</option>
                          <option value="on-hold">On Hold</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Due Date</label>
                        <input
                          type="date"
                          defaultValue="2025-05-25"
                          className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-heading font-medium">Team Members</h3>
                    <Button variant="outline" size="sm" icon={<Users size={14} />}>
                      Add Member
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {project.members.map(member => (
                      <div 
                        key={member.id}
                        className="flex items-center justify-between p-3 rounded-md border border-border dark:border-border-dark"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                            ) : (
                              <span className="text-xs font-medium">{member.initials}</span>
                            )}
                          </div>
                          <span className="font-medium">{member.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-error">
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-heading font-medium">Tasks</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text/60">
                        {project.tasks.completed} of {project.tasks.total} completed
                      </span>
                      <Button variant="outline" size="sm" icon={<CheckSquare size={14} />}>
                        Add Task
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-md border border-border dark:border-border-dark">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Design homepage mockups</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-md border border-border dark:border-border-dark">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Implement user authentication</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-md border border-border dark:border-border-dark">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked className="rounded" />
                        <span className="line-through text-text/50">Setup project repository</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-heading font-medium mb-4">Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <input
                          type="date"
                          defaultValue="2025-05-01"
                          className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">End Date</label>
                        <input
                          type="date"
                          defaultValue="2025-05-25"
                          className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Progress</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue={project.progress}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-text/60 mt-1">
                        <span>0%</span>
                        <span>{project.progress}%</span>
                        <span>100%</span>
                      </div>
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

export default ProjectDrawer;