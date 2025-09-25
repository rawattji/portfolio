'use client';

import { useState, useEffect, useCallback } from 'react';
import { AvatarState, SectionId } from '@/types';

const sectionAvatarMap: Record<SectionId, AvatarState> = {
  home: 'idle-right',
  about: 'idle-front',
  experience: 'formal',
  projects: 'creative',
  resume: 'namaste',
};

export const useAvatarState = () => {
  const [currentState, setCurrentState] = useState<AvatarState>('idle-right');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  const handleSectionChange = useCallback((sectionId: SectionId) => {
    if (sectionId !== activeSection) {
      console.log(`Avatar state changing from ${activeSection} to ${sectionId}`);
      setIsTransitioning(true);
      setActiveSection(sectionId);
      
      setTimeout(() => {
        setCurrentState(sectionAvatarMap[sectionId]);
        setTimeout(() => setIsTransitioning(false), 150);
      }, 50);
    }
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionAvatarMap) as SectionId[];
      let currentSection: SectionId = activeSection; // Keep current section as default
      let closestSection = { id: activeSection, distance: Infinity };
      
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          const sectionCenter = rect.top + rect.height / 2;
          const viewportCenter = viewportHeight / 2;
          const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
          
          if (rect.bottom >= 0 && rect.top <= viewportHeight) {
            if (distanceFromCenter < closestSection.distance) {
              closestSection = { id: sectionId as SectionId, distance: distanceFromCenter };
            }
          }
        }
      });
      
      if (closestSection.distance !== Infinity) {
        currentSection = closestSection.id as SectionId;
      }
      
      if (currentSection !== activeSection) {
        handleSectionChange(currentSection);
      }
    };

    let rafId: number;
    let isScrolling = false;

    const smoothScrollHandler = () => {
      if (!isScrolling) {
        isScrolling = true;
        rafId = requestAnimationFrame(() => {
          handleScroll();
          isScrolling = false;
        });
      }
    };

    window.addEventListener('scroll', smoothScrollHandler, { passive: true });
    
    const initialTimer = setTimeout(handleScroll, 100);
    
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', smoothScrollHandler);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(initialTimer);
    };
  }, [activeSection, handleSectionChange]);

  return {
    currentState,
    isTransitioning,
    activeSection,
    handleSectionChange,
  };
};