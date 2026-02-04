'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'D\'codes', href: '#dcodes' },
    { name: 'Creative', href: '#creative' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative h-10 w-10 cursor-pointer overflow-hidden rounded-full transition-transform duration-300 ease-in-out hover:scale-110">
                <Image
                  src="https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/Whisk_226d7aa74fcf94b9b3048a44a6dd1758dr.png"
                  alt="Joel David Logo"
                  fill
                  className="object-cover scale-[2.5]"
                  unoptimized
                />
              </div>
            </DialogTrigger>
            <DialogContent className="flex h-auto max-w-[90vw] items-center justify-center border-none bg-transparent p-0 shadow-none sm:max-w-md">
              <Image
                src="https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/Whisk_226d7aa74fcf94b9b3048a44a6dd1758dr.png"
                alt="Joel David Logo"
                width={400}
                height={400}
                className="h-auto max-w-full rounded-lg"
                unoptimized
              />
            </DialogContent>
          </Dialog>
          <Link
            href="/"
            className="font-headline text-xl font-bold tracking-tight text-white"
          >
            Joel David
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
          <ContactModal>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Contact Me</Button>
          </ContactModal>
        </nav>
        <div className="md:hidden">
          <ContactModal>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Contact</Button>
          </ContactModal>
        </div>
      </div>
    </header>
  );
};

export default Header;
