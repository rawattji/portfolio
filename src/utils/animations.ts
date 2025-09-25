import { motion } from 'framer-motion';

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionButton = motion.button;
export const MotionSpan = motion.span;

export const getMotionProps = (variant: typeof fadeInUp | typeof slideUp, delay = 0) => ({
  initial: variant.initial,
  whileInView: variant.animate,
  viewport: { once: true },
  transition: { ...variant.transition, delay }
});

export const scrollAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};
