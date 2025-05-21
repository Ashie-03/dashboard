import React, { useState } from 'react';
import { Search, Plus, ExternalLink, ChevronDown, FolderKanban } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import TeamMemberDrawer from '../components/team/TeamMemberDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

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

interface Project {
  id: string;
  name: string;
  progress: number;
  dueDate: string;
  members: number;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projects: Project[];
  lead: TeamMember;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Product Team',
    description: 'Responsible for product development and design',
    lead: {
      id: '1',
      name: 'Jane Smith',
      role: 'Product Lead',
      email: 'jane@example.com',
      status: 'online',
      initials: 'JS',
      projects: 8,
      tasks: 12,
    },
    members: [
      {
        id: '2',
        name: 'Alex King',
        role: 'Designer',
        email: 'alex@example.com',
        status: 'online',
        initials: 'AK',
        projects: 5,
        tasks: 7,
      },
      {
        id: '3',
        name: 'Taylor Wilson',
        role: 'Developer',
        email: 'taylor@example.com',
        status: 'away',
        initials: 'TW',
        projects: 4,
        tasks: 9,
      },
    ],
    projects: [
      {
        id: '1',
        name: 'Website Redesign',
        progress: 75,
        dueDate: 'May 25',
        members: 3,
      },
      {
        id: '2',
        name: 'Mobile App',
        progress: 40,
        dueDate: 'Jun 15',
        members: 2,
      },
    ],
  },
  {
    id: '2',
    name: 'Marketing Team',
    description: 'Handles marketing strategy and campaigns',
    lead: {
      id: '4',
      name: 'Morgan Chen',
      role: 'Marketing Lead',
      email: 'morgan@example.com',
      status: 'online',
      initials: 'MC',
      projects: 6,
      tasks: 8,
    },
    members: [
      {
        id: '5',
        name: 'Riley Johnson',
        role: 'Content Writer',
        email: 'riley@example.com',
        status: 'offline',
        initials: 'RJ',
        projects: 2,
        tasks: 5,
      },
    ],
    projects: [
      {
        id: '3',
        name: 'Q2 Campaign',
        progress: 60,
        dueDate: 'Jun 30',
        members: 2,
      },
    ],
  },
];

const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | undefined>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedTeams, setExpandedTeams] = useState<string[]>([]);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setDrawerOpen(true);
  };

  const toggleTeam = (teamId: string) => {
    setExpandedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge variant="success" size="sm">Online</Badge>;
      case 'away':
        return <Badge variant="warning" size="sm">Away</Badge>;
      case 'offline':
        return <Badge variant="outline" size="sm">Offline</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-16 lg:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="font-heading font-semibold text-xl">Teams</h2>
        
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search teams or members..."
              className="w-64 pl-9 pr-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-text/40" />
          </div>
          
          <Button icon={<Plus size={16} />}>Create Team</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockTeams.map((team) => (
          <Card key={team.id}>
            <CardContent className="p-0">
              <div className="p-4 cursor-pointer" onClick={() => toggleTeam(team.id)}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-medium text-lg">{team.name}</h3>
                      <Badge variant="outline" size="sm">
                        {team.members.length + 1} members
                      </Badge>
                    </div>
                    <p className="text-sm text-text/60 mt-1">{team.description}</p>
                  </div>
                  <motion.button
                    animate={{ rotate: expandedTeams.includes(team.id) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-2 rounded-md hover:bg-hover"
                  >
                    <ChevronDown size={20} className="text-text/60" />
                  </motion.button>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-secondary flex items-center justify-center relative">
                      {team.lead.avatar ? (
                        <img src={team.lead.avatar} alt={team.lead.name} className="w-full h-full rounded-full" />
                      ) : (
                        <span className="text-xs font-medium">{team.lead.initials}</span>
                      )}
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                    </div>
                    {team.members.slice(0, 2).map((member) => (
                      <div 
                        key={member.id}
                        className="w-8 h-8 rounded-full border-2 border-white bg-secondary flex items-center justify-center"
                      >
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                        ) : (
                          <span className="text-xs font-medium">{member.initials}</span>
                        )}
                      </div>
                    ))}
                    {team.members.length > 2 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-hover flex items-center justify-center">
                        <span className="text-xs font-medium">+{team.members.length - 2}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-text/60">
                    Led by <span className="font-medium">{team.lead.name}</span>
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {expandedTeams.includes(team.id) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-border"
                  >
                    <div className="divide-y divide-border">
                      {/* Team Projects */}
                      <div className="p-4 bg-hover/30">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Team Projects</h4>
                          <Button variant="outline" size="sm" icon={<FolderKanban size={14} />}>
                            Add Project
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {team.projects.map(project => (
                            <div 
                              key={project.id}
                              className="p-3 rounded-lg border border-border bg-white"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h5 className="font-medium">{project.name}</h5>
                                  <p className="text-sm text-text/60">Due {project.dueDate}</p>
                                </div>
                                <Badge variant="outline" size="sm">
                                  {project.members} members
                                </Badge>
                              </div>
                              <div className="mt-3">
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
                          ))}
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="divide-y divide-border">
                        <div className="p-4 bg-hover/30 flex items-center justify-between">
                          <h4 className="font-medium">Team Members</h4>
                          <Button variant="outline" size="sm">Manage Members</Button>
                        </div>
                        
                        {/* Team Lead */}
                        <div 
                          className="flex items-center justify-between p-4 hover:bg-hover cursor-pointer"
                          onClick={() => handleMemberClick(team.lead)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                {team.lead.avatar ? (
                                  <img src={team.lead.avatar} alt={team.lead.name} className="w-full h-full rounded-full" />
                                ) : (
                                  <span className="text-sm font-medium">{team.lead.initials}</span>
                                )}
                              </div>
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{team.lead.name}</p>
                                <Badge variant="primary" size="sm">Lead</Badge>
                              </div>
                              <p className="text-sm text-text/60">{team.lead.email}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80"
                          >
                            <ExternalLink size={16} />
                          </Button>
                        </div>

                        {/* Team Members */}
                        {team.members.map((member) => (
                          <div 
                            key={member.id}
                            className="flex items-center justify-between p-4 hover:bg-hover cursor-pointer"
                            onClick={() => handleMemberClick(member)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                  {member.avatar ? (
                                    <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                                  ) : (
                                    <span className="text-sm font-medium">{member.initials}</span>
                                  )}
                                </div>
                                <span 
                                  className={cn(
                                    "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white",
                                    member.status === 'online' ? 'bg-success' : 
                                    member.status === 'away' ? 'bg-warning' : 'bg-border'
                                  )}
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{member.name}</p>
                                  <Badge variant="outline" size="sm">{member.role}</Badge>
                                </div>
                                <p className="text-sm text-text/60">{member.email}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary/80"
                            >
                              <ExternalLink size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>

      <TeamMemberDrawer
        member={selectedMember}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default Team;