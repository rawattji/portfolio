import React from 'react';
import { motion } from 'framer-motion';

interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  href?: string;
  title?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 120,
  direction = 'left',
  logoHeight = 48,
  gap = 40,
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo carousel'
}) => {
  const duplicatedLogos = [...logos, ...logos];
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <div 
      className="relative overflow-hidden"
      style={{ height: logoHeight + 20 }}
      aria-label={ariaLabel}
    >
      {fadeOut && (
        <>
          <div 
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: '60px',
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: '60px',
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`
            }}
          />
        </>
      )}

      <motion.div
        className="flex items-center"
        style={{ gap: `${gap}px` }}
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          x: {
            duration: isPaused ? 0 : speed,
            repeat: Infinity,
            ease: 'linear'
          }
        }}
        onHoverStart={() => {
          if (pauseOnHover) {
            setIsPaused(true);
          }
        }}
        onHoverEnd={() => {
          if (pauseOnHover) {
            setIsPaused(false);
          }
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <motion.div
            key={`${logo.title || logo.alt || index}-${index}`}
            className="flex items-center justify-center"
            style={{ height: logoHeight }}
            whileHover={scaleOnHover ? { scale: 1.1 } : {}}
            transition={{ duration: 0.2 }}
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
                style={{ height: logoHeight }}
              >
                {logo.node || (
                  logo.src ? (
                    <img
                      src={logo.src}
                      alt={logo.alt || logo.title || ''}
                      style={{ height: logoHeight }}
                      className="object-contain"
                    />
                  ) : null
                )}
              </a>
            ) : (
              <div className="flex items-center justify-center" style={{ height: logoHeight }}>
                {logo.node || (
                  logo.src ? (
                    <img
                      src={logo.src}
                      alt={logo.alt || logo.title || ''}
                      style={{ height: logoHeight }}
                      className="object-contain"
                    />
                  ) : null
                )}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoLoop;