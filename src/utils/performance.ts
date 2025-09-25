export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const optimizedVariants = {
  // Reduced motion variants
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  // Full motion variants
  fadeInFull: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  slideUpFull: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  
  scaleInFull: {
    initial: { opacity: 0, scale: 0.8, rotate: -10 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.8, rotate: 10 },
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const getAnimationVariant = (variant: keyof typeof optimizedVariants) => {
  const reducedMotion = prefersReducedMotion();
  
  if (reducedMotion) {
    // Return simplified variants for reduced motion
    switch (variant) {
      case 'fadeInFull':
        return optimizedVariants.fadeIn;
      case 'slideUpFull':
        return optimizedVariants.slideUp;
      case 'scaleInFull':
        return optimizedVariants.scaleIn;
      default:
        return optimizedVariants[variant];
    }
  }
  
  return optimizedVariants[variant];
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const isLowEndDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check memory (if available)
  const memory = (navigator as any).deviceMemory || 4;
  
  // Check connection (if available)
  const connection = (navigator as any).connection;
  const slowConnection = connection && (
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    connection.saveData === true
  );
  
  return cores <= 2 || memory <= 2 || slowConnection;
};

export const getPerformanceSettings = () => {
  const reducedMotion = prefersReducedMotion();
  const lowEndDevice = isLowEndDevice();
  
  return {
    reducedMotion,
    lowEndDevice,
    animationDuration: reducedMotion ? 0.2 : (lowEndDevice ? 0.4 : 0.6),
    enableComplexAnimations: !reducedMotion && !lowEndDevice,
    enableParticles: !lowEndDevice,
    enableBlurEffects: !lowEndDevice,
    videoQuality: lowEndDevice ? 'low' : 'high'
  };
};

export const measurePerformance = (name: string, fn: () => void) => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};
