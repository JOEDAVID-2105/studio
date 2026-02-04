'use client';

import React from 'react';

const Hero = () => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src="https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/video%20test/More_dramatic_and_202602031947_0exdk.mp4"
          data-ai-hint="abstract technology"
        />
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
