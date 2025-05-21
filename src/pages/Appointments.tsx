import React, { useState } from 'react';
import { Calendar, Filter, Plus, LayoutList, Kanban as LayoutKanban } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { cn } from '../utils/cn';

// Interface for appointment data
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

// Mock appointment data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    appointmentType: 'Initial Consultation',
    dateTime: 'Today, 2:00 PM',
    status: 'scheduled',
    patientDetails: {
      id: '1',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
      initials: 'SJ'
    }
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    appointmentType: 'Follow-up',
    dateTime: 'Today, 3:30 PM',
    status: 'scheduled',
    patientDetails: {
      id: '2',
      email: 'michael@example.com',
      phone: '(555) 234-5678',
      initials: 'MC'
    }
  },
  {
    id: '3',
    patientName: 'Emily Wilson',
    appointmentType: 'Treatment Session',
    dateTime: 'Tomorrow, 10:00 AM',
    status: 'scheduled',
    patientDetails: {
      id: '3',
      email: 'emily@example.com',
      phone: '(555) 345-6789',
      initials: 'EW'
    }
  }
];

// Main Appointments component
const Appointments: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Get appointments for different time periods
  const getTodayAppointments = () => 
    mockAppointments.filter(apt => apt.dateTime.includes('Today'));
  
  const getUpcomingAppointments = () => 
    mockAppointments.filter(apt => !apt.dateTime.includes('Today'));

  // Handle appointment status change
  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    // TODO: Implement status change logic
    console.log('Changing status:', appointmentId, newStatus);
  };

  // Handle appointment selection
  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    // TODO: Implement appointment details view
  };

  // Render appointment card
  const renderAppointmentCard = (appointment: Appointment) => (
    <div 
      key={appointment.id}
      className="p-4 hover:bg-hover transition-colors cursor-pointer"
      onClick={() => handleAppointmentClick(appointment)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            {appointment.patientDetails.avatar ? (
              <img 
                src={appointment.patientDetails.avatar} 
                alt={appointment.patientName} 
                className="w-full h-full rounded-full"
              />
            ) : (
              <span className="text-sm font-medium">{appointment.patientDetails.initials}</span>
            )}
          </div>
          
          <div>
            <h3 className="font-medium">{appointment.patientName}</h3>
            <p className="text-sm text-text/60">{appointment.appointmentType}</p>
          </div>
        </div>

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

      <div className="mt-3 flex items-center gap-4 text-sm text-text/60">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{appointment.dateTime}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in pb-16 lg:pb-0">
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-hover rounded-md">
            <button
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === 'list' ? "bg-white shadow-sm text-primary" : "text-text/70 hover:text-text"
              )}
              onClick={() => setViewMode('list')}
            >
              <LayoutList size={20} />
            </button>
            <button
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === 'calendar' ? "bg-white shadow-sm text-primary" : "text-text/70 hover:text-text"
              )}
              onClick={() => setViewMode('calendar')}
            >
              <Calendar size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Filter size={14} />}>
            Filter
          </Button>
          <Button size="sm" icon={<Plus size={14} />}>New Appointment</Button>
        </div>
      </div>

      {/* Appointments list view */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-medium">
                  Today's Appointments • {getTodayAppointments().length}
                </h2>
                <span className="text-xs text-text/60">May 12, 2025</span>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 divide-y divide-border">
              {getTodayAppointments().map(renderAppointmentCard)}
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="py-3">
              <h2 className="font-heading font-medium">
                Upcoming Appointments • {getUpcomingAppointments().length}
              </h2>
            </CardHeader>
            
            <CardContent className="p-0 divide-y divide-border">
              {getUpcomingAppointments().map(renderAppointmentCard)}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Calendar view */}
      {viewMode === 'calendar' && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-text/60">
              Calendar view coming soon...
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Appointments;