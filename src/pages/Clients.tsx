import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Building2, LayoutGrid, LayoutList, MoreHorizontal, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ClientDrawer from '../components/clients/ClientDrawer';
import { cn } from '../utils/cn';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  type: 'company' | 'individual';
  projects: number;
  avatar?: string;
  initials?: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    email: 'contact@acme.com',
    phone: '(555) 123-4567',
    status: 'active',
    type: 'company',
    projects: 3,
    initials: 'AC'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    company: 'Johnson Design',
    email: 'sarah@johnsondesign.com',
    phone: '(555) 234-5678',
    status: 'active',
    type: 'individual',
    projects: 2,
    initials: 'SJ'
  },
  {
    id: '3',
    name: 'Tech Innovators',
    company: 'Tech Innovators LLC',
    email: 'info@techinnovators.com',
    phone: '(555) 345-6789',
    status: 'active',
    type: 'company',
    projects: 1,
    initials: 'TI'
  },
  {
    id: '4',
    name: 'Michael Chen',
    company: 'Chen Consulting',
    email: 'michael@chenconsulting.com',
    phone: '(555) 456-7890',
    status: 'inactive',
    type: 'individual',
    projects: 0,
    initials: 'MC'
  },
  {
    id: '5',
    name: 'Global Solutions',
    company: 'Global Solutions Inc',
    email: 'contact@globalsolutions.com',
    phone: '(555) 567-8901',
    status: 'active',
    type: 'company',
    projects: 4,
    initials: 'GS'
  }
];

const Clients: React.FC = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setDrawerOpen(true);
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-16 lg:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-heading font-semibold text-xl">Clients</h2>
          <div className="flex p-1 bg-hover rounded-md">
            <button 
              className={cn(
                "p-1.5 rounded-md",
                viewType === 'grid' ? "bg-white shadow-soft" : "text-text/70"
              )}
              onClick={() => setViewType('grid')}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={cn(
                "p-1.5 rounded-md",
                viewType === 'list' ? "bg-white shadow-soft" : "text-text/70"
              )}
              onClick={() => setViewType('list')}
            >
              <LayoutList size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-9 pr-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-text/40" />
          </div>
          
          <Button icon={<Plus size={16} />}>Add Client</Button>
        </div>
      </div>
      
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map(client => (
            <Card 
              key={client.id} 
              className="hover:border-primary/30 transition-all duration-200 cursor-pointer"
              onClick={() => handleClientClick(client)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      {client.avatar ? (
                        <img src={client.avatar} alt={client.name} className="w-full h-full rounded-full" />
                      ) : (
                        <span className="text-sm font-medium">{client.initials}</span>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <p className="text-sm text-text/60">{client.company}</p>
                    </div>
                  </div>
                  
                  <button className="p-1 rounded-md hover:bg-hover">
                    <MoreHorizontal size={18} className="text-text/60" />
                  </button>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text/70">
                    <Mail size={14} />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text/70">
                    <Phone size={14} />
                    <span>{client.phone}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <Badge
                    variant={client.status === 'active' ? 'success' : 'secondary'}
                    size="sm"
                  >
                    {client.status}
                  </Badge>
                  
                  <span className="text-sm text-text/60">
                    {client.projects} {client.projects === 1 ? 'project' : 'projects'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              <div className="grid grid-cols-12 gap-4 p-4 bg-hover/50 text-sm font-medium text-text/70">
                <div className="col-span-4">Client</div>
                <div className="col-span-3 hidden md:block">Contact</div>
                <div className="col-span-2 hidden md:block">Status</div>
                <div className="col-span-2 hidden md:block">Projects</div>
                <div className="col-span-1"></div>
              </div>
              
              {filteredClients.map(client => (
                <div 
                  key={client.id} 
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-hover cursor-pointer"
                  onClick={() => handleClientClick(client)}
                >
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        {client.avatar ? (
                          <img src={client.avatar} alt={client.name} className="w-full h-full rounded-full" />
                        ) : (
                          <span className="text-xs font-medium">{client.initials}</span>
                        )}
                      </div>
                      
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-text/60">{client.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-3 hidden md:block">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-text/60" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text/60">
                        <Phone size={14} />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2 hidden md:block">
                    <Badge
                      variant={client.status === 'active' ? 'success' : 'secondary'}
                      size="sm"
                    >
                      {client.status}
                    </Badge>
                  </div>
                  
                  <div className="col-span-2 hidden md:block">
                    <span className="text-sm">
                      {client.projects} {client.projects === 1 ? 'project' : 'projects'}
                    </span>
                  </div>
                  
                  <div className="col-span-8 md:col-span-1 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<ExternalLink size={14} />}
                    >
                      <span className="sr-only">View Details</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <ClientDrawer
        client={selectedClient}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default Clients;