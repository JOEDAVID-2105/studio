'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isFaded, setIsFaded] = useState(false);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const endFrameUrl1 =
    'https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/Whisk_c9c38c9fab91ea3adcd49f2e2728d7cedr.png';
  const endFrameUrl2 =
    'https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/Whisk_629f785ffc580bb9f7d43f47987ac9cadr.png';

  // Logic to decide whether to show the video or the static end frame image
  const showEndFrame = !isHovering && hasPlayedOnce;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isHovering) {
        if (fadeTimeoutRef.current) {
          clearTimeout(fadeTimeoutRef.current);
        }
        setIsFaded(false); // Reset fade on hover
        video.loop = true;
        if (video.paused || video.ended) {
          video.play().catch(console.error);
        }
      } else {
        video.loop = false;
      }
    }
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [isHovering]);

  const onVideoEnd = () => {
    // This will only be called when loop is false.
    if (!isHovering) {
      setHasPlayedOnce(true);
      fadeTimeoutRef.current = setTimeout(() => {
        setIsFaded(true);
      }, 500); // 0.5s delay before fading
    }
  };

  const handleMouseEnter = () => {
    // By setting hasPlayedOnce to false, we ensure the video element is rendered.
    setHasPlayedOnce(false);
    setIsHovering(true);
  };

  return (
    <section
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 z-0">
        {showEndFrame ? (
          <>
            <Image
              src={endFrameUrl1}
              alt="Abstract technology background"
              fill
              className="h-full w-full object-cover"
              priority
              unoptimized
            />
            <Image
              src={endFrameUrl2}
              alt="Abstract technology background fade"
              fill
              className={`h-full w-full object-cover transition-opacity duration-1000 ${
                isFaded ? 'opacity-100' : 'opacity-0'
              }`}
              priority
              unoptimized
            />
          </>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={onVideoEnd}
            className="h-full w-full object-cover transform scale-110"
            src="https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/video%20test/More_dramatic_and_202602031947_0exdk.mp4"
            data-ai-hint="abstract technology"
            loop={false}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tighter animate-fade-in-up">
          JOEL DAVID
        </h1>
        <p className="mt-4 text-sm md:text-lg text-muted-foreground animate-fade-in-up animate-delay-300">
          Creative Developer & Designer
        </p>
      </div>
    </section>
  );
};

export default Hero;
