'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/common/SpotlightCard';
import TextEffect from '@/components/ui/TextEffect';
import { Calendar, MapPin, Building2, Code, Rocket, Trophy, Target } from 'lucide-react';
import { FaAmazon, FaAws } from 'react-icons/fa';

// Professional Summary
const professionalSummary = `Software Developer with hands-on internship and project experience in full-stack and backend development. Proficient in Java, C++, JavaScript, TypeScript, React.js, Node.js, PostgreSQL, MongoDB, and AWS microservices. Successfully reduced verification overhead by 65% at Amazon, saving $80/sec through scalable backend solutions. Experienced in building Web GIS defense applications and productivity tools, leveraging cloud-native architectures, REST APIs, and responsive UI frameworks. Strong foundation in DSA, OOP, Agile, and CI/CD pipelines. Targeting roles as Software Developer, Full Stack Developer.`;

// Real experience data
const experiences = [
  {
    id: '1',
    company: 'Amazon',
    location: 'Bengaluru',
    position: 'SDE Intern',
    duration: '01/2025 - 06/2025',
    icon: FaAmazon,
    iconColor: '#FF9900',
    spotlightColor: 'rgba(255, 153, 0, 0.15)',
    technologies: ['Java', 'AWS SNS', 'SQS', 'Lambda', 'Docker', 'Microservices', 'CI/CD', 'System Design'],
    achievements: [
      'Engineered a document difference evaluator that cut verification overhead by 65%, saving $80/sec and significantly reducing operational costs.',
      'Implemented region-aware database routing across global microservices, enhancing workflow consistency by 30% and reducing seller pipeline latency worldwide.',
      'Migrated legacy modules to Java-based AWS microservices using Lambda, SNS, and SQS, enhancing system resilience by 45% and accelerating deployment cycles.',
      'Built and deployed Carnival Monitor, providing bake-time insights post-deployment and ensuring operational visibility when the team is offline.',
      'Directed complete testing cycles and built real-time metric dashboards, enhancing operational transparency and reducing verification errors by 40%.',
      'Authored API documentation and operational run books, shortening onboarding time by 35% and improving troubleshooting efficiency across teams.'
    ]
  },
  {
    id: '2',
    company: 'GeoSolutions India',
    location: 'Gurugram',
    position: 'SDE Intern',
    duration: '09/2024 - 12/2024',
    icon: Building2,
    iconColor: '#4CAF50',
    spotlightColor: 'rgba(76, 175, 80, 0.15)',
    technologies: ['React.js', 'Node.js', 'TypeScript', 'Web GIS', 'Cesium JS', 'OpenLayers'],
    achievements: [
      'Directed a defense-focused Web GIS initiative, delivering 25% revenue growth through advanced 2D/3D Cesium JS and OpenLayers visualizations.',
      'Optimized processing of large-scale geospatial datasets (vector/raster), enabling real-time tactical overlays and improving mission-critical analytics accuracy by 40%.',
      'Authored integration workflows and standardized API playbooks, reducing future GIS deployment time by 30% and ensuring seamless scalability.'
    ]
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section 
      id="experience" 
      className="relative min-h-screen pt-0 pb-20 overflow-hidden bg-gradient-to-b from-gray-900/90 via-gray-900/90 via-olive-900/80 to-olive-900/95"
    >

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212,175,55,.1) 35px, rgba(212,175,55,.1) 70px)`,
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
              text="Experience"
              speed={70}
              maxIterations={25}
              className="text-white"
              animateOn="view"
              revealDirection="center"
            />
          </h2>
          <TextEffect
            text="Professional journey building scalable solutions and impactful technology"
            speed={50}
            maxIterations={20}
            className="text-xl text-gray-300/90 max-w-3xl mx-auto"
            animateOn="view"
            revealDirection="start"
          />
        </motion.div>

        {/* Professional Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <SpotlightCard 
            className="bg-black/30 backdrop-blur-lg border-olive-400/30 hover:border-olive-400/50"
            spotlightColor="rgba(212, 175, 55, 0.1)"
          >
            <div className="p-8 lg:p-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  <TextEffect
                    text="Professional Summary"
                    speed={40}
                    maxIterations={15}
                    className="text-white"
                    animateOn="view"
                    revealDirection="center"
                  />
                </h3>
              </div>
              
              <TextEffect
                text={professionalSummary}
                speed={25}
                maxIterations={15}
                className="text-gray-200/90 text-lg leading-relaxed"
                animateOn="view"
                revealDirection="start"
              />
              
              <div className="mt-8 flex justify-center">
                <motion.div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-full border border-blue-500/30">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-200 font-medium">
                    <TextEffect
                      text="Software Developer | Full Stack Developer"
                      speed={30}
                      maxIterations={10}
                      className="text-blue-200"
                      animateOn="view"
                      revealDirection="center"
                    />
                  </span>
                </motion.div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Smooth Experience Cards with Custom Scroll */}
        <div className="relative flex justify-center">
          <div className="w-full max-w-5xl space-y-32 px-6">
            {experiences.map((exp, index) => {
              const IconComponent = exp.icon;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    ease: [0.25, 0.25, 0.25, 0.75]
                  }}
                  className="w-full experience-card"
                >
                  <motion.div
                    whileInView={{ 
                      scale: [0.95, 1],
                      rotateX: [10, 0]
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ 
                      duration: 1,
                      ease: "easeOut"
                    }}
                    className="w-full perspective-1000"
                  >
                    <SpotlightCard
                      className="w-full bg-black/40 experience-backdrop border-olive-400/20 hover:border-olive-400/40 transition-all duration-500 will-change-transform transform-gpu"
                      spotlightColor={exp.spotlightColor}
                    >
                    <div className="p-8 lg:p-12">
                      {/* Header */}
                      <div className="flex items-start gap-6 mb-8">
                        {/* Company Icon */}
                        <div 
                          className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center shadow-2xl border border-gray-400/20"
                          style={{ backgroundColor: `${exp.iconColor}20`, borderColor: `${exp.iconColor}40` }}
                        >
                          <IconComponent 
                            className="w-12 h-12 lg:w-14 lg:h-14" 
                            style={{ color: exp.iconColor }}
                          />
                        </div>
                        
                        {/* Company Info */}
                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div>
                              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                <TextEffect
                                  text={exp.position}
                                  speed={40}
                                  maxIterations={12}
                                  className="text-white"
                                  animateOn="view"
                                  revealDirection="start"
                                />
                              </h3>
                              <div className="flex items-center gap-3 mb-2">
                                <Building2 className="w-5 h-5" style={{ color: exp.iconColor }} />
                                <span className="text-xl font-semibold" style={{ color: exp.iconColor }}>
                                  {exp.company}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2 text-gray-300">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">{exp.duration}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-300">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium">{exp.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                          <Code className="w-5 h-5" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {exp.technologies.map((tech) => (
                            <motion.span
                              key={tech}
                              whileHover={{ scale: 1.1 }}
                              className="px-4 py-2 bg-gradient-to-r from-olive-800/50 to-olive-700/50 text-olive-200 rounded-full text-sm font-medium border border-olive-600/30 shadow-lg"
                              style={{ boxShadow: `0 0 20px ${exp.iconColor}20` }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                          <Trophy className="w-5 h-5" />
                          Key Achievements
                        </h4>
                        <div className="space-y-4">
                          {exp.achievements.map((achievement, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -30, scale: 0.95 }}
                              whileInView={{ opacity: 1, x: 0, scale: 1 }}
                              viewport={{ once: true, amount: 0.8 }}
                              transition={{ 
                                duration: 0.6, 
                                delay: idx * 0.15,
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                              className="flex items-start gap-3 group transform-gpu"
                            >
                              <div 
                                className="flex-shrink-0 w-2 h-2 rounded-full mt-2 group-hover:scale-125 transition-transform"
                                style={{ backgroundColor: exp.iconColor }}
                              />
                              <TextEffect
                                text={achievement}
                                speed={20}
                                maxIterations={8}
                                className="text-gray-300 leading-relaxed"
                                animateOn="view"
                                revealDirection="start"
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-olive-600/30 to-olive-700/30 rounded-full border border-olive-500/30">
            <Rocket className="w-6 h-6 text-olive-400" />
            <TextEffect
              text="Ready to tackle new challenges and make impact"
              speed={30}
              maxIterations={12}
              className="text-olive-200 text-lg font-medium"
              animateOn="view"
              revealDirection="center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
