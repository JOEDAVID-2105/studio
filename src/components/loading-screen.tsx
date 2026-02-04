'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
  const [visible, setVisible] = useState(true);
  const isMobile = useIsMobile();

  const handleVideoEnd = () => {
    setVisible(false); // Start fade out
    setTimeout(onFinished, 500); // Call onFinished after fade out
  };

  const desktopVideo =
    'https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/20260204_090949_output_tiny_s3_20260204-090918.mp4';
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
