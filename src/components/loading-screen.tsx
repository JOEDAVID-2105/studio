'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
      <div className="w-full max-w-xs text-center">
        <Image
          src="https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/Whisk_226d7aa74fcf94b9b3048a44a6dd1758dr.png"
          alt="Logo"
          width={80}
          height={80}
          className="mx-auto rounded-full mb-4"
          unoptimized
        />
        <video
          src="https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/20260204_090949_output_tiny_s3_20260204-090918.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-lg"
        />
        <p className="text-muted-foreground mt-4">Loading portfolio...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
