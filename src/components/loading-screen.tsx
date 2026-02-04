'use client';

import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
  const [visible, setVisible] = useState(true);
  const isMobile = useIsMobile();
  const onFinishedCalled = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const finishLoading = () => {
    if (!onFinishedCalled.current) {
      onFinishedCalled.current = true;
      setVisible(false); // Start fade out
      setTimeout(onFinished, 500); // Call onFinished after fade out
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  useEffect(() => {
    // Fallback timer to ensure loading finishes even if tab is in background.
    // Set to 6 seconds, slightly longer than the video.
    timeoutRef.current = setTimeout(finishLoading, 6000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // We only want this to run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVideoEnd = () => {
    finishLoading();
  };

  const desktopVideo =
    'https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/upscaled-video%20(1).mp4';
  const mobileVideo =
    'https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/upscaled-video.mp4';

  const videoSrc = isMobile ? mobileVideo : desktopVideo;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-end bg-background transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <video
        key={videoSrc}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 h-full w-full object-cover transform scale-110"
      />
      <div className="relative z-10 text-center pb-10">
        <p className="text-muted-foreground text-sm">
          Loading portfolio...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
