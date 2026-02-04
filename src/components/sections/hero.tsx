'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const endFrameUrl =
    'https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/frame_190_delay-0.042s.webp';

  // Logic to decide whether to show the video or the static end frame image
  const showEndFrame = !isHovering && hasPlayedOnce;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isHovering) {
        video.loop = true;
        // If video is paused or has ended, play it
        if (video.paused || video.ended) {
          video.play().catch(console.error);
        }
      } else {
        // When not hovering, don't loop. It will play to the end and then stop.
        video.loop = false;
      }
    }
  }, [isHovering]);

  const onVideoEnd = () => {
    // This will only be called when loop is false.
    if (!isHovering) {
      setHasPlayedOnce(true);
    }
  };

  return (
    <section
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 z-0">
        {/* Conditionally render Image or Video */}
        {showEndFrame ? (
          <Image
            src={endFrameUrl}
            alt="Abstract technology background"
            fill
            className="h-full w-full object-cover"
            priority
            unoptimized
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={onVideoEnd}
            className="h-full w-full object-cover"
            src="https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/video%20test/More_dramatic_and_202602031947_0exdk.mp4"
            data-ai-hint="abstract technology"
            loop={false}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter animate-fade-in-up">
          JOEL DAVID
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-muted-foreground animate-fade-in-up animation-delay-300">
          Creative Developer & Designer
        </p>
      </div>
    </section>
  );
};

export default Hero;
