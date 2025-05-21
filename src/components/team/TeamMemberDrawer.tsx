import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  Trash2,
  Shield,
  Key
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: 'online' | 'away' | 'offline';
  avatar?: string;
  initials?: string;
  projects: number;
  tasks: number;
}

interface TeamMemberDrawerProps {
  member?: TeamMember;
  isOpen: boolean;
  onClose: () => void;
}

const TeamMemberDrawer: React.FC<TeamMemberDrawerProps> = ({ member, isOpen, onClose }) => {
  if (!member) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed inset-0 z-50 bg-background dark:bg-background-dark !m-0",
        !isOpen && "pointer-events-none"
      )}
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
                variant={member.role === 'Owner' ? 'primary' : member.role === 'Admin' ? 'secondary' : 'outline'}
                size="sm"
              >
                {member.role}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={<Trash2 size={14} />} className="text-error">
              Remove
            </Button>
            <Button size="sm">Save Changes</Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h2 className="text-2xl font-heading font-medium mb-6">Member Details</h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                    ) : (
                      <span className="text-2xl font-medium">{member.initials}</span>
                    )}
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-text/60 mt-1">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue={member.name}
                        className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Role</label>
                      <select 
                        defaultValue={member.role}
                        className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                      >
                        <option value="Owner">Owner</option>
                        <option value="Admin">Admin</option>
                        <option value="Member">Member</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={member.email}
                      className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={20} className="text-warning" />
                  <h3 className="text-lg font-heading font-medium">Permissions</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md border border-border dark:border-border-dark">
                    <div>
                      <p className="font-medium">Project Management</p>
                      <p className="text-sm text-text/60">Create and manage projects</p>
                    </div>
                    <input type="checkbox" checked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md border border-border dark:border-border-dark">
                    <div>
                      <p className="font-medium">Team Management</p>
                      <p className="text-sm text-text/60">Invite and manage team members</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md border border-border dark:border-border-dark">
                    <div>
                      <p className="font-medium">Billing Access</p>
                      <p className="text-sm text-text/60">View and manage billing</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </div>

              {/* Security */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Key size={20} className="text-error" />
                  <h3 className="text-lg font-heading font-medium">Security</h3>
                </div>

                <div className="space-y-4">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Reset Password
                  </Button>
                  
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Enable Two-Factor Authentication
                  </Button>
                </div>
              </div>

              {/* Activity */}
              <div>
                <h3 className="text-lg font-heading font-medium mb-4">Recent Activity</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-md border border-border dark:border-border-dark">
                    <div>
                      <p className="font-medium">Created new project</p>
                      <p className="text-sm text-text/60">Website Redesign</p>
                    </div>
                    <span className="text-sm text-text/60">2 days ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md border border-border dark:border-border-dark">
                    <div>
                      <p className="font-medium">Completed task</p>
                      <p className="text-sm text-text/60">Setup Analytics</p>
                    </div>
                    <span className="text-sm text-text/60">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberDrawer;