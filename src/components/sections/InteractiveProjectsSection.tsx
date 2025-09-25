'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextEffect from '@/components/ui/TextEffect';
import { Github, ExternalLink, Play, X, Tag, Calendar, User, Code, Zap } from 'lucide-react';

// Project data for 5 projects
const projects = [
  {
    id: 1,
    title: 'Activity Tracker',
    subtitle: 'Chrome Extension',
    description: 'Developed a Chrome extension to monitor site visits, enforce usage-based timeouts, and block distractions, improving productivity. Built Rails backend with REST APIs, storing user activity efficiently in MongoDB and local storage for fast retrieval.',
    longDescription: 'A comprehensive productivity solution that helps users manage their digital habits. Features include real-time website monitoring, customizable timeout controls, distraction blocking mechanisms, and detailed activity analytics. The extension integrates seamlessly with a Ruby on Rails backend that provides secure data synchronization across devices.',
    image: '/images/chrome-extension.png',
    technologies: ['React.js', 'Ruby on Rails', 'MongoDB', 'Chrome Extension API'],
    githubUrl: 'https://github.com/rawattji/activity_tracker',
    demoUrl: 'https://drive.google.com/file/d/1dCANm1o_LkXPsLCX89FPD3Z6AS1x_EZo/view?usp=drivesdk',
    category: 'Browser Extension',
    color: '#4285f4',
    gradient: 'from-blue-600 to-blue-800',
    year: '2024'
  },
  {
    id: 2,
    title: 'Work Orbit',
    subtitle: 'Task Management Platform',
    description: 'Engineered backend for task tracking platform with OTP login, email triggers, workspace-user mapping, and hierarchical task management. Designed multi-tenant responsive UI with role-based permissions architecture.',
    longDescription: 'A sophisticated task management platform designed for modern teams. Features include secure OTP-based authentication, automated email notifications, flexible workspace organization, and advanced role-based access control. The system supports hierarchical task structures and real-time collaboration.',
    image: '/images/WorkOrbit.png',
    technologies: ['React.js', 'Vite', 'TypeScript', 'Node.js', 'Tailwind', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/rawattji/WorkOrbit',
    category: 'Task Management Platform',
    color: '#8b5cf6',
    gradient: 'from-purple-600 to-purple-800',
    year: '2024'
  },
  {
    id: 3,
    title: 'Sure Reads',
    subtitle: 'Book Discovery App',
    description: 'Built Sure Reads, a React.js single-page app that searches and displays books using a paginated external API. Implemented global state with Redux to cache paginated pages and manage loading states.',
    longDescription: 'An elegant book discovery application that helps users find their next great read. Built with performance in mind, featuring smart caching mechanisms, infinite scroll pagination, and advanced search filters. The Redux-powered state management ensures smooth user experience even with large datasets.',
    image: '/images/sureReads.png',
    technologies: ['React.js', 'Redux', 'External API', 'Pagination'],
    githubUrl: 'https://github.com/rawattji/sure_reads',
    liveUrl: 'https://rawattji.github.io/sure_reads',
    category: 'Book Search App',
    color: '#10b981',
    gradient: 'from-emerald-600 to-emerald-800',
    year: '2023'
  },
  {
    id: 4,
    title: 'Rush Fashion',
    subtitle: 'E-Commerce Website',
    description: 'Created SRS, Developed a Live website for the client, investing 50+ hours while guiding and leading a team under the supervision of MHTECHIN. Built on WordPress with custom HTML, CSS, JavaScript, and PHP components.',
    longDescription: 'A full-featured e-commerce solution for fashion retail. Led a development team to create a comprehensive online store with custom functionality, payment integration, inventory management, and responsive design. Collaborated closely with stakeholders to deliver a solution that exceeded client expectations.',
    image: '/images/rushFashion.png',
    technologies: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'PHP'],
    liveUrl: 'https://RushFashions.com/',
    category: 'E-Commerce Website',
    color: '#ef4444',
    gradient: 'from-red-600 to-red-800',
    year: '2023'
  },
  {
    id: 5,
    title: 'Scroll Day&Night',
    subtitle: 'Animation Showcase',
    description: 'Created & Developed a website using Elementor with HTML tags, integrated JavaScript, and custom CSS. Implemented animated scroll effects transitioning from day to night, simulating sunrise and sunset.',
    longDescription: 'An artistic web experience that demonstrates advanced CSS animations and scroll-based interactions. The site features a beautiful day-to-night transition that responds to user scroll, creating an immersive narrative experience. Built with performance optimization and cross-browser compatibility in mind.',
    image: '/images/scrollDay.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Elementor', 'Animation'],
    githubUrl: 'https://github.com/rawattji/Scroll-Day',
    liveUrl: 'https://rawattji.github.io/Scroll-Day/',
    category: 'Animation Showcase',
    color: '#f97316',
    gradient: 'from-orange-600 to-orange-800',
    year: '2023'
  }
];

export const InteractiveProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setTimeout(() => setIsModalOpen(true), 100);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section 
      id="projects" 
      className="relative min-h-screen pt-0 pb-20 overflow-hidden bg-gradient-to-b from-olive-900/95 via-gray-900/90 to-black"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(139,92,246,.1) 35px, rgba(139,92,246,.1) 70px)`,
             }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 mt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            <TextEffect
              text="Featured Projects"
              speed={70}
              maxIterations={25}
              className="text-white"
              animateOn="view"
              revealDirection="center"
            />
          </h2>
          <TextEffect
            text="Showcasing innovative solutions and technical expertise through real-world applications"
            speed={50}
            maxIterations={20}
            className="text-xl text-gray-300/90 max-w-3xl mx-auto mb-8"
            animateOn="view"
            revealDirection="start"
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group cursor-pointer ${
                index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => openProjectModal(project)}
            >
              <div className="relative h-80 sm:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 transition-all duration-500 hover:scale-[1.02] hover:border-gray-600/70">
                
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ${
                    hoveredProject === project.id ? 'opacity-90' : 'opacity-70'
                  }`} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="mb-4"
                  >
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium border"
                      style={{
                        color: project.color,
                        backgroundColor: `${project.color}20`,
                        borderColor: `${project.color}40`
                      }}
                    >
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Title & Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-gray-100 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 font-medium">
                      {project.subtitle}
                    </p>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3"
                  >
                    {project.description}
                  </motion.p>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-800/60 text-gray-300 rounded-md text-xs border border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800/60 text-gray-400 rounded-md text-xs border border-gray-700/50">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </motion.div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: `${project.color}10` }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-gray-600/30">
                    {project.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/rawattji"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-600/40 hover:to-blue-600/40 rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
          >
            <Github className="w-6 h-6 text-purple-400" />
            <TextEffect
              text="More projects available on GitHub"
              speed={30}
              maxIterations={12}
              className="text-purple-200 text-lg font-medium"
              animateOn="view"
              revealDirection="center"
            />
            <ExternalLink className="w-5 h-5 text-purple-400" />
          </a>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeProjectModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl sm:rounded-2xl border border-gray-600/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 hover:text-red-200 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Content */}
              <div className="p-4 sm:p-8">
                {/* Project Header */}
                <div className="flex flex-col xl:flex-row gap-8 mb-8">
                  {/* Project Image */}
                  <div className="flex-shrink-0 w-full xl:w-[500px]">
                    <div className="relative w-full h-[250px] sm:h-[300px] xl:h-[350px] rounded-xl overflow-hidden border border-gray-600/30">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`} />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="flex-1">
                    <div className="mb-6">
                      <div 
                        className="inline-block px-4 py-2 rounded-full text-sm font-medium border mb-4"
                        style={{
                          color: selectedProject.color,
                          backgroundColor: `${selectedProject.color}20`,
                          borderColor: `${selectedProject.color}40`
                        }}
                      >
                        {selectedProject.category} • {selectedProject.year}
                      </div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {selectedProject.title}
                      </h2>
                      <p className="text-lg sm:text-xl text-gray-400 mb-4">
                        {selectedProject.subtitle}
                      </p>
                    </div>

                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.technologies.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-xl text-sm border border-gray-600/30 hover:bg-gray-600/50 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl font-medium transition-all duration-300 border border-gray-600/30 hover:scale-105"
                        >
                          <Github className="w-5 h-5" />
                          View Code
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 border hover:scale-105"
                          style={{
                            backgroundColor: `${selectedProject.color}40`,
                            borderColor: `${selectedProject.color}60`
                          }}
                        >
                          <ExternalLink className="w-5 h-5" />
                          Live Demo
                        </a>
                      )}
                      {selectedProject.demoUrl && (
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-blue-600/40 hover:bg-blue-600/50 text-blue-200 hover:text-white rounded-xl font-medium transition-all duration-300 border border-blue-500/30 hover:scale-105"
                        >
                          <Play className="w-5 h-5" />
                          Video Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
