'use client';

import { Github, Instagram, Mail, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';

const Footer = () => {
  return (
    <footer className="bg-primary w-full py-8">
      <div className="container mx-auto px-4 text-center text-primary-foreground">
        <h3 className="font-headline text-lg md:text-2xl font-bold">
          Get in Touch
        </h3>
        <p className="mt-2 text-xs md:text-base text-muted-foreground max-w-xl mx-auto">
          I'm currently available for freelance work and open to new opportunities.
          Feel free to reach out.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <ContactModal>
            <Button variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Mail className="mr-2 h-4 w-4" /> Email Me
            </Button>
          </ContactModal>
          <Button asChild variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <a href="https://github.com/JOEDAVID-2105" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-border/20 pt-6 text-sm text-muted-foreground">
          <p className="order-2 sm:order-1 mt-4 sm:mt-0 text-xs sm:text-sm">&copy; {new Date().getFullYear()} Joel David. All rights reserved.</p>
          <div className="order-1 sm:order-2 flex items-center gap-4">
            <a href="https://www.instagram.com/d__codes?igsh=a3R5MTB1M21wNHQ2" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-accent transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://youtube.com/@joelgdavid5013?si=7UurrEW9tzjKngkP" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-accent transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
