export type AvatarState = 
  | 'idle-right' 
  | 'idle-front' 
  | 'formal' 
  | 'creative' 
  | 'namaste';

export interface AvatarStateConfig {
  state: AvatarState;
  svgPath: string;
  transitionDuration?: number;
}

export type SectionId = 'home' | 'about' | 'experience' | 'projects' | 'resume';

export interface Section {
  id: SectionId;
  title: string;
  avatarState: AvatarState;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  logo: string;
  position: string;
  duration: string;
  description: string;
  technologies?: string[];
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'other';
  proficiency: number; // 0-100
}

export interface NavItem {
  id: SectionId;
  label: string;
  href: string;
}

export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  glass: {
    background: string;
    border: string;
    shadow: string;
  };
}