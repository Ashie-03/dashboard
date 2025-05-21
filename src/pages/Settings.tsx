import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Palette, CreditCard, Key, User, Users, Lock, Globe, Laptop, Moon, Sun, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { cn } from '../utils/cn';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={20} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={20} /> },
    { id: 'team', label: 'Team', icon: <Users size={20} /> },
    { id: 'security', label: 'Security', icon: <Lock size={20} /> },
    { id: 'api', label: 'API', icon: <Key size={20} /> },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16 lg:pb-0">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-xl">Settings</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-3">
          <CardContent className="p-2">
            <nav>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-md text-sm transition-colors",
                    activeTab === tab.id 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-hover text-text/70"
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* Profile Settings */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-medium text-lg mb-1">Profile Settings</h3>
                  <p className="text-sm text-text/60">Manage your account information and preferences</p>
                </div>
                <Badge variant="outline" size="sm">Coming Soon</Badge>
              </div>
              
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xl font-medium">JS</span>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-text/60 mt-1">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      placeholder="Jane"
                      className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      placeholder="Smith"
                      className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    placeholder="Write a short bio..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time Zone</label>
                  <select className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary/30 bg-white">
                    <option>Pacific Time (PT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Central Time (CT)</option>
                    <option>Eastern Time (ET)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                      <Globe size={20} className="text-warning" />
                    </div>
                    <div>
                      <h4 className="font-medium">Language</h4>
                      <p className="text-sm text-text/60">English (US)</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-text/30" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
                      <Laptop size={20} className="text-info" />
                    </div>
                    <div>
                      <h4 className="font-medium">System</h4>
                      <p className="text-sm text-text/60">Version 1.0.0</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-text/30" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sun size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Theme</h4>
                      <p className="text-sm text-text/60">Light</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-text/30" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Changes */}
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;