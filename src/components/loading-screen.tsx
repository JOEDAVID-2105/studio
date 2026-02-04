'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500); // Fade out duration
          setTimeout(onFinished, 1000); // Wait for fade out to complete
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Adjust speed of loading bar

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-full max-w-xs text-center">
        <h1 className="font-headline text-4xl font-bold text-foreground">
          JD
        </h1>
        <p className="text-muted-foreground mt-2">Loading portfolio...</p>
        <Progress value={progress} className="mt-4 h-2 [&>div]:bg-accent" />
        <p className="mt-2 text-sm font-mono text-accent">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
