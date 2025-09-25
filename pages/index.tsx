'use client';

import React, { useState, useEffect } from 'react';
import { useAvatarState } from '@/hooks/useAvatarState';
import { usePreloader } from '@/hooks/usePreloader';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';
import { Avatar } from '@/components/common/Avatar';
import { motion } from 'framer-motion';
import { HomeSection } from '@/components/sections/HomeSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { InteractiveProjectsSection } from '@/components/sections/InteractiveProjectsSection';
import { ResumeSection } from '@/components/sections/ResumeSection';
import { Footer } from '@/components/layout/Footer';
import GradualBlur from '@/components/effects/GradualBlur';
import { getPerformanceSettings } from '@/utils/performance';

export default function Home() {
  const { currentState, isTransitioning, activeSection } = useAvatarState();
  const { isLoading, progress, status } = usePreloader();
  const [showFloatingAvatar, setShowFloatingAvatar] = useState(false);
  const [showGradualBlur, setShowGradualBlur] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const performanceSettings = getPerformanceSettings();

  const handleLoadingComplete = () => {
    setIsReady(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setShowFloatingAvatar(scrollY > windowHeight * 0.5);
      
      const distanceFromBottom = documentHeight - scrollY - windowHeight;
      setShowGradualBlur(distanceFromBottom > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isReady) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar activeSection={activeSection} />

      <main className="relative">
        <HomeSection 
          avatarState={currentState}
          isTransitioning={isTransitioning}
        />

        <AboutSection />

        <ExperienceSection />

        <InteractiveProjectsSection />

        <ResumeSection />
      </main>

      <Footer />

      <div className={`gradual-blur-container ${showGradualBlur ? '' : 'hidden'}`}>
        <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
          <GradualBlur
            target="page"
            position="bottom"
            height="6rem"
            strength={2}
            divCount={5}
            curve="bezier"
            exponential={true}
            opacity={1}
          />
        </div>
      </div>

      <motion.div
        className="fixed bottom-8 right-8 z-50 pointer-events-none"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ 
          opacity: showFloatingAvatar ? 1 : 0,
          scale: showFloatingAvatar ? 1 : 0,
          y: showFloatingAvatar ? 0 : 20
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.6
        }}
      >
        <div className="relative">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-olive-500/50 to-olive-700/70 backdrop-blur-md border border-olive-400/70 shadow-2xl flex items-center justify-center">
            <Avatar 
              state={currentState} 
              isTransitioning={isTransitioning}
              className="w-20 h-20 lg:w-28 lg:h-28"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-olive-400/50 to-olive-600/60 rounded-full blur-xl -z-10 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-olive-300/30 to-transparent rounded-full -z-5" />
          
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
      
    </div>
  );
}
