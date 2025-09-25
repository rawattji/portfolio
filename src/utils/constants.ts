export const RESUME_DATA = {
  personalInfo: {
    name: "Aman Singh Rawat",
    title: "Software Developer",
    email: "amanrawatmait@gmail.com",
    phone: "+91 828795941",
    location: "India",
    linkedin: "linkedin.com/in/amanrawatmait",
    github: "github.com/rawattji",
    portfolio: "https://rawattji.github.io/My_PortFolio"
  },
  summary: "Software Developer with hands-on internship and project experience in full-stack and backend development. Proficient in Java, C++, JavaScript, TypeScript, React.js, Node.js, PostgreSQL, MongoDB, and AWS microservices. Successfully reduced verification overhead by 65% at Amazon, saving $80/sec through scalable backend solutions.",
  experience: [
    {
      company: "Amazon",
      position: "SDE Intern",
      duration: "Jan 2025 - Jun 2025",
      location: "Bengaluru",
      achievements: [
        "Reduced verification overhead by 65%, saving $80/sec",
        "Enhanced workflow consistency by 30%",
        "Improved system resilience by 45%"
      ]
    },
    {
      company: "GeoSolutions India",
      position: "SDE Intern",
      duration: "Sep 2024 - Dec 2024",
      location: "Gurugram",
      achievements: [
        "Delivered 25% revenue growth through advanced visualizations",
        "Improved analytics accuracy by 40%",
        "Reduced deployment time by 30%"
      ]
    },
  ],
  skills: {
    languages: ["Java", "JavaScript", "TypeScript", "Python", "C++"],
    frontend: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "REST APIs"],
    databases: ["PostgreSQL", "MongoDB", "DynamoDB", "Redis"],
    cloud: ["AWS", "Lambda", "SNS", "SQS"],
    tools: ["Git", "Docker", "CI/CD", "Microservices"]
  },
  education: {
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering",
    college: "Maharaja Agrasen Institute of Technology",
    year: "2021 - 2025",
    gpa: "8.8/10"
  },
  projects: [
    "Activity Tracker Chrome Extension",
    "Work Orbit Task Management Platform",
    "Sure Reads Book Search App",
    "E-Commerce Website (Rush Fashion)"
  ]
};

export const ANIMATION_CONFIG = {
  fadeIn: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  stagger: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
};

export const COMMON_CLASSES = {
  glassCard: "bg-black/40 backdrop-blur-xl border-gray-400/20",
  spotlightColor: "rgba(34, 197, 94, 0.1)",
  sectionContainer: "relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-black to-gray-900/90",
  container: "relative z-10 container mx-auto px-6 lg:px-12"
};

export const RESUME_TABS = [
  { id: 'overview', label: 'Overview', icon: 'FileText' },
  { id: 'experience', label: 'Experience', icon: 'Briefcase' },
  { id: 'skills', label: 'Skills', icon: 'Code' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' }
];

