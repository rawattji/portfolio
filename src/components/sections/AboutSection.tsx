'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/common/SpotlightCard';
import TextEffect from '@/components/ui/TextEffect';
import { SiCplusplus, SiTypescript, SiReact, SiRedux, SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiAmazondynamodb, SiRedis, SiGit,
  SiNextdotjs, SiTailwindcss, SiPython, SiDocker, SiVercel, SiFigma } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { DiJava, DiJavascript1 } from 'react-icons/di';
import { FaAws, FaGithub } from 'react-icons/fa';

// Custom text component for OOPs and DSA
const TextIcon = ({ text, color }: { text: string; color: string }) => (
  <div 
    className="text-4xl font-bold flex items-center justify-center" 
    style={{ color }}
  >
    {text}
  </div>
);

const techStackIcons = [
  { icon: SiCplusplus, name: 'C++', color: '#00599C' },
  { icon: DiJava, name: 'Java', color: '#ED8B00' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { icon: DiJavascript1, name: 'JavaScript', color: '#F7DF1E' },
  { icon: FaAws, name: 'AWS', color: '#FF9900' },
  { icon: () => <TextIcon text="OOP" color="#4CAF50" />, name: 'OOPs', color: '#4CAF50' },
  { icon: () => <TextIcon text="DSA" color="#FF5722" />, name: 'DSA', color: '#FF5722' },
  { icon: SiReact, name: 'React', color: '#61DAFB' },
  { icon: SiRedux, name: 'Redux', color: '#764ABC' },
  { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  { icon: SiExpress, name: 'Express', color: '#000000' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: '#336791' },
  { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
  { icon: SiAmazondynamodb, name: 'DynamoDB', color: '#FF9900' },
  { icon: SiRedis, name: 'Redis', color: '#DC382D' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
  { icon: SiPython, name: 'Python', color: '#3776AB' },
  { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' }
];

// Tools Icons - Second Row
const toolsIcons = [
  { icon: VscCode, name: 'VS Code', color: '#007ACC' },
  { icon: SiGit, name: 'Git', color: '#F05032' },
  { icon: FaGithub, name: 'GitHub', color: '#181717' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { icon: SiVercel, name: 'Vercel', color: '#000000' },
  { icon: SiFigma, name: 'Figma', color: '#F24E1E' }
];

// Skills data for SpotlightCards
const skillsData = [
  {
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces with modern frameworks",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    spotlightColor: "rgba(99, 179, 237, 0.15)"
  },
  {
    title: "Backend Development",
    description: "Developing scalable server-side applications and APIs",
    technologies: ["Node.js", "Express", "Python", "RESTful APIs"],
    spotlightColor: "rgba(76, 175, 80, 0.15)"
  },
  {
    title: "Database Management",
    description: "Designing and optimizing database solutions for various use cases",
    technologies: ["PostgreSQL", "MongoDB", "DynamoDB", "Redis"],
    spotlightColor: "rgba(255, 193, 7, 0.15)"
  },
  {
    title: "Cloud & DevOps",
    description: "Deploying and managing applications in cloud environments",
    technologies: ["AWS", "Docker", "CI/CD", "Vercel"],
    spotlightColor: "rgba(255, 87, 34, 0.15)"
  }
];

// Infinite scroll component for tech icons
const InfiniteScrollIcons = ({ icons, direction = 'left', speed = 20 }: {
  icons: typeof techStackIcons,
  direction?: 'left' | 'right',
  speed?: number
}) => {
  // Triple the icons for seamless infinite scroll
  const tripleIcons = [...icons, ...icons, ...icons];

  return (
    <div className="relative overflow-hidden py-6">
      <motion.div 
        className="flex items-center gap-8 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -33.33 * icons.length * 4] : [-33.33 * icons.length * 4, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{
          width: `${tripleIcons.length * 120}px`
        }}
      >
        {tripleIcons.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <motion.div 
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center justify-center p-4 min-w-[100px]"
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div 
                className="text-6xl mb-2 transition-all duration-300 hover:drop-shadow-lg"
                style={{ color: tech.color }}
              >
                <IconComponent />
              </div>
              <span className="text-sm text-white/70 font-medium">{tech.name}</span>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Fade out edges */}
      <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-olive-700 to-transparent z-10" />
      <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-olive-700 to-transparent z-10" />
    </div>
  );
};

export const AboutSection: React.FC = () => {
  return (
    <>
      
      <section 
        id="about" 
        className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-gray-900/95 via-gray-900/90 via-olive-900/80 to-olive-900/95"
      >

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
             }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            <TextEffect
              text="About Me"
              speed={50}
              maxIterations={15}
              className="text-white"
              animateOn="view"
              revealDirection="center"
            />
          </h2>
          <TextEffect
            text="Passionate about building scalable applications and creating exceptional user experiences"
            speed={40}
            maxIterations={12}
            className="text-xl text-olive-200/80 max-w-2xl mx-auto"
            animateOn="view"
            revealDirection="start"
          />
        </motion.div>

        {/* Skills Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <SpotlightCard 
                className="h-full bg-black/20 backdrop-blur-md border-olive-400/20 hover:border-olive-400/40 transition-all duration-300"
                spotlightColor={skill.spotlightColor}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{skill.title}</h3>
                  <p className="text-olive-200/80 text-sm leading-relaxed mb-4">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-olive-600/30 text-olive-200 text-xs rounded-full border border-olive-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Technologies Infinite Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">
              <TextEffect
                text="Tech Stack"
                speed={60}
                maxIterations={18}
                className="text-white"
                animateOn="view"
                revealDirection="center"
              />
            </h3>
            <p className="text-olive-300/70 text-sm">
              Technologies I work with daily
            </p>
          </div>
          
          <InfiniteScrollIcons 
            icons={techStackIcons} 
            direction="left" 
            speed={25}
          />
        </motion.div>

        {/* Tools Infinite Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">
              <TextEffect
                text="Development Tools"
                speed={60}
                maxIterations={18}
                className="text-white"
                animateOn="view"
                revealDirection="center"
              />
            </h3>
            <p className="text-olive-300/70 text-sm">
              My development ecosystem
            </p>
          </div>
          
          <InfiniteScrollIcons 
            icons={toolsIcons} 
            direction="right" 
            speed={15}
          />
        </motion.div>

        {/* Bio Section with SpotlightCard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <SpotlightCard 
            className="bg-black/30 backdrop-blur-lg border-olive-400/30 hover:border-olive-400/50"
            spotlightColor="rgba(212, 175, 55, 0.1)"
          >
            <div className="p-8 lg:p-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  <TextEffect
                    text="Full Stack Developer & Problem Solver"
                    speed={20}
                    maxIterations={8}
                    className="text-white"
                    animateOn="view"
                    revealDirection="center"
                  />
                </h3>
              </div>
              
              <div className="space-y-4 text-olive-100/90 leading-relaxed">
                <TextEffect
                  text="I'm a passionate Full Stack Developer with experience in building modern, scalable web applications. My journey started with curiosity about how things work on the internet, and it has evolved into a deep appreciation for clean code, user experience, and innovative solutions."
                  speed={15}
                  maxIterations={6}
                  className="text-olive-100/90 text-lg"
                  animateOn="view"
                  revealDirection="start"
                />
                
                <TextEffect
                  text="When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and staying updated with the ever-evolving tech landscape."
                  speed={15}
                  maxIterations={6}
                  className="text-olive-100/90 text-lg"
                  animateOn="view"
                  revealDirection="end"
                />
              </div>
              
              <div className="mt-8 text-center">
                <motion.div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-olive-600/50 to-olive-700/50 rounded-full border border-olive-500/30">
                  <span className="text-olive-200 font-medium">
                    <TextEffect
                      text="Always ready for new challenges"
                      speed={25}
                      maxIterations={8}
                      className="text-olive-200"
                      animateOn="view"
                      revealDirection="center"
                    />
                  </span>
                </motion.div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
    </>
  );
};
