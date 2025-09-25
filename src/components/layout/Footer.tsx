'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextEffect from '@/components/ui/TextEffect';
import { Github, Linkedin, Mail, Instagram, Heart, Code2, Coffee, ArrowUp } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

const today = new Date();
// Social links data
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/rawattji',
    icon: Github,
    color: '#333',
    hoverColor: '#24292e',
    description: 'Check out my repositories'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/amanrawatmait',
    icon: Linkedin,
    color: '#0077B5',
    hoverColor: '#005885',
    description: 'Connect professionally'
  },
  {
    name: 'Gmail',
    href: 'mailto:amanrawatmait@gmail.com',
    icon: Mail,
    color: '#EA4335',
    hoverColor: '#c23321',
    description: 'Drop me an email'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/amanhikyun',
    icon: Instagram,
    color: '#E4405F',
    hoverColor: '#c13584',
    description: 'Follow my journey'
  }
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-t from-gray-900/95 via-gray-900/90 to-gray-900/95 border-t border-gray-800/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(139,92,246,.05) 35px, rgba(139,92,246,.05) 70px)`,
             }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left Section - About */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  <TextEffect
                    text="Aman Singh Rawat"
                    speed={50}
                    maxIterations={20}
                    className="text-white"
                    animateOn="view"
                    revealDirection="center"
                  />
                </h3>
                <TextEffect
                  text="Software Developer passionate about building elegant solutions with modern technologies. Former Amazon intern with expertise in full-stack development."
                  speed={30}
                  maxIterations={15}
                  className="text-gray-300 leading-relaxed"
                  animateOn="view"
                  revealDirection="start"
                />
              </div>
              
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 backdrop-blur-sm rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">Available for opportunities</span>
              </div>
            </motion.div>

            {/* Center Section - Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                <TextEffect
                  text="Quick Links"
                  speed={40}
                  maxIterations={15}
                  className="text-white"
                  animateOn="view"
                  revealDirection="center"
                />
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {['Home', 'About', 'Experience', 'Projects', 'Resume'].map((link, index) => (
                  <motion.button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-left py-2 hover:translate-x-1"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {link}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right Section - Connect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                <TextEffect
                  text="Let's Connect"
                  speed={40}
                  maxIterations={15}
                  className="text-white"
                  animateOn="view"
                  revealDirection="center"
                />
              </h3>
              
              {/* Social Links Grid */}
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target={social.name === 'Gmail' ? '_self' : '_blank'}
                      rel={social.name === 'Gmail' ? '' : 'noopener noreferrer'}
                      className="group flex items-center gap-3 p-4 bg-gray-800/30 hover:bg-gray-700/50 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: `0 10px 30px ${social.color}20`
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                        style={{ 
                          backgroundColor: `${social.color}20`,
                          borderColor: `${social.color}40`
                        }}
                      >
                        <IconComponent 
                          className="w-5 h-5 transition-colors duration-300"
                          style={{ color: social.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-gray-100 transition-colors">
                          {social.name}
                        </p>
                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                          {social.description}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/50"></div>

        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <span>© {today.getFullYear()} Aman Singh Rawat.</span>
              <span className="flex items-center gap-1">
                Built with <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" /> and <Code2 className="w-4 h-4 text-blue-400" />
              </span>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-gray-500 text-sm"
            >
              <Coffee className="w-4 h-4" />
              <span>Built with Next.js, TypeScript, React Bits & Tailwind CSS</span>
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-600/40 hover:to-blue-600/40 text-purple-200 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Top</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
    </footer>
  );
};
