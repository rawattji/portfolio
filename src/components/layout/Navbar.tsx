'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { NavItem, SectionId } from '../../types';
import { cn, scrollToSection } from '../../lib/utils';
import { Home, User, Briefcase, FolderOpen, FileText } from 'lucide-react';

interface NavbarProps {
  activeSection: SectionId;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'resume', label: 'Resume', href: '#resume' },
];

const navIcons: Record<SectionId, React.ReactNode> = {
  home: <Home className="w-4 h-4" />,
  about: <User className="w-4 h-4" />,
  experience: <Briefcase className="w-4 h-4" />,
  projects: <FolderOpen className="w-4 h-4" />,
  resume: <FileText className="w-4 h-4" />,
};

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.2
      }}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="mt-2 sm:mt-4 lg:mt-6">
          {/* Premium Glass morphism navbar */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Glass container with enhanced effects */}
            <div className="
              backdrop-blur-xl bg-gradient-to-r from-olive-900/30 via-olive-800/25 to-olive-900/30
              rounded-xl sm:rounded-2xl px-2 py-2 sm:px-3 sm:py-3 
              border border-olive-400/30
              shadow-2xl shadow-olive-900/50
              relative overflow-hidden
              before:absolute before:inset-0 
              before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
              before:rounded-xl sm:before:rounded-2xl
            ">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-b from-olive-300/10 to-transparent pointer-events-none" />
              
              <ul className="flex items-center justify-center space-x-1 sm:space-x-2 relative z-10">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <motion.a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={cn(
                          "relative flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300",
                          "hover:bg-olive-500/20 hover:shadow-lg hover:shadow-olive-500/25",
                          "border border-transparent hover:border-olive-400/20",
                          isActive 
                            ? "text-olive-100 bg-olive-600/30 border-olive-400/40 shadow-md shadow-olive-500/20" 
                            : "text-olive-200/80 hover:text-olive-100"
                        )}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                        }}
                        whileTap={{ 
                          scale: 0.95,
                          y: 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <motion.div
                          className="flex items-center gap-1 sm:gap-2"
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          {navIcons[item.id]}
                          <span className="hidden xs:inline font-semibold">{item.label}</span>
                        </motion.div>
                        
                        {/* Enhanced active indicator with faster animation */}
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-gradient-to-r from-olive-600/50 to-olive-500/50 rounded-xl border border-olive-400/40"
                            style={{ zIndex: -1 }}
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 35,
                              duration: 0.2
                            }}
                          />
                        )}
                        
                        {/* Hover glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-olive-500/20 opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          style={{ zIndex: -2 }}
                        />
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* Outer glow effect */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-olive-500/20 to-olive-600/20 blur-xl opacity-50 -z-10" />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};
