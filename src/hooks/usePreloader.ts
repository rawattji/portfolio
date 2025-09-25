'use client';

import { useState, useEffect, useCallback } from 'react';

interface PreloadStatus {
  images: boolean;
  videos: boolean;
  fonts: boolean;
  components: boolean;
  animations: boolean;
}

export const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<PreloadStatus>({
    images: false,
    videos: false,
    fonts: false,
    components: false,
    animations: false,
  });

  const preloadImages = useCallback(async (): Promise<void> => {
    const imageUrls = [
      '/images/chrome-extension.png',
      '/images/rushFashion.png',
      '/images/scrollDay.png',
      '/images/sureReads.png',
      '/images/WorkOrbit.png',
    ];

    const imagePromises = imageUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
      });
    });

    await Promise.all(imagePromises);
    setStatus(prev => ({ ...prev, images: true }));
  }, []);

  const preloadVideos = useCallback(async (): Promise<void> => {
    const videoUrls = [
      '/videos/homePage_leftView.mp4',
      '/videos/aboutSecton_FrontView.mp4',
      '/videos/experienceSecton_Formal.mp4',
      '/videos/projectSection_typing.mp4',
      '/videos/resumeSection_Namaste.mp4',
    ];

    const videoPromises = videoUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve();
        video.onerror = () => resolve();
        video.src = url;
      });
    });

    await Promise.all(videoPromises);
    setStatus(prev => ({ ...prev, videos: true }));
  }, []);

  const preloadFonts = useCallback(async (): Promise<void> => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setStatus(prev => ({ ...prev, fonts: true }));
  }, []);

  const preloadComponents = useCallback(async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setStatus(prev => ({ ...prev, components: true }));
  }, []);

  const preloadAnimations = useCallback(async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setStatus(prev => ({ ...prev, animations: true }));
  }, []);

  const preloadEverything = useCallback(async () => {
    try {
      const tasks = [
        preloadImages(),
        preloadVideos(),
        preloadFonts(),
        preloadComponents(),
        preloadAnimations(),
      ];

      let completedTasks = 0;
      const totalTasks = tasks.length;

      const updateProgress = () => {
        completedTasks++;
        const progressPercent = Math.round((completedTasks / totalTasks) * 100);
        setProgress(progressPercent);
      };

      await Promise.all(tasks.map(async (task) => {
        await task;
        updateProgress();
      }));

      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(undefined);
        } else {
          window.addEventListener('load', () => resolve(undefined));
        }
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      setIsLoading(false);
    } catch (error) {
      console.error('Preloading error:', error);
      setIsLoading(false);
    }
  }, [preloadImages, preloadVideos, preloadFonts, preloadComponents, preloadAnimations]);

  useEffect(() => {
    preloadEverything();
  }, [preloadEverything]);

  return {
    isLoading,
    progress,
    status,
  };
};
