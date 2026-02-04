'use client';

import { CheckCircle2 } from 'lucide-react';

const CreativeWorks = () => {
  const creativeSkills = [
    'Music production with a strong focus on structure, timing, and arrangement',
    'Audio editing and sound refinement for creative and presentation-based projects',
    'Video editing for short-form and long-form digital content',
    'Experience using Logic Pro for music production and audio workflows',
    'Proficient with Adobe Suite (including video and media editing tools)',
    'Apply creative production skills to enhance product presentation and storytelling',
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-headline text-xl sm:text-3xl font-bold tracking-tight text-foreground">
          Creative Works
        </h2>
        <p className="mt-3 text-sm sm:text-lg text-muted-foreground">
          A look into my creative production skills.
        </p>
      </div>
      <ul className="space-y-4">
        {creativeSkills.map((skill, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
            <span className="text-muted-foreground text-sm sm:text-lg">{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreativeWorks;
