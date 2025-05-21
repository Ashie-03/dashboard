import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, Calendar, Users } from 'lucide-react';
import { cn } from '../../utils/cn';

const MobileNav: React.FC = () => {
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/projects', icon: <FolderKanban size={20} />, label: 'Projects' },
    { path: '/tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
    { path: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { path: '/team', icon: <Users size={20} />, label: 'Team' },
  ];
  
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-6 z-10">
      <ul className="flex justify-between">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1 p-2 rounded-md",
                isActive 
                  ? "text-primary" 
                  : "text-text/60 hover:text-text/80"
              )}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;