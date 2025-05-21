// Nav > Client > Click Client profifle to see this UI
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  MapPin,
  Globe,
  FileText,
  Trash2,
  CreditCard
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

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

interface ClientDrawerProps {
  client?: Client;
  isOpen: boolean;
  onClose: () => void;
}

const ClientDrawer: React.FC<ClientDrawerProps> = ({ client, isOpen, onClose }) => {
  if (!client) return null;

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
          <div className="max-w-3xl mx-auto p-6">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <div className='flex gap-2'>
                  <h2 className="text-2xl font-heading font-medium mb-6">Client Details</h2>
                  <div>
                    <Badge
                      variant={client.status === 'active' ? 'success' : 'secondary'}
                      size="sm"
                    >
                      {client.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                    {client.avatar ? (
                      <img src={client.avatar} alt={client.name} className="w-full h-full rounded-full" />
                    ) : (
                      <span className="text-2xl font-medium">{client.initials}</span>
                    )}
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Image</Button>
                    <p className="text-xs text-text/60 mt-1">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Client Name</label>
                      <input
                        type="text"
                        defaultValue={client.name}
                        className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Referred By</label>
                      <input
                        type="text"
                        defaultValue={client.company}
                        className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={client.email}
                        className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        defaultValue={client.phone}
                        className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* History */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-medium">Client History</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md border border-border dark:border-border-dark">
                    <div>
                      <p className="font-medium">Consultation 2</p>
                      <p className="text-sm text-text/60">May 25, 2025</p>
                    </div>
                    <Badge variant="primary" size="sm">Finished</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md border border-border dark:border-border-dark">
                    <div>
                      <p className="font-medium">Upcoming Appointment</p>
                      <p className="text-sm text-text/60">June 15, 2025</p>
                    </div>
                    <Badge variant="warning" size="sm">Yet to be approved</Badge>
                  </div>
                </div>
              </div>

              {/* Session Notes */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={20} className="text-success" />
                  <h3 className="text-lg font-heading font-medium">Notes</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-md border border-border dark:border-border-dark">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Consultation 1</p>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <p className="text-sm">May 25, 2025</p>
                    <br/>
                    <p className="text-sm text-text/60">Patient reports dull, aching pain in the lower back for the past 3 weeks. Pain worsens with prolonged sitting and improves slightly with movement. Denies radiating pain or numbness. No prior back injury noted.</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={20} className="text-info" />
                  <h3 className="text-lg font-heading font-medium">Documents</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md border border-border dark:border-border-dark">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-text/60" />
                      <div>
                        <p className="font-medium">Prescription.pdf</p>
                        <p className="text-sm text-text/60">Added 2 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md border border-border dark:border-border-dark">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-text/60" />
                      <div>
                        <p className="font-medium">Intake_Form.pdf</p>
                        <p className="text-sm text-text/60">Added 1 week ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Upload Document
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientDrawer;