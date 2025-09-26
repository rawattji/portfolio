'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AvatarState } from '@/types';
import { cn } from '@/lib/utils';

interface AvatarProps {
  state: AvatarState;
  isTransitioning: boolean;
  className?: string;
}

// Video components for avatar states with optimized loading
const AvatarIdleRight = () => (
  <video
    className="w-full h-full object-cover rounded-full"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
  >
    <source src="/portfolio/videos/homePage_leftView.mp4" type="video/mp4" />
    {/* Fallback SVG */}
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="#708659" opacity="0.8" />
      <circle cx="120" cy="85" r="5" fill="white" />
      <path d="M 80 120 Q 100 130 120 120" stroke="white" strokeWidth="2" fill="none" />
      <text x="100" y="170" textAnchor="middle" fill="white" fontSize="12">Looking Right →</text>
    </svg>
  </video>
);

const AvatarIdleFront = () => (
  <video
    className="w-full h-full object-cover rounded-full"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
  >
    <source src="/portfolio/videos/aboutSecton_FrontView.mp4" type="video/mp4" />
    {/* Fallback SVG */}
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="#708659" opacity="0.8" />
      <circle cx="85" cy="85" r="5" fill="white" />
      <circle cx="115" cy="85" r="5" fill="white" />
      <path d="M 80 120 Q 100 130 120 120" stroke="white" strokeWidth="2" fill="none" />
      <text x="100" y="170" textAnchor="middle" fill="white" fontSize="12">Front View</text>
    </svg>
  </video>
);

const AvatarFormal = () => (
  <video
    className="w-full h-full object-cover rounded-full"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
  >
    <source src="/portfolio/videos/experienceSecton_Formal.mp4" type="video/mp4" />
    {/* Fallback SVG */}
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="#445336" opacity="0.9" />
      <rect x="70" y="130" width="60" height="40" fill="#2f3827" />
      <polygon points="70,130 100,140 130,130" fill="#556944" />
      <circle cx="85" cy="85" r="5" fill="white" />
      <circle cx="115" cy="85" r="5" fill="white" />
      <path d="M 85 115 L 115 115" stroke="white" strokeWidth="2" />
      <text x="100" y="190" textAnchor="middle" fill="white" fontSize="10">Formal Attire</text>
    </svg>
  </video>
);

const AvatarCreative = () => (
  <video
    className="w-full h-full object-cover rounded-full"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
  >
    <source src="/portfolio/videos/projectSection_typing.mp4" type="video/mp4" />
    {/* Fallback SVG */}
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="creative" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#95a37a" />
          <stop offset="100%" stopColor="#556944" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#creative)" opacity="0.9" />
      <rect x="75" y="70" width="10" height="20" fill="#FFB6C1" opacity="0.8" />
      <rect x="115" y="70" width="10" height="20" fill="#87CEEB" opacity="0.8" />
      <path d="M 70 120 Q 100 140 130 120" stroke="white" strokeWidth="3" fill="none" />
      <text x="100" y="170" textAnchor="middle" fill="white" fontSize="12">Creative Mode</text>
    </svg>
  </video>
);

const AvatarNamaste = () => (
  <video
    className="w-full h-full object-cover rounded-full"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
  >
    <source src="/portfolio/videos/resumeSection_Namaste.mp4" type="video/mp4" />
    {/* Fallback SVG */}
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="#708659" opacity="0.8" />
      <circle cx="85" cy="85" r="5" fill="white">
        <animate attributeName="r" values="5;3;5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="115" cy="85" r="5" fill="white">
        <animate attributeName="r" values="5;3;5" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M 80 120 Q 100 130 120 120" stroke="white" strokeWidth="2" fill="none" />
      <path d="M 90 140 L 90 120 L 100 110 L 110 120 L 110 140" 
            stroke="white" strokeWidth="2" fill="none" />
      <text x="100" y="170" textAnchor="middle" fill="white" fontSize="12">🙏 Namaste</text>
    </svg>
  </video>
);

const avatarComponents: Record<AvatarState, React.FC> = {
  'idle-right': AvatarIdleRight,
  'idle-front': AvatarIdleFront,
  'formal': AvatarFormal,
  'creative': AvatarCreative,
  'namaste': AvatarNamaste,
};

export const Avatar: React.FC<AvatarProps> = ({ state, isTransitioning, className }) => {
  const AvatarComponent = avatarComponents[state];

  return (
    <div className={cn(
      "relative w-48 h-48 md:w-64 md:h-64",
      className
    )}>
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ 
            opacity: isTransitioning ? 0.7 : 1, 
            scale: 1, 
            rotate: 0 
          }}
          exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
          transition={{ 
            duration: 0.4,
            ease: "easeInOut"
          }}
          className="w-full h-full"
        >
          <div className="relative w-full h-full animate-float">
            <AvatarComponent />
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full pointer-events-none" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/**
 * Avatar Video Integration Guide
 * ==============================
 * 
 * Current Implementation:
 * - Uses MP4 videos for all avatar states: idle-right, idle-front, formal, creative, namaste
 * - Falls back to SVG placeholders if videos fail to load
 * - Videos are configured with autoplay, loop, muted for seamless experience
 * 
 * Video Files Used:
 * - /videos/homePage_leftView.mp4 -> idle-right state
 * - /videos/aboutSecton_FrontView.mp4 -> idle-front state  
 * - /videos/experienceSecton_Formal.mp4 -> formal state (experience section)
 * - /videos/projectSection_typing.mp4 -> creative state (projects section)
 * - /videos/resumeSection_Namaste.mp4 -> namaste state
 * 
 * To add more video states:
 * 1. Add MP4 files to public/videos/
 * 2. Create new avatar component with video element
 * 3. Add to avatarComponents mapping
 * 4. Update AvatarState type if needed
 * 
 * Video Optimization Tips:
 * - Keep videos under 5MB for fast loading
 * - Use MP4 format with H.264 codec
 * - Consider using WebM for better compression
 * - Preload videos for smoother transitions
 */
