import React, { useState } from 'react';
import { MoreHorizontal, Calendar, CheckSquare, ChevronDown, Users, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'completed' | 'on-hold' | 'planning';
  dueDate?: string;
  tasks: { total: number; completed: number };
  members: { id: string; name: string; avatar?: string; initials?: string }[];
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  onClick?: () => void;
  isExpanded?: boolean;
  onToggle?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  className, 
  onClick,
  isExpanded = false,
  onToggle
}) => {
  const getStatusVariant = () => {
    switch (project.status) {
      case 'active':
        return 'primary';
      case 'completed':
        return 'success';
      case 'on-hold':
        return 'warning';
      case 'planning':
        return 'secondary';
      default:
        return 'default';
    }
  };
  
  return (
    <Card 
      className={cn(
        "hover:border-primary/30 transition-all duration-200",
        className
      )}
    >
      <CardContent className="p-0">
        <div 
          className="p-4 cursor-pointer"
          onClick={() => onToggle?.(project.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-heading font-medium text-base truncate">{project.name}</h3>
              <p className="text-sm text-text/70 mt-1 line-clamp-2">{project.description}</p>
            </div>
            <motion.button 
              className="p-1 rounded-md hover:bg-hover"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-text/60" />
            </motion.button>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-text/60">Progress</span>
              <span className="text-xs font-medium">{project.progress}%</span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border"
            >
              <div className="p-4 space-y-4 bg-hover/30">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-text/60">Due Date</p>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-text/60" />
                      <p className="text-sm font-medium">{project.dueDate}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-text/60">Tasks</p>
                    <div className="flex items-center gap-1.5">
                      <CheckSquare size={14} className="text-text/60" />
                      <p className="text-sm font-medium">
                        {project.tasks.completed}/{project.tasks.total} completed
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-text/60 mb-2">Team Members</p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member) => (
                        <div 
                          key={member.id} 
                          className="w-7 h-7 rounded-full border-2 border-white bg-secondary flex items-center justify-center overflow-hidden"
                          title={member.name}
                        >
                          {member.avatar ? (
                            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] font-medium">{member.initials}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {project.members.length > 3 && (
                      <span className="text-xs text-text/60">
                        +{project.members.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={onClick}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-md bg-primary/5 hover:bg-primary/10 text-primary text-sm font-medium transition-colors"
                >
                  View Project Details
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant() as any} size="sm">
              {project.status.replace('-', ' ')}
            </Badge>
            
            {project.dueDate && (
              <div className="flex items-center text-xs text-text/60">
                <Calendar size={12} className="mr-1" />
                {project.dueDate}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center text-xs text-text/60">
              <CheckSquare size={12} className="mr-1" />
              {project.tasks.completed}/{project.tasks.total}
            </div>
            
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((member) => (
                <div 
                  key={member.id} 
                  className="w-6 h-6 rounded-full border-2 border-white bg-secondary flex items-center justify-center overflow-hidden"
                  title={member.name}
                >
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-medium">{member.initials}</span>
                  )}
                </div>
              ))}
              {project.members.length > 3 && (
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white bg-border flex items-center justify-center"
                >
                  <span className="text-[10px] font-medium">+{project.members.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;