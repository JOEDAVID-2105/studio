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
import CreativeWorks from '@/components/sections/creative-works';
import QuickNav from '@/components/quick-nav';

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
              <section id="about" className="py-8 md:py-20">
                <About />
              </section>
              <Separator />
              <section id="projects" className="py-8 md:py-20">
                <Projects />
              </section>
              <Separator />
              <section id="dcodes" className="py-8 md:py-20">
                <Dcodes />
              </section>
              <Separator />
              <section id="creative" className="py-8 md:py-20">
                <CreativeWorks />
              </section>
              <Separator />
              <section id="faq" className="py-8 md:py-20">
                <Faq />
              </section>
            </div>
          </main>
          <Footer />
          <QuickNav />
        </>
      )}
    </>
  );
}
