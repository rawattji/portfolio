'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { AvatarState } from '@/types';
import { ChevronDown, Sparkles, Code2, Briefcase } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';
import TextEffect from '@/components/ui/TextEffect';
import { Avatar } from '@/components/common/Avatar';
import Aurora from '@/components/effects/Aurora';
import { getPerformanceSettings, getAnimationVariant } from '@/utils/performance';

interface HomeSectionProps {
  avatarState: AvatarState;
  isTransitioning: boolean;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ 
  avatarState, 
  isTransitioning 
}) => {
  const [mounted, setMounted] = useState(false);
  const [hoverIntensity, setHoverIntensity] = useState(0.2);
  const [enableHover, setEnableHover] = useState(true);
  
  const roles = ['Software Developer', 'Full Stack Engineer', 'Problem Solver', 'Tech Enthusiast'];
  const [currentRole, setCurrentRole] = useState(0);

  // Get performance settings
  const performanceSettings = getPerformanceSettings();

  // Only use scroll effects on client-side to avoid hydration issues
  const { scrollYProgress } = useScroll();

  // Transform scroll to background colors - adjust values for viewport scrolling
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.8], [1, 0.9, 0.6, 0.3]);
  const blueIntensity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0.2, 0.6]);
  const oliveIntensity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(roleInterval);
  }, []);

  useEffect(() => {
    const hoverInterval = setInterval(() => {
      setHoverIntensity(prev => prev === 0.2 ? 0.5 : 0.2);
    }, 3000);

    return () => clearInterval(hoverInterval);
  }, []);

  if (!mounted) {
    return <div className="h-screen bg-black" />;
  }

  return (
    <div className="relative">
      {/* Hero Section with Aurora Background */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-12 bg-black pt-20 sm:pt-24 lg:pt-28"
      >
        {/* Aurora Background - Only render on client */}
        {mounted && performanceSettings.enableComplexAnimations && (
          <div className="absolute inset-0 z-0">
            <Aurora
              colorStops={["#d4af37", "#60a5fa", "#a78bfa"]}
              blend={0.4}
              amplitude={0.8}
              speed={0.3}
            />
          </div>
        )}
        
        {/* Main Content Container with higher z-index */}
        <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative z-20 space-y-8">
            {/* Main Title with Fuzzy Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
                Hi, I'm{' '}
                <span className="block lg:inline">
                  <TextEffect
                    effect={performanceSettings.enableComplexAnimations ? "fuzzy" : "decrypt"}
                    text="Aman Singh Rawat"
                    baseIntensity={0.2}
                    hoverIntensity={hoverIntensity}
                    enableHover={enableHover && performanceSettings.enableComplexAnimations}
                    fontSize="clamp(2rem, 6vw, 4rem)"
                    fontWeight={900}
                    color="#d4af37"
                    animateOn="load"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Amazon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-full border border-orange-400/30">
                <Briefcase className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 font-semibold">Former Intern @ Amazon</span>
                <Sparkles className="w-4 h-4 text-orange-400" />
              </div>
            </motion.div>

            {/* Animated Role with TextEffect */}
            <div className="relative h-12 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-xl sm:text-2xl lg:text-3xl text-olive-200 font-medium flex items-center justify-center lg:justify-start gap-2 sm:gap-3"
                >
                  <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-olive-400" />
                  <TextEffect
                    text={roles[currentRole]}
                    effect="decrypt"
                    speed={80}
                    maxIterations={20}
                    className="text-olive-200"
                    animateOn="view"
                    revealDirection="start"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description with TextEffect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-4 text-center lg:text-left"
            >
              <TextEffect
                effect="decrypt"
                text="Building elegant solutions with modern technologies."
                speed={60}
                maxIterations={25}
                className="text-base sm:text-lg text-olive-100/80 leading-relaxed"
                animateOn="view"
                revealDirection="center"
              />
              
              <TextEffect
                effect="decrypt"
                text="Specialized in full-stack development with passion for creating seamless, scalable applications."
                speed={50}
                maxIterations={30}
                className="text-base sm:text-lg text-olive-100/80 leading-relaxed"
                animateOn="view"
                revealDirection="start"
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-olive-600 to-olive-700 text-white font-semibold rounded-lg hover:from-olive-500 hover:to-olive-600 transition-all duration-300 shadow-lg hover:shadow-olive-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('about')}
                className="px-8 py-3 border-2 border-olive-500 text-olive-300 font-semibold rounded-lg hover:bg-olive-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <TextEffect
                  effect="decrypt"
                  text="About Me"
                  speed={40}
                  maxIterations={15}
                  animateOn="hover"
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Avatar Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-20 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Avatar Container */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-olive-500/30 to-olive-700/50 backdrop-blur-md border border-olive-400/50 shadow-2xl flex items-center justify-center relative overflow-hidden">
                <Avatar 
                  state={avatarState} 
                  isTransitioning={isTransitioning}
                  className="w-56 h-56 sm:w-72 sm:h-72 lg:w-88 lg:h-88"
                />
                
                {/* Inner Glow */}
                <div className="absolute inset-4 bg-gradient-to-r from-olive-400/30 to-olive-600/40 rounded-full blur-2xl -z-10" />
              </div>
              
              {/* Outer Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-olive-400/20 to-olive-600/30 rounded-full blur-3xl -z-20 animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-br from-olive-300/10 to-transparent rounded-full blur-2xl -z-30" />
              
              {/* Floating Animation */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, -1, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button
            onClick={() => scrollToSection('about')}
            className="text-white/60 hover:text-white transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </motion.div>
      </section>

      {/* Second Section - Black Background with Interactive Cards */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 lg:px-12 bg-black">
        
        <div className="max-w-6xl w-full">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <TextEffect
              effect={performanceSettings.enableComplexAnimations ? "fuzzy" : "decrypt"}
              text="MY EXPERTISE"
              baseIntensity={0.1}
              hoverIntensity={0.4}
              enableHover={performanceSettings.enableComplexAnimations}
              fontSize="clamp(2rem, 6vw, 3rem)"
              fontWeight={800}
              color="#d4af37"
              animateOn="view"
            />
            <TextEffect
              effect="decrypt"
              text="Building digital experiences with modern technologies"
              speed={35}
              maxIterations={15}
              className="text-lg text-gray-400 mt-4"
              animateOn="view"
              revealDirection="center"
            />
          </motion.div>

          {/* Interactive Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Frontend Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
                <motion.div
                  className="w-16 h-16 mb-4 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Code2 className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Frontend Development</h3>
                <p className="text-gray-400 text-center mb-4">React, Next.js, TypeScript</p>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "90%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Backend Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                <motion.div
                  className="w-16 h-16 mb-4 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Backend Development</h3>
                <p className="text-gray-400 text-center mb-4">Node.js, Python, AWS</p>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1, delay: 0.6 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tools Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                <motion.div
                  className="w-16 h-16 mb-4 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Tools & Design</h3>
                <p className="text-gray-400 text-center mb-4">Git, Docker, Figma</p>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Third Section - Black Background with Interactive Timeline */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 lg:px-12 bg-gradient-to-b from-black to-gray-900/95 overflow-hidden">
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {mounted && [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{ 
                x: Math.random() * 1920,
                y: Math.random() * 1080,
              }}
              animate={{
                x: Math.random() * 1920,
                y: Math.random() * 1080,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl w-full relative">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <TextEffect
              effect={performanceSettings.enableComplexAnimations ? "fuzzy" : "decrypt"}
              text="MY JOURNEY"
              baseIntensity={0.15}
              hoverIntensity={0.6}
              enableHover={performanceSettings.enableComplexAnimations}
              fontSize="clamp(1.8rem, 5vw, 2.5rem)"
              fontWeight={700}
              color="#60a5fa"
              animateOn="view"
            />
            <TextEffect
              effect="decrypt"
              text="From learning to leading - My professional timeline"
              speed={40}
              maxIterations={20}
              className="text-lg text-gray-400 mt-4"
              animateOn="view"
              revealDirection="center"
            />
          </motion.div>

          {/* Interactive Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />

            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Item 1 - Amazon */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-8"
              >
                <motion.div 
                  className="flex-1 text-right"
                  whileHover={{ x: -10 }}
                >
                  <div className="inline-block bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm p-6 rounded-xl border border-orange-400/30 cursor-pointer hover:border-orange-400/60 transition-all">
                    <h3 className="text-xl font-bold text-orange-400 mb-2">Software Development Engineer Intern</h3>
                    <p className="text-gray-400 text-sm mb-2">Amazon • 6 Months</p>
                    <p className="text-gray-300">Worked on scalable cloud solutions and microservices architecture</p>
                  </div>
                </motion.div>
                <motion.div
                  className="w-4 h-4 bg-orange-500 rounded-full relative z-10"
                  whileHover={{ scale: 2 }}
                  transition={{ type: "spring" }}
                >
                  <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping" />
                </motion.div>
                <div className="flex-1" />
              </motion.div>

              {/* Item 2 - Full Stack */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-8"
              >
                <div className="flex-1" />
                <motion.div
                  className="w-4 h-4 bg-blue-500 rounded-full relative z-10"
                  whileHover={{ scale: 2 }}
                  transition={{ type: "spring" }}
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping" />
                </motion.div>
                <motion.div 
                  className="flex-1 text-left"
                  whileHover={{ x: 10 }}
                >
                  <div className="inline-block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm p-6 rounded-xl border border-blue-400/30 cursor-pointer hover:border-blue-400/60 transition-all">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Full Stack Developer</h3>
                    <p className="text-gray-400 text-sm mb-2">Freelance & Projects</p>
                    <p className="text-gray-300">Building end-to-end web applications with modern tech stack</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Item 3 - Learning */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-8"
              >
                <motion.div 
                  className="flex-1 text-right"
                  whileHover={{ x: -10 }}
                >
                  <div className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-6 rounded-xl border border-purple-400/30 cursor-pointer hover:border-purple-400/60 transition-all">
                    <h3 className="text-xl font-bold text-purple-400 mb-2">Computer Science</h3>
                    <p className="text-gray-400 text-sm mb-2">B.Tech • Final Year</p>
                    <p className="text-gray-300">Specializing in AI, Machine Learning and Full Stack Development</p>
                  </div>
                </motion.div>
                <motion.div
                  className="w-4 h-4 bg-purple-500 rounded-full relative z-10"
                  whileHover={{ scale: 2 }}
                  transition={{ type: "spring" }}
                >
                  <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping" />
                </motion.div>
                <div className="flex-1" />
              </motion.div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <TextEffect
              effect="decrypt"
              text="Let's create something amazing together"
              speed={30}
              maxIterations={15}
              className="text-2xl text-gray-300 mb-8"
              animateOn="view"
              revealDirection="center"
            />
            
            <div className="py-6 flex gap-4 justify-center">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r border-2 border-white text-white font-bold rounded-full shadow-xl"
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
              >
                View Projects
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
