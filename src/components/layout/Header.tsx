import React from 'react';
import { useLocation } from 'react-router-dom';
import { BellIcon, SearchIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface HeaderProps {
  toggleSidebar: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/projects':
        return 'Projects';
      case '/tasks':
        return 'My Tasks';
      case '/calendar':
        return 'Calendar';
      case '/team':
        return 'Team';
      case '/clients':
        return 'Clients';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border dark:border-border-dark">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="font-heading font-semibold text-xl">{getPageTitle()}</h1>
        
        <div className="flex items-center gap-2">
          <div className={cn(
            "relative hidden md:flex items-center",
            "rounded-md border border-border dark:border-border-dark bg-hover/50 dark:bg-hover-dark/50 px-3 py-1.5",
            "focus-within:ring-1 focus-within:ring-primary/30 dark:focus-within:ring-primary-dark/30"
          )}>
            <SearchIcon size={16} className="text-text/40 dark:text-text-dark/40 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm focus:outline-none w-40"
            />
          </div>
          
          <button className="p-2 rounded-md hover:bg-hover dark:hover:bg-hover-dark relative">
            <BellIcon size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary dark:bg-primary-dark rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;