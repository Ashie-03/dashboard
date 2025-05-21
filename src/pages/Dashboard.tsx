import React, { useState } from 'react';
import { Users, Calendar, ClipboardCheck, Clock, FileText, Activity, ChevronRight } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import MiniCalendar from '../components/dashboard/MiniCalendar';
import ActivityItem, { Activity } from '../components/dashboard/ActivityItem';
import Badge from '../components/ui/Badge';
import { cn } from '../utils/cn';

// Mock activity data for the activity feed
const mockActivities: Activity[] = [
  {
    id: '1',
    user: { name: 'Dr. Roberts', initials: 'DR' },
    action: 'completed session with',
    target: 'Sarah Johnson',
    time: '10 minutes ago',
    type: 'task',
  },
  {
    id: '2',
    user: { name: 'Dr. Roberts', initials: 'DR' },
    action: 'added notes for',
    target: 'Michael Chen',
    time: '1 hour ago',
    type: 'comment',
  },
  {
    id: '3',
    user: { name: 'Dr. Roberts', initials: 'DR' },
    action: 'scheduled appointment with',
    target: 'Emily Wilson',
    time: '2 hours ago',
    type: 'project',
  },
  {
    id: '4',
    user: { name: 'System', initials: 'S' },
    action: 'sent reminder to',
    target: 'James Brown',
    time: 'Yesterday',
    type: 'client',
  },
];

// Mock upcoming appointments
const upcomingAppointments = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    type: 'Follow-up',
    time: '2:00 PM',
    status: 'confirmed',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    type: 'Initial Consultation',
    time: '3:30 PM',
    status: 'pending',
  },
  {
    id: '3',
    patientName: 'Emily Wilson',
    type: 'Treatment',
    time: '4:45 PM',
    status: 'confirmed',
  },
];

// Mock recent patients
const recentPatients = [
  {
    id: '1',
    name: 'Sarah Johnson',
    lastVisit: '2 days ago',
    nextAppointment: 'Today, 2:00 PM',
    status: 'Active',
    initials: 'SJ',
  },
  {
    id: '2',
    name: 'Michael Chen',
    lastVisit: '1 week ago',
    nextAppointment: 'Today, 3:30 PM',
    status: 'Active',
    initials: 'MC',
  },
  {
    id: '3',
    name: 'Emily Wilson',
    lastVisit: '2 weeks ago',
    nextAppointment: 'Tomorrow',
    status: 'Active',
    initials: 'EW',
  },
];

// Dashboard component
const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Patients"
          value="124"
          icon={<Users size={20} />}
          change={{ value: 8, trend: 'up' }}
        />
        <StatsCard
          title="Today's Appointments"
          value="5"
          icon={<Calendar size={20} />}
          change={{ value: 2, trend: 'up' }}
        />
        <StatsCard
          title="Completed Sessions"
          value="23"
          icon={<ClipboardCheck size={20} />}
          change={{ value: 15, trend: 'up' }}
        />
        <StatsCard
          title="Pending Reports"
          value="3"
          icon={<FileText size={20} />}
          change={{ value: 1, trend: 'down' }}
        />
      </div>
      
      {/* Middle Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold">Today's Schedule</h2>
              <a href="/appointments" className="text-sm text-primary font-medium">
                View all
              </a>
            </div>
            <Card>
              <CardContent className="divide-y divide-border">
                {upcomingAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex items-center justify-between py-3 first:pt-2 last:pb-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Clock size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <p className="text-sm text-text/60">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={appointment.status === 'confirmed' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {appointment.status}
                      </Badge>
                      <span className="text-sm font-medium">{appointment.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Patients */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold">Recent Patients</h2>
              <a href="/clients" className="text-sm text-primary font-medium">
                View all
              </a>
            </div>
            <Card>
              <CardContent className="divide-y divide-border">
                {recentPatients.map((patient) => (
                  <div 
                    key={patient.id}
                    className="flex items-center justify-between py-3 first:pt-2 last:pb-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-sm font-medium">{patient.initials}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{patient.name}</h3>
                        <p className="text-sm text-text/60">Last visit: {patient.lastVisit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <Badge variant="outline" size="sm">
                          {patient.status}
                        </Badge>
                        <p className="text-sm text-text/60 mt-1">
                          Next: {patient.nextAppointment}
                        </p>
                      </div>
                      <button className="p-2 hover:bg-hover rounded-md">
                        <ChevronRight size={16} className="text-text/40" />
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Calendar Preview (Mobile/Tablet) */}
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