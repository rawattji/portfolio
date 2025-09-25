'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LetterGlitch from '../LetterGlitch';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [isComplete, setIsComplete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const loadingSteps = [
    { text: 'Initializing...', progress: 5 },
    { text: 'Loading assets...', progress: 25 },
    { text: 'Compiling components...', progress: 45 },
    { text: 'Optimizing performance...', progress: 65 },
    { text: 'Preparing animations...', progress: 80 },
    { text: 'Finalizing experience...', progress: 95 },
    { text: 'Ready!', progress: 100 },
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        
        // Smooth progress animation
        const targetProgress = step.progress;
        const startProgress = currentStep === 0 ? 0 : loadingSteps[currentStep - 1].progress;
        
        // Animate progress smoothly
        let currentProgress = startProgress;
        const progressInterval = setInterval(() => {
          currentProgress += (targetProgress - startProgress) / 20; // 20 steps for smooth animation
          if (currentProgress >= targetProgress) {
            currentProgress = targetProgress;
            clearInterval(progressInterval);
          }
          setProgress(Math.round(currentProgress));
        }, 40); // 40ms per step for smooth animation
        
        currentStep++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 1200); // Slower interval for better user experience

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* LetterGlitch Background */}
        <div className="absolute inset-0">
          <LetterGlitch
            glitchColors={['#1e293b', '#3b82f6', '#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444']}
            glitchSpeed={60}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />
        </div>

        {/* Main Loading Content */}
        <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-6">
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-white">
              Aman Singh Rawat
            </h1>
            <p className="text-gray-400 text-lg">
              Software Developer Portfolio
            </p>
          </motion.div>

          {/* Interactive Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Progress Bar Container */}
            <div className="relative">
              {/* Background Bar */}
              <div className="w-full bg-gray-900/50 backdrop-blur-sm rounded-full h-4 overflow-hidden border border-gray-700/50 shadow-inner">
                {/* Progress Fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Animated Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'linear'
                    }}
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      repeatDelay: 0.5
                    }}
                  />
                  
                  {/* Completion Pulse Effect */}
                  {progress === 100 && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-cyan-300 rounded-full"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Interactive Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{
                  boxShadow: isHovered 
                    ? ['0 0 20px rgba(59, 130, 246, 0.4)', '0 0 40px rgba(6, 182, 212, 0.6)', '0 0 20px rgba(59, 130, 246, 0.4)']
                    : ['0 0 10px rgba(59, 130, 246, 0.3)', '0 0 20px rgba(6, 182, 212, 0.4)', '0 0 10px rgba(59, 130, 246, 0.3)']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Progress Percentage */}
              <motion.div
                className="absolute -top-8 left-0 text-cyan-400 text-sm font-medium"
                animate={{ 
                  x: [`${progress}%`, `${progress}%`],
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {progress}%
              </motion.div>
            </div>

            {/* Status Text */}
            <div className="flex justify-between items-center">
              <motion.p 
                className="text-gray-300 text-sm"
                animate={{ 
                  color: isHovered ? '#06b6d4' : '#d1d5db'
                }}
                transition={{ duration: 0.3 }}
              >
                {loadingText}
              </motion.p>
              
              {/* Interactive Loading Dots */}
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Interactive Loading Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Main Spinner */}
              <motion.div
                className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Counter Rotating Ring */}
              <motion.div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cyan-400 rounded-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Pulsing Center */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              </motion.div>
            </div>
          </motion.div>

          {/* Completion Animation */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-emerald-400 text-lg font-medium"
              >
                ✨ Welcome to my portfolio!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Interactive Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 rounded-full ${
                i % 4 === 0 ? 'bg-blue-500/30' :
                i % 4 === 1 ? 'bg-cyan-500/30' :
                i % 4 === 2 ? 'bg-emerald-500/30' :
                'bg-purple-500/30'
              }`}
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};