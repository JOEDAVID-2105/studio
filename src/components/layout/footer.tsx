import { Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-primary w-full py-8">
      <div className="container mx-auto px-4 text-center text-primary-foreground">
        <h3 className="font-headline text-2xl md:text-3xl font-bold">
          Get in Touch
        </h3>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          I'm currently available for freelance work and open to new opportunities.
          Feel free to reach out.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <a href="mailto:joelsofflmail@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <Mail className="mr-2 h-4 w-4" /> Email Me
            </a>
          </Button>
          <Button asChild variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <a href="https://github.com/JOEDAVID-2105" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
        </div>
        <div className="mt-8 border-t border-border/20 pt-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Joel David. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
