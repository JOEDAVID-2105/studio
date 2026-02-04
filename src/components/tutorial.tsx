'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const TUTORIAL_STORAGE_KEY = 'portfolio-tutorial-completed-v2';

const tutorialSteps = [
  {
    targetId: 'quick-nav-button',
    title: 'Quick Navigation',
    description: "Click this button to scroll to the top. Hold it to open a menu for jumping to different sections.",
    position: 'top-right',
  },
  {
    targetId: 'dcodes',
    title: "Try D'code!",
    description: "Ask my AI assistant how Joel fits a role you have in mind. It's an example of his work!",
    position: 'top-center',
  },
];

const Tutorial = () => {
  const [isClient, setIsClient] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

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
    let element = document.getElementById(step.targetId);

    const updateRect = () => {
      element = document.getElementById(step.targetId);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
      }
    }
    
    if (step.targetId === 'quick-nav-button') {
        const findButton = () => {
            element = document.getElementById(step.targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(updateRect, 500);
            } else {
                window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' });
                setTimeout(findButton, 600);
            }
        }
        findButton();
    } else if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(updateRect, 500);
    } else {
        setTargetRect(null);
    }

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };

  }, [showTutorial, currentStepIndex, isClient]);

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

  const tooltipStyle: React.CSSProperties = {};
  if (currentStep.position === 'top-right') {
    tooltipStyle.top = 'auto';
    tooltipStyle.bottom = window.innerHeight - targetRect.top + 16;
    tooltipStyle.left = 'auto';
    tooltipStyle.right = window.innerWidth - targetRect.right;
    tooltipStyle.transform = 'none';
  } else if (currentStep.position === 'top-center') {
    tooltipStyle.top = 'auto';
    tooltipStyle.bottom = window.innerHeight - targetRect.top + 16;
    tooltipStyle.left = targetRect.left + targetRect.width / 2;
    tooltipStyle.transform = 'translateX(-50%)';
  }


  return (
    <div className="fixed inset-0 z-[1000]" aria-live="polite" aria-label="Interactive Tutorial">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={finishTutorial}/>
        
        {/* Highlight Box */}
        <div style={{
            position: 'fixed',
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
            borderRadius: 'var(--radius)',
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
