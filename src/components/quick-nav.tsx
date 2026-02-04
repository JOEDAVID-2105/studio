'use client';

import { useState, useEffect, useRef, MouseEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: "D'codes", href: '#dcodes' },
  { name: 'Creative', href: '#creative' },
  { name: 'FAQ', href: '#faq' },
];

const QuickNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMenuOpen(false); // Close menu when scrolling to top
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (e: MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    setIsMenuOpen(false);
  };

  const handlePressStart = () => {
    holdTimeout.current = setTimeout(() => {
      setIsMenuOpen(true);
      holdTimeout.current = null;
    }, 500); // 500ms hold duration
  };

  const handlePressEnd = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
      // If the timeout was cleared, it was a click
      scrollToTop();
    }
  };

  const handleClick = (e: MouseEvent) => {
    // We prevent the PopoverTrigger's default click behavior
    // because we handle click/hold logic manually.
    // If we don't do this, a long press opens the menu, but releasing
    // the mouse triggers a "click" which would close it again.
    e.preventDefault();
  };

  return (
    <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <PopoverTrigger asChild>
        <Button
          id="quick-nav-button"
          variant="secondary"
          size="icon"
          className={cn(
            'fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg transition-opacity duration-300',
            'bg-accent text-accent-foreground hover:bg-accent/90',
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          onClick={handleClick}
          onContextMenu={(e) => e.preventDefault()} // Prevents right-click menu on long press
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="w-48 p-2 bg-card border-border rounded-lg shadow-xl mb-2"
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              className="justify-start"
              onClick={(e) => handleScrollTo(e, link.href)}
            >
              {link.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QuickNav;
