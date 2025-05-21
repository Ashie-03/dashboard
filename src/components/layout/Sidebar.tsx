import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Calendar, 
  Users, 
  Book as AddressBook, 
  Settings, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Briefcase,
  BarChart2,
  FileText,
  UserPlus,
  UsersRound,
  Building2,
  MessageSquare
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
  submenu?: {
    path: string;
    label: string;
    icon: React.ReactNode;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = React.useState<string | null>(null);

  const navItems: NavItem[] = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { 
      path: '/projects', 
      icon: <FolderKanban size={20} />, 
      label: 'Projects',
      submenu: [
        { path: '/projects/list', label: 'All Projects', icon: <Briefcase size={16} /> },
        { path: '/projects/analytics', label: 'Analytics', icon: <BarChart2 size={16} /> },
        { path: '/projects/documents', label: 'Documents', icon: <FileText size={16} /> },
      ]
    },
    { path: '/tasks', icon: <CheckSquare size={20} />, label: 'My Tasks' },
    { path: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { 
      path: '/team', 
      icon: <Users size={20} />, 
      label: 'Team',
      submenu: [
        { path: '/team/members', label: 'Members', icon: <UsersRound size={16} /> },
        { path: '/team/departments', label: 'Departments', icon: <Building2 size={16} /> },
        { path: '/team/chat', label: 'Team Chat', icon: <MessageSquare size={16} /> },
      ]
    },
    { path: '/clients', icon: <AddressBook size={20} />, label: 'Clients' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const toggleSubmenu = (path: string) => {
    if (isCollapsed) return;
    setExpandedSubmenu(expandedSubmenu === path ? null : path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 280,
          x: isOpen ? 0 : -280
        }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-gradient-to-b from-white to-white/95 dark:from-background-dark dark:to-background-dark/95",
          "border-r border-border/30 dark:border-border-dark/30 flex flex-col",
          "lg:relative lg:translate-x-0",
          "backdrop-blur-xl backdrop-saturate-150",
          "shadow-[8px_0_32px_-12px_rgba(0,0,0,0.08)]"
        )}
      >
        <div className={cn(
          "flex items-center h-16",
          isCollapsed ? "justify-center px-2" : "justify-between px-5",
          "relative before:absolute before:inset-x-0 before:top-full before:h-12",
          "before:bg-gradient-to-b before:from-border/[0.08] before:to-transparent dark:before:from-white/[0.02]"
        )}>
          {!isCollapsed && (
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-heading font-semibold text-xl"
            >
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                TerraCRM
              </span>
            </motion.h1>
          )}
          
          <div className="flex items-center gap-2">
            {!isCollapsed && (
              <button 
                className="p-1.5 rounded-lg hover:bg-hover/80 dark:hover:bg-hover-dark/80 lg:hidden"
                onClick={toggleSidebar}
              >
                <X size={18} />
              </button>
            )}
            
            <button
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-hover/80 dark:hover:bg-hover-dark/80 text-text/60"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
          </div>
        </div>

        <nav className={cn(
          "flex-1 py-6 px-3 space-y-1",
          isCollapsed ? "overflow-hidden" : "overflow-y-auto",
          "scrollbar-none" // Hide scrollbar but maintain functionality
        )}>
          {navItems.map((item) => (
            <div key={item.path} className="relative">
              {item.submenu ? (
                <>
                  <button
                    className={cn(
                      "flex items-center w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                      "hover:bg-hover/50 dark:hover:bg-hover-dark/50",
                      "group relative text-left",
                      expandedSubmenu === item.path && [
                        "bg-primary/10 text-primary dark:text-primary-dark font-medium",
                        "before:absolute before:inset-y-0 before:-left-3 before:w-1 before:bg-primary before:rounded-full",
                        "dark:before:bg-primary-dark"
                      ]
                    )}
                    onClick={() => toggleSubmenu(item.path)}
                  >
                    <div className={cn(
                      "flex items-center justify-center relative",
                      isCollapsed && "w-full",
                      "transition-transform group-hover:scale-110 duration-200"
                    )}>
                      {item.icon}
                    </div>
                    
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 ml-3">{item.label}</span>
                        <ChevronDown 
                          size={16} 
                          className={cn(
                            "text-text/40 transition-transform",
                            expandedSubmenu === item.path && "rotate-180"
                          )} 
                        />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {!isCollapsed && expandedSubmenu === item.path && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-10 pr-3 py-1"
                      >
                        {item.submenu.map((subitem) => (
                          <NavLink
                            key={subitem.path}
                            to={subitem.path}
                            className={({ isActive }) => cn(
                              "flex items-center px-3 py-2 rounded-lg text-sm transition-colors",
                              "hover:bg-hover/50 dark:hover:bg-hover-dark/50",
                              "text-left",
                              isActive && "text-primary font-medium"
                            )}
                          >
                            {subitem.icon}
                            <span className="ml-2">{subitem.label}</span>
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                    "hover:bg-hover/50 dark:hover:bg-hover-dark/50",
                    "group relative text-left",
                    isActive && [
                      "bg-primary/10 text-primary dark:text-primary-dark font-medium",
                      "before:absolute before:inset-y-0 before:-left-3 before:w-1 before:bg-primary before:rounded-full",
                      "dark:before:bg-primary-dark"
                    ]
                  )}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  <div className={cn(
                    "flex items-center justify-center relative",
                    isCollapsed && "w-full",
                    "transition-transform group-hover:scale-110 duration-200"
                  )}>
                    {item.icon}
                  </div>
                  
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="ml-3"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-text/90 dark:bg-text-dark/90 text-white dark:text-background-dark text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200 z-50 min-w-[100px] shadow-xl">
                      {item.label}
                      <div className="absolute top-1/2 -left-1 w-2 h-2 bg-text/90 dark:bg-text-dark/90 transform -translate-y-1/2 rotate-45" />
                    </div>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        <div className={cn(
          "relative",
          "before:absolute before:inset-x-0 before:bottom-full before:h-12",
          "before:bg-gradient-to-t before:from-border/[0.08] before:to-transparent dark:before:from-white/[0.02]"
        )}>
          <div className={cn(
            "p-4 mx-3 mb-3 rounded-xl",
            "bg-gradient-to-br from-primary/[0.08] to-primary/[0.02]",
            "dark:from-primary-dark/[0.08] dark:to-primary-dark/[0.02]",
            isCollapsed && "flex justify-center"
          )}>
            <div className={cn(
              "flex items-center gap-3",
              isCollapsed && "relative group"
            )}>
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center ring-2 ring-primary/10">
                  <span className="text-xs font-medium text-primary">JS</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-success ring-2 ring-white dark:ring-background-dark" />
              </div>
              
              {!isCollapsed && (
                <div>
                  <p className="text-sm font-medium">Jane Smith</p>
                  <p className="text-xs text-text/60 dark:text-text-dark/60">Free Plan</p>
                </div>
              )}
              
              {/* Profile tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full bottom-0 ml-4 p-3 bg-text/90 dark:bg-text-dark/90 text-white dark:text-background-dark text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-white/70 dark:text-background-dark/70 mt-0.5">Free Plan</p>
                  <div className="absolute top-1/2 -left-1 w-2 h-2 bg-text/90 dark:bg-text-dark/90 transform -translate-y-1/2 rotate-45" />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile toggle button */}
      <button
        className="fixed bottom-20 left-4 z-20 p-3 rounded-full bg-primary/90 dark:bg-primary-dark/90 text-white shadow-lg backdrop-blur-sm lg:hidden hover:bg-primary dark:hover:bg-primary-dark transition-colors"
        onClick={toggleSidebar}
      >
        <Menu size={20} />
      </button>
    </>
  );
};

export default Sidebar;