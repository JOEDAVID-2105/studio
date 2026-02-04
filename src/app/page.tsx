'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Dcodes from '@/components/sections/dcodes';
import Faq from '@/components/sections/faq';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <LoadingScreen onFinished={() => setLoading(false)} />
      ) : (
        <>
          <Header />
          <main>
            <Hero />
            <div className="container mx-auto px-4">
              <section id="about" className="py-16 md:py-24">
                <About />
              </section>
              <Separator />
              <section id="projects" className="py-16 md:py-24">
                <Projects />
              </section>
              <Separator />
              <section id="dcodes" className="py-16 md:py-24">
                <Dcodes />
              </section>
              <Separator />
              <section id="faq" className="py-16 md:py-24">
                <Faq />
              </section>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
