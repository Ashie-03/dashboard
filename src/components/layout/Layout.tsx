import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Plus, FolderKanban, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches);
    }
    return false;
  });
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleFabMenu = () => {
    setFabMenuOpen(!fabMenuOpen);
  };
  
  return (
    <div className="flex h-screen bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} isDark={isDark} toggleTheme={toggleTheme} />
        
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
        
        <MobileNav />

        {/* Floating Action Button */}
        <div className="fixed bottom-24 right-6 z-30 lg:bottom-8">
          <div className="relative">
            <AnimatePresence>
              {fabMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-full mb-4 right-0 min-w-[180px] bg-white dark:bg-background-dark rounded-lg shadow-lg border border-border dark:border-border-dark overflow-hidden"
                >
                  <button
                    onClick={() => setFabMenuOpen(false)}
                    className="flex items-center gap-2 w-full p-3 hover:bg-hover dark:hover:bg-hover-dark text-left"
                  >
                    <FolderKanban size={16} className="text-primary" />
                    <span className="text-sm font-medium">New Project</span>
                  </button>
                  <button
                    onClick={() => setFabMenuOpen(false)}
                    className="flex items-center gap-2 w-full p-3 hover:bg-hover dark:hover:bg-hover-dark text-left"
                  >
                    <CheckSquare size={16} className="text-primary" />
                    <span className="text-sm font-medium">New Task</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleFabMenu}
              className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg flex items-center justify-center"
            >
              <Plus size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;