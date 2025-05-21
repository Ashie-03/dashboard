import React, { useState } from 'react';
import { Plus, Filter, LayoutGrid, LayoutList, Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProjectCard, { Project } from '../components/projects/ProjectCard';
import ProjectDrawer from '../components/projects/ProjectDrawer';
import Badge from '../components/ui/Badge';
import { cn } from '../utils/cn';

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
  {
    id: '3',
    name: 'Product Marketing Campaign',
    description: 'Develop and execute a comprehensive marketing strategy for the new product launch.',
    progress: 92,
    status: 'completed',
    dueDate: 'May 5',
    tasks: { total: 15, completed: 15 },
    members: [
      { id: '1', name: 'Jane Smith', initials: 'JS' },
      { id: '5', name: 'Riley Johnson', initials: 'RJ' },
    ],
  },
  {
    id: '4',
    name: 'Customer Portal',
    description: 'Create a secure portal for customers to manage their accounts and subscriptions.',
    progress: 15,
    status: 'planning',
    dueDate: 'Jul 30',
    tasks: { total: 24, completed: 3 },
    members: [
      { id: '2', name: 'Alex King', initials: 'AK' },
      { id: '3', name: 'Taylor Wilson', initials: 'TW' },
      { id: '4', name: 'Morgan Chen', initials: 'MC' },
      { id: '5', name: 'Riley Johnson', initials: 'RJ' },
    ],
  },
  {
    id: '5',
    name: 'User Research',
    description: 'Conduct interviews and usability testing to gather insights for product improvements.',
    progress: 50,
    status: 'on-hold',
    dueDate: 'Jun 10',
    tasks: { total: 10, completed: 5 },
    members: [
      { id: '3', name: 'Taylor Wilson', initials: 'TW' },
      { id: '5', name: 'Riley Johnson', initials: 'RJ' },
    ],
  },
];

const Projects: React.FC = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  
  const filteredProjects = statusFilter
    ? mockProjects.filter(project => project.status === statusFilter)
    : mockProjects;

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setDrawerOpen(true);
  };

  const handleProjectToggle = (projectId: string) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-16 lg:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant={statusFilter === null ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === 'active' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('active')}
          >
            Active
          </Button>
          <Button 
            variant={statusFilter === 'completed' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </Button>
          <Button 
            variant={statusFilter === 'planning' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('planning')}
          >
            Planning
          </Button>
          <Button 
            variant={statusFilter === 'on-hold' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('on-hold')}
          >
            On Hold
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-64 pl-9 pr-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-text/40" />
          </div>
          
          <div className="flex p-1 bg-hover rounded-md">
            <button 
              className={`p-1.5 rounded-md ${viewType === 'grid' ? 'bg-white shadow-soft' : 'text-text/70'}`}
              onClick={() => setViewType('grid')}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`p-1.5 rounded-md ${viewType === 'list' ? 'bg-white shadow-soft' : 'text-text/70'}`}
              onClick={() => setViewType('list')}
            >
              <LayoutList size={18} />
            </button>
          </div>
          
          <Button icon={<Plus size={16} />}>New Project</Button>
        </div>
      </div>
      
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onClick={() => handleProjectClick(project)}
              isExpanded={expandedProjectId === project.id}
              onToggle={handleProjectToggle}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              <div className="grid grid-cols-12 gap-4 p-4 bg-hover/50 text-sm font-medium text-text/70">
                <div className="col-span-5">Project</div>
                <div className="col-span-2 hidden md:block">Status</div>
                <div className="col-span-2 hidden md:block">Due Date</div>
                <div className="col-span-2 text-right md:text-left">Progress</div>
                <div className="col-span-1"></div>
              </div>
              
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-hover cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="col-span-5">
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-text/60 truncate">{project.description}</p>
                  </div>
                  
                  <div className="col-span-2 hidden md:block">
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
                  
                  <div className="col-span-2 text-sm hidden md:block">
                    {project.dueDate}
                  </div>
                  
                  <div className="col-span-2 text-right md:text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="sm">
                      <Filter size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <ProjectDrawer
        project={selectedProject}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default Projects;