import React from 'react';
import { useLocation } from 'react-router-dom';
import { SearchIcon, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

interface HeaderProps {
  toggleSidebar: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

// Header component that displays page title and search functionality
const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const location = useLocation();
  
  // Get the current page title based on the route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/appointments':
        return 'Appointments';
      case '/clients':
        return 'Clients';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
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
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-error hover:text-error/80"
          >
            <LogOut size={18} />
            <span className="ml-2">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;