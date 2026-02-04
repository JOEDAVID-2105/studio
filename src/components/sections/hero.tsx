'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const TOTAL_FRAMES = 50;
const FRAME_URL_PREFIX = 'https://picsum.photos/seed/';

const generateFrameUrls = (width: number, height: number) => {
  return Array.from(
    { length: TOTAL_FRAMES },
    (_, i) => `${FRAME_URL_PREFIX}frame${i + 1}/${width}/${height}`
  );
};

const Hero = () => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [frames, setFrames] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const urls = generateFrameUrls(1920, 1080);
    setFrames(urls);

    // Preload images
    urls.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const scrollY = window.scrollY;
      const start = scrollRef.current.offsetTop;
      const end = start + scrollRef.current.offsetHeight - window.innerHeight;

      if (scrollY >= start && scrollY <= end) {
        const scrollFraction = (scrollY - start) / (end - start);
        const newFrameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(scrollFraction * TOTAL_FRAMES)
        );
        setFrameIndex(newFrameIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={scrollRef} className="relative h-[250vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {frames.length > 0 && (
             <Image
                ref={imageRef}
                src={frames[frameIndex]}
                alt="Cinematic parallax background sequence"
                fill
                priority
                quality={80}
                className="object-cover"
                data-ai-hint="abstract technology"
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
      </div>
    </section>
  );
};

export default Hero;
