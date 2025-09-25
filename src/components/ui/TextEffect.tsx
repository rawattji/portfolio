import React, { useState, useEffect, useRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface TextEffectProps extends HTMLMotionProps<'span'> {
  text?: string;
  children?: React.ReactNode;
  effect?: 'decrypt' | 'fuzzy' | 'typewriter';
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover' | 'both' | 'load';
  fontSize?: number | string;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
}

const TextEffect: React.FC<TextEffectProps> = ({
  text,
  children,
  effect = 'decrypt',
  speed = 50,
  maxIterations = 15,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  fontSize = 'clamp(2rem, 8vw, 8rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text || (children ? String(children) : ''));
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isFuzzyReady, setIsFuzzyReady] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Decrypt effect logic
  const decryptText = () => {
    const currentText = text || (children ? String(children) : '');
    if (isAnimating || (animateOn === 'view' && hasAnimated)) return;
    
    setIsAnimating(true);
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        currentText
          .split('')
          .map((char, index) => {
            if (revealDirection === 'center') {
              const center = currentText.length / 2;
              const distanceFromCenter = Math.abs(index - center);
              if (distanceFromCenter > iteration / 2) {
                return char;
              }
            } else if (revealDirection === 'start') {
              if (index < iteration) {
                return char;
              }
            } else if (revealDirection === 'end') {
              if (index >= currentText.length - iteration) {
                return char;
              }
            }

            if (char === ' ') return ' ';
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(currentText);
        setIsAnimating(false);
        if (animateOn === 'view') {
          setHasAnimated(true);
        }
      }

      iteration++;
    }, speed);
  };

  // Fuzzy effect logic (optimized version)
  useEffect(() => {
    if (effect !== 'fuzzy' || !canvasRef.current) return;

    let animationFrameId: number;
    let isCancelled = false;
    const canvas = canvasRef.current;

    const init = async () => {
      // Don't wait for fonts - start immediately with fallback
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const currentText = text || (children ? String(children) : '');
      
      // Set immediate fallback text styling
      const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
      const computedFontFamily = fontFamily === 'inherit' 
        ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' 
        : fontFamily;

      // Create immediate text display
      ctx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = color;
      
      // Measure text immediately
      const metrics = ctx.measureText(currentText);
      const textWidth = Math.ceil(metrics.width);
      const textHeight = Math.ceil(parseFloat(fontSizeStr) * 1.2);
      
      // Set canvas size immediately
      canvas.width = textWidth + 100;
      canvas.height = textHeight + 20;
      
      // Draw initial text immediately
      ctx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = color;
      ctx.fillText(currentText, 50, textHeight - 10);
      
      setIsFuzzyReady(true);

      // Wait for fonts in background and re-render when ready
      if (document.fonts?.ready) {
        try {
          await Promise.race([
            document.fonts.ready,
            new Promise(resolve => setTimeout(resolve, 1000)) // 1 second timeout
          ]);
        } catch (e) {
          // Font loading failed, continue with fallback
        }
      }

      if (isCancelled) return;

      // Re-measure with proper fonts
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      const newMetrics = offCtx.measureText(currentText);

      const actualLeft = newMetrics.actualBoundingBoxLeft ?? 0;
      const actualRight = newMetrics.actualBoundingBoxRight ?? newMetrics.width;
      const actualAscent = newMetrics.actualBoundingBoxAscent ?? parseFloat(fontSizeStr);
      const actualDescent = newMetrics.actualBoundingBoxDescent ?? parseFloat(fontSizeStr) * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = color;
      offCtx.fillText(currentText, xOffset - actualLeft, actualAscent);

      const horizontalMargin = 50;
      const verticalMargin = 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      const fuzzRange = 30;

      const run = () => {
        if (isCancelled) return;
        ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
        }
        animationFrameId = window.requestAnimationFrame(run);
      };

      run();

      const isInsideTextArea = (x: number, y: number) =>
        x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;

      const handleMouseMove = (e: MouseEvent) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
      }

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseleave', handleMouseLeave);
        }
      };

      (canvas as HTMLCanvasElement & { cleanupFuzzyText?: () => void }).cleanupFuzzyText = cleanup;
    };

    init();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
      if (canvas && (canvas as HTMLCanvasElement & { cleanupFuzzyText?: () => void }).cleanupFuzzyText) {
        (canvas as HTMLCanvasElement & { cleanupFuzzyText?: () => void }).cleanupFuzzyText?.();
      }
    };
  }, [effect, text, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);

  // Handle different animation triggers
  useEffect(() => {
    if (animateOn === 'load') {
      decryptText();
    }
  }, [animateOn]);

  useEffect(() => {
    if (animateOn === 'view' && elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              decryptText();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn, hasAnimated]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      decryptText();
    }
  };

  const handleMouseLeave = () => {
    // Mouse leave handler if needed
  };

  // Render based on effect type
  if (effect === 'fuzzy') {
    return (
      <div className="relative">
        {/* Immediate fallback text */}
        {!isFuzzyReady && (
          <span 
            className={className}
            style={{
              fontSize: fontSize,
              fontWeight: fontWeight,
              fontFamily: fontFamily,
              color: color,
            }}
          >
            {text || (children ? String(children) : '')}
          </span>
        )}
        {/* Canvas for fuzzy effect */}
        <canvas 
          ref={canvasRef} 
          style={{
            display: isFuzzyReady ? 'block' : 'none',
            fontSize: fontSize,
            fontWeight: fontWeight,
            fontFamily: fontFamily,
          }}
        />
      </div>
    );
  }

  return (
    <motion.span
      ref={elementRef}
      className={parentClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className={`${className} ${isAnimating ? encryptedClassName : ''}`}>
        {displayText}
      </span>
    </motion.span>
  );
};

export default TextEffect;
