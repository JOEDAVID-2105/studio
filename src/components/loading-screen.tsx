'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Start fade out
      setTimeout(onFinished, 500); // Call onFinished after fade out
    }, 3500); // Show loading for 3.5 seconds

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
       <video
        src="https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/20260204_090949_output_tiny_s3_20260204-090918.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 text-center">
        <p className="text-white mt-4 text-lg bg-black/50 px-4 py-2 rounded-lg">Loading portfolio...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
