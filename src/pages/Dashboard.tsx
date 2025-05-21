import React, { useState } from 'react';
import { FolderKanban, Clock, CheckSquare, Users } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import MiniCalendar from '../components/dashboard/MiniCalendar';
import ActivityItem, { Activity } from '../components/dashboard/ActivityItem';
import ProjectCard, { Project } from '../components/projects/ProjectCard';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Completely revamp the company website with a modern, user-friendly design.',
    progress: 68,
    status: 'active',
    dueDate: 'May 25',
    tasks: { total: 12, completed: 8 },
    members: [
      { id: '1', name: 'Jane Smith', initials: 'JS' },
      { id: '2', name: 'Alex King', initials: 'AK' },
      { id: '3', name: 'Taylor Wilson', initials: 'TW' },
    ],
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build a native mobile app for both iOS and Android platforms.',
    progress: 35,
    status: 'active',
    dueDate: 'Jun 15',
    tasks: { total: 18, completed: 6 },
    members: [
      { id: '2', name: 'Alex King', initials: 'AK' },
      { id: '4', name: 'Morgan Chen', initials: 'MC' },
    ],
  },
];

const mockActivities: Activity[] = [
  {
    id: '1',
    user: { name: 'Alex King', initials: 'AK' },
    action: 'commented on',
    target: 'Design Homepage',
    time: '10 minutes ago',
    type: 'comment',
  },
  {
    id: '2',
    user: { name: 'Taylor Wilson', initials: 'TW' },
    action: 'completed',
    target: 'Setup Analytics',
    time: '1 hour ago',
    type: 'task',
  },
  {
    id: '3',
    user: { name: 'Jane Smith', initials: 'JS' },
    action: 'created',
    target: 'Mobile App Development',
    time: '2 hours ago',
    type: 'project',
  },
  {
    id: '4',
    user: { name: 'Morgan Chen', initials: 'MC' },
    action: 'added',
    target: 'Acme Inc.',
    time: 'Yesterday',
    type: 'client',
  },
];

const Dashboard: React.FC = () => {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const handleProjectToggle = (projectId: string) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Projects"
          value="12"
          icon={<FolderKanban size={20} />}
          change={{ value: 8, trend: 'up' }}
        />
        <StatsCard
          title="Tasks Due Soon"
          value="5"
          icon={<Clock size={20} />}
          change={{ value: 2, trend: 'down' }}
        />
        <StatsCard
          title="Completed Tasks"
          value="23"
          icon={<CheckSquare size={20} />}
          change={{ value: 15, trend: 'up' }}
        />
        <StatsCard
          title="Team Members"
          value="8"
          icon={<Users size={20} />}
          change={{ value: 0, trend: 'neutral' }}
        />
      </div>
      
      {/* Middle Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Column */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold">Active Projects</h2>
              <a href="/projects" className="text-sm text-primary font-medium">
                View all
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project}
                  isExpanded={expandedProjectId === project.id}
                  onToggle={handleProjectToggle}
                />
              ))}
            </div>
          </div>

          {/* Calendar Preview */}
          <div className="lg:hidden">
            <h2 className="font-heading font-semibold mb-4">Calendar</h2>
            <MiniCalendar />
          </div>

          {/* Activity Feed (Mobile/Tablet) */}
          <div className="lg:hidden">
            <h2 className="font-heading font-semibold mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-2">
                <div className="space-y-1">
                  {mockActivities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Calendar & Activity */}
        <div className="space-y-6 hidden lg:block">
          <div>
            <h2 className="font-heading font-semibold mb-4">Calendar</h2>
            <MiniCalendar />
          </div>
          
          <div>
            <h2 className="font-heading font-semibold mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-2">
                <div className="space-y-1">
                  {mockActivities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;