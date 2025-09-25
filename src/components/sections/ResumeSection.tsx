import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/common/SpotlightCard';
import TextEffect from '@/components/ui/TextEffect';
import { RESUME_DATA, RESUME_TABS, COMMON_CLASSES } from '@/utils/constants';
import { fadeInUp, getMotionProps } from '@/utils/animations';
import { Download, FileText, Maximize2, X, Mail, Phone, MapPin, Linkedin, Github, Globe, Award, Briefcase, GraduationCap, Code, Star, AlertCircle, ExternalLink } from 'lucide-react';

export const ResumeSection: React.FC = React.memo(() => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [pdfError, setPdfError] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  
  const resumePdfUrl = '/resume.pdf'

  const tabs = useMemo(() => RESUME_TABS.map(tab => ({
    ...tab,
    icon: tab.icon === 'FileText' ? FileText : 
          tab.icon === 'Briefcase' ? Briefcase :
          tab.icon === 'Code' ? Code : GraduationCap
  })), []);

  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setPdfError(false);
      setPdfLoaded(false);
    }
  }, [isFullscreen]);

  const stats = useMemo(() => [
    { label: 'Internships', value: '3+', icon: Briefcase, color: 'text-blue-400' },
    { label: 'Projects', value: '6+', icon: Code, color: 'text-purple-400' },
    { label: 'Impact', value: '65%', icon: Award, color: 'text-green-400' }
  ], []);

  useEffect(() => {
    if (isFullscreen) {
      setPdfError(false);
      setPdfLoaded(false);
      
      const timeout = setTimeout(() => {
        setPdfLoaded(true);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [isFullscreen]);

  return (
    <section 
      id="resume" 
      className={COMMON_CLASSES.sectionContainer}
    >

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(34,197,94,.1) 35px, rgba(34,197,94,.1) 70px)`,
             }} />
      </div>

      <div className={COMMON_CLASSES.container}>
        <motion.div
          {...getMotionProps(fadeInUp)}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            <TextEffect
              text="Resume"
              effect="decrypt"
              speed={70}
              maxIterations={25}
              className="text-white"
              animateOn="view"
              revealDirection="center"
            />
          </h2>
          <TextEffect
            text="Complete professional profile showcasing skills, experience, and achievements"
            effect="decrypt"
            speed={50}
            maxIterations={20}
            className="text-xl text-gray-300/90 max-w-3xl mx-auto"
            animateOn="view"
            revealDirection="start"
          />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-8 p-4 bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700/30"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-green-400" />
              <span className="text-white font-medium">{RESUME_DATA.personalInfo.name} - {RESUME_DATA.personalInfo.title}</span>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                onClick={handleFullscreenToggle}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 border border-gray-600/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Fullscreen</span>
              </motion.button>
              
              <motion.a
                href={resumePdfUrl}
                download={`${RESUME_DATA.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`}
                className="flex items-center gap-2 px-4 py-2 bg-green-600/30 hover:bg-green-600/40 text-green-200 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 border border-green-500/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-green-600/30 text-green-200 border border-green-500/50'
                      : 'bg-gray-800/30 text-gray-400 hover:text-gray-200 hover:bg-gray-700/30 border border-gray-700/30'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </motion.div>

          <div className="min-h-[600px]">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-1">
                  <SpotlightCard
                    className={`h-full ${COMMON_CLASSES.glassCard}`}
                    spotlightColor={COMMON_CLASSES.spotlightColor}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-400" />
                        Contact Info
                      </h3>
                      
                      <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{RESUME_DATA.personalInfo.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{RESUME_DATA.personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{RESUME_DATA.personalInfo.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Linkedin className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-xs">{RESUME_DATA.personalInfo.linkedin}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Github className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-xs">{RESUME_DATA.personalInfo.github}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-xs">{RESUME_DATA.personalInfo.portfolio}</span>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <SpotlightCard
                    className={COMMON_CLASSES.glassCard}
                    spotlightColor={COMMON_CLASSES.spotlightColor}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Professional Summary</h3>
                      <TextEffect
                        text={RESUME_DATA.summary}
                        effect="decrypt"
                        speed={25}
                        maxIterations={12}
                        className="text-gray-300 leading-relaxed"
                        animateOn="view"
                        revealDirection="start"
                      />
                    </div>
                  </SpotlightCard>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat, index) => {
                      const IconComponent = stat.icon;
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-gray-800/40 backdrop-blur-md rounded-lg p-4 text-center border border-gray-700/30"
                        >
                          <IconComponent className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                          <div className="text-gray-400 text-sm">{stat.label}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {RESUME_DATA.experience.map((exp, index) => (
                  <SpotlightCard
                    key={index}
                    className="bg-black/40 backdrop-blur-xl border-gray-400/20"
                    spotlightColor="rgba(34, 197, 94, 0.1)"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                          <p className="text-green-400 font-semibold">{exp.company}</p>
                        </div>
                        <div className="text-gray-400 text-sm mt-2 md:mt-0">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div>{exp.duration}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <Star className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {Object.entries(RESUME_DATA.skills).map(([category, skills], index) => (
                  <SpotlightCard
                    key={category}
                    className="bg-black/40 backdrop-blur-xl border-gray-400/20"
                    spotlightColor="rgba(34, 197, 94, 0.1)"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-4 capitalize flex items-center gap-2">
                        <Code className="w-5 h-5 text-green-400" />
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <SpotlightCard
                  className="bg-black/40 backdrop-blur-xl border-gray-400/20"
                  spotlightColor="rgba(34, 197, 94, 0.1)"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-green-400" />
                      Education
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-green-400">{RESUME_DATA.education.degree}</h4>
                        <p className="text-gray-300">{RESUME_DATA.education.field}</p>
                        <p className="text-gray-400 text-sm">{RESUME_DATA.education.college}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-400 text-sm">Class of {RESUME_DATA.education.year}</span>
                          <span className="text-green-400 font-medium">GPA: {RESUME_DATA.education.gpa}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>

                <SpotlightCard
                  className="bg-black/40 backdrop-blur-xl border-gray-400/20"
                  spotlightColor="rgba(34, 197, 94, 0.1)"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5 text-green-400" />
                      Key Projects
                    </h3>
                    <div className="space-y-3">
                      {RESUME_DATA.projects.map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                          <span className="text-gray-300">{project}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
        </motion.div>
      </div>

      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative w-full max-w-6xl h-[90vh] bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="w-full h-full relative bg-gray-100">
              {/* PDF Viewer */}
              {!pdfError ? (
                <>
                  <object
                    data={resumePdfUrl}
                    type="application/pdf"
                    className="w-full h-full border-0"
                    style={{ minHeight: '100%' }}
                  >
                    <embed
                      src={resumePdfUrl}
                      type="application/pdf"
                      className="w-full h-full border-0"
                      style={{ minHeight: '100%' }}
                    />
                  </object>
                  
                  {!pdfLoaded && (
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-500 mb-3"></div>
                        <p className="text-base font-medium text-gray-700">Loading PDF...</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center p-8 max-w-md">
                    <AlertCircle className="w-24 h-24 text-red-500/60 mb-6 mx-auto" />
                    <p className="text-xl font-medium text-gray-700 mb-4">Unable to Display PDF</p>
                    <p className="text-gray-500 mb-6">Your browser might not support inline PDF viewing.</p>
                    
                    <div className="space-y-3">
                      <a
                        href={resumePdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors w-full justify-center"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Open in New Tab
                      </a>
                      
                      <a
                        href={resumePdfUrl}
                        download={`${RESUME_DATA.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors w-full justify-center"
                      >
                        <Download className="w-5 h-5" />
                        Download Resume
                      </a>
                      
                      <button
                        onClick={() => {
                          setPdfError(false);
                          setPdfLoaded(false);
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors w-full justify-center"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
});

ResumeSection.displayName = 'ResumeSection';
