'use client';

import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const TUTORIAL_STORAGE_KEY = 'portfolio-tutorial-completed-v3';

const Tutorial = () => {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});


  const tutorialSteps = useMemo(() => [
    {
      targetId: 'quick-nav-button',
      title: 'Quick Navigation',
      description: "Click the floating button to scroll to the top. Hold it to open a menu for jumping to different sections.",
    },
     {
      targetId: 'projects',
      title: 'View My Projects',
      description: 'This section showcases some of the projects Joel has worked on. Scroll down to see more!',
    },
    {
      targetId: 'dcodes',
      title: "Try D'code!",
      description: "Ask my AI assistant how Joel fits a role you have in mind. It's an example of his work!",
    },
    {
      targetId: isMobile ? 'contact-me-mobile' : 'contact-me-desktop',
      title: 'Get In Touch',
      description: 'Want to work together or have a question? Click here to send a message.',
    }
  ], [isMobile]);

  useEffect(() => {
    setIsClient(true);
    const hasCompleted = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    if (!hasCompleted) {
        const timer = setTimeout(() => setShowTutorial(true), 2500);
        return () => clearTimeout(timer);
    }
  }, []);

  useLayoutEffect(() => {
    if (!showTutorial || !isClient) return;

    const step = tutorialSteps[currentStepIndex];
    let element: HTMLElement | null = null;

    const updatePosition = () => {
        if(step.targetId) {
            element = document.getElementById(step.targetId);
            if (element) {
                const rect = element.getBoundingClientRect();
                setTargetRect(rect);
                
                // New positioning logic
                const tooltipWidth = 288; // w-72 from className
                const tooltipHeight = 220; // Estimated height
                const gap = 24;
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                let style: React.CSSProperties = {};
                
                if (isMobile) {
                    style.left = '50%';
                    style.transform = 'translateX(-50%)';
                    style.maxWidth = 'calc(100vw - 32px)';

                    if (rect.bottom + tooltipHeight + gap < viewportHeight) {
                        style.top = rect.bottom + gap;
                    } else {
                        style.bottom = (viewportHeight - rect.top) + gap;
                    }
                } else {
                    style.top = rect.top + rect.height / 2;
                    style.transform = 'translateY(-50%)';
                    
                    if (rect.right + tooltipWidth + gap < viewportWidth) {
                        style.left = rect.right + gap;
                    } else if (rect.left - tooltipWidth - gap > 0) {
                        style.left = rect.left - tooltipWidth - gap;
                    } else {
                        style.left = rect.left + rect.width / 2;
                        style.top = rect.bottom + gap;
                        style.transform = 'translateX(-50%)';
                    }
                }

                // Prevent going off-screen vertically
                if (typeof style.top === 'number' && style.top < gap) {
                    style.top = gap;
                }
                if (typeof style.bottom === 'number' && style.bottom < gap) {
                    style.bottom = gap;
                }
                if (typeof style.top === 'number' && style.top + tooltipHeight > viewportHeight) {
                    style.top = viewportHeight - tooltipHeight - gap;
                }

                setTooltipStyle(style);
            } else {
              setTargetRect(null);
            }
        }
    }
    
    if (step.targetId === 'quick-nav-button') {
        const findButton = () => {
            element = document.getElementById(step.targetId!);
            const isVisible = element && getComputedStyle(element).opacity === '1';
            if (isVisible) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(updatePosition, 500);
            } else {
                window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' });
                setTimeout(findButton, 600);
            }
        }
        findButton();
    } else if (step.targetId) {
        element = document.getElementById(step.targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(updatePosition, 500); // delay for scroll to finish
        }
    } else {
        setTargetRect(null);
    }

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };

  }, [showTutorial, currentStepIndex, isClient, tutorialSteps, isMobile]);

  const finishTutorial = () => {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    setShowTutorial(false);
  };

  const goToNextStep = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      finishTutorial();
    }
  };
  
  if (!showTutorial || !targetRect || !isClient) {
    return null;
  }
  
  const currentStep = tutorialSteps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-[1000]" aria-live="polite" aria-label="Interactive Tutorial">
        {/* Backdrop */}
        <div className="absolute inset-0" onClick={finishTutorial}/>
        
        {/* Highlight Box */}
        <div style={{
            position: 'fixed',
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
            borderRadius: 'calc(var(--radius) + 4px)',
            transition: 'top 0.3s, left 0.3s, width 0.3s, height 0.3s',
            pointerEvents: 'none',
            zIndex: 1001,
        }} />

        {/* Tooltip */}
        <div style={tooltipStyle} className="fixed bg-card p-4 rounded-lg w-72 max-w-[90vw] shadow-2xl animate-fade-in-up z-[1002]">
            <h3 className="font-bold text-lg text-foreground">{currentStep.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{currentStep.description}</p>
            <div className="mt-4 flex justify-between items-center">
                 <span className="text-xs text-muted-foreground">{currentStepIndex + 1} / {tutorialSteps.length}</span>
                <Button onClick={goToNextStep} size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    {currentStepIndex === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
            <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7 text-muted-foreground" onClick={finishTutorial} aria-label="Close tutorial">
                <X className="h-4 w-4" />
            </Button>
        </div>
    </div>
  );
};

export default Tutorial;
