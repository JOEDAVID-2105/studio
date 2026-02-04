'use client';

import { useState, useEffect, useRef } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [hasUsedDcodes, setHasUsedDcodes] = useState(false);
  const { toast } = useToast();
  const notificationInterval = useRef<NodeJS.Timeout | null>(null);
  const scrollListenerAdded = useRef(false);

  useEffect(() => {
    const showDcodesNotification = () => {
      toast({
        id: 'dcodes-promo',
        title: "Try D'code!",
        description: "Ask my AI assistant how Joel fits a role you have in mind.",
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              document.querySelector('#dcodes')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }}
          >
            Try Now
          </Button>
        ),
      });
    };
    
    if (loading || hasUsedDcodes) {
      if (notificationInterval.current) {
        clearInterval(notificationInterval.current);
        notificationInterval.current = null;
      }
      return;
    }

    const handleScroll = () => {
      if (notificationInterval.current) return;
      
      showDcodesNotification(); // Show once immediately
      notificationInterval.current = setInterval(showDcodesNotification, 3 * 60 * 1000); // 3 minutes
    };

    if (!scrollListenerAdded.current) {
        window.addEventListener('scroll', handleScroll, { once: true, passive: true });
        scrollListenerAdded.current = true;
    }

    return () => {
      if (notificationInterval.current) {
        clearInterval(notificationInterval.current);
      }
    };
  }, [loading, hasUsedDcodes, toast]);

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
                <Dcodes onFirstUse={() => setHasUsedDcodes(true)} />
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
