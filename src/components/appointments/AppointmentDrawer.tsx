import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Clock,
  MessageSquare,
  FileText,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

interface Appointment {
  id: string;
  patientName: string;
  appointmentType: string;
  dateTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  patientDetails: {
    id: string;
    email: string;
    phone: string;
    avatar?: string;
    initials?: string;
  };
}

interface AppointmentDrawerProps {
  appointment?: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (id: string, status: Appointment['status']) => void;
}

const AppointmentDrawer: React.FC<AppointmentDrawerProps> = ({ 
  appointment, 
  isOpen, 
  onClose,
  onStatusChange 
}) => {
  if (!appointment) return null;

  const handleStatusChange = (newStatus: Appointment['status']) => {
    onStatusChange?.(appointment.id, newStatus);
  };

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
                    appointment.status === 'scheduled' ? 'primary' :
                    appointment.status === 'completed' ? 'success' :
                    appointment.status === 'cancelled' ? 'error' : 'warning'
                  }
                  size="sm"
                >
                  {appointment.status}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                icon={<Trash2 size={14} />} 
                className="text-error"
              >
                Cancel
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
                  <h2 className="text-2xl font-heading font-medium mb-6">Appointment Details</h2>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                      {appointment.patientDetails.avatar ? (
                        <img 
                          src={appointment.patientDetails.avatar} 
                          alt={appointment.patientName} 
                          className="w-full h-full rounded-full" 
                        />
                      ) : (
                        <span className="text-2xl font-medium">
                          {appointment.patientDetails.initials}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{appointment.patientName}</h3>
                      <p className="text-sm text-text/60">{appointment.appointmentType}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-md border border-border">
                      <Mail size={20} className="text-text/60" />
                      <div>
                        <p className="text-sm text-text/60">Email</p>
                        <p className="font-medium">{appointment.patientDetails.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-md border border-border">
                      <Phone size={20} className="text-text/60" />
                      <div>
                        <p className="text-sm text-text/60">Phone</p>
                        <p className="font-medium">{appointment.patientDetails.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-md border border-border">
                      <Calendar size={20} className="text-text/60" />
                      <div>
                        <p className="text-sm text-text/60">Date</p>
                        <p className="font-medium">{appointment.dateTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-md border border-border">
                      <Clock size={20} className="text-text/60" />
                      <div>
                        <p className="text-sm text-text/60">Duration</p>
                        <p className="font-medium">45 minutes</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Actions */}
                <div>
                  <h3 className="text-lg font-heading font-medium mb-4">Update Status</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      variant={appointment.status === 'completed' ? 'primary' : 'outline'}
                      size="sm"
                      icon={<CheckCircle size={16} />}
                      onClick={() => handleStatusChange('completed')}
                      className="justify-start"
                    >
                      Complete
                    </Button>
                    <Button
                      variant={appointment.status === 'cancelled' ? 'primary' : 'outline'}
                      size="sm"
                      icon={<XCircle size={16} />}
                      onClick={() => handleStatusChange('cancelled')}
                      className="justify-start"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={appointment.status === 'no-show' ? 'primary' : 'outline'}
                      size="sm"
                      icon={<AlertCircle size={16} />}
                      onClick={() => handleStatusChange('no-show')}
                      className="justify-start"
                    >
                      No Show
                    </Button>
                    <Button
                      variant={appointment.status === 'scheduled' ? 'primary' : 'outline'}
                      size="sm"
                      icon={<Calendar size={16} />}
                      onClick={() => handleStatusChange('scheduled')}
                      className="justify-start"
                    >
                      Reschedule
                    </Button>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={20} className="text-success" />
                    <h3 className="text-lg font-heading font-medium">Session Notes</h3>
                  </div>

                  <div className="space-y-4">
                    <textarea
                      placeholder="Add session notes..."
                      rows={4}
                      className="w-full px-3 py-2 rounded-md border border-border dark:border-border-dark bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
                      defaultValue={appointment.notes}
                    />
                  </div>
                </div>

                {/* Patient Message */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare size={20} className="text-info" />
                    <h3 className="text-lg font-heading font-medium">Patient Message</h3>
                  </div>

                  <div className="p-4 rounded-md border border-border bg-hover/30">
                    <p className="text-sm text-text/70">
                      No message from patient.
                    </p>
                  </div>
                </div>

                {/* Previous Appointments */}
                <div>
                  <h3 className="text-lg font-heading font-medium mb-4">Previous Appointments</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-md border border-border">
                      <div>
                        <p className="font-medium">Follow-up Session</p>
                        <p className="text-sm text-text/60">April 15, 2025</p>
                      </div>
                      <Badge variant="success" size="sm">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-md border border-border">
                      <div>
                        <p className="font-medium">Initial Consultation</p>
                        <p className="text-sm text-text/60">March 28, 2025</p>
                      </div>
                      <Badge variant="success" size="sm">Completed</Badge>
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

export default AppointmentDrawer;