'use client';

import { CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const About = () => {
  const thinkingPoints = [
    'Logic-first approach shaped by mathematics',
    'Prefer clarity over complexity',
    'Honest technology choices over trends',
    'Product thinking over prototypes',
    'Focus on usability, performance, and reliability',
  ];

  const workPoints = [
    'Progressive Web Apps for real-world use cases',
    'AI-assisted web applications using Firebase',
    'Modern and 3D-inspired web interfaces',
    'Product-focused web releases',
    'Audio and video editing for creative projects',
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="intro" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="intro">Introduction</TabsTrigger>
          <TabsTrigger value="thinking">Thinking</TabsTrigger>
          <TabsTrigger value="work">Work</TabsTrigger>
        </TabsList>
        <TabsContent value="intro" className="pt-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I’m Joel, an MSc Mathematics graduate focused on building practical
            AI-assisted web applications and modern, product-driven web
            experiences using JavaScript and Firebase. I value clarity,
            maintainable systems, and solutions built for real users.
          </p>
        </TabsContent>
        <TabsContent value="thinking" className="pt-6">
          <ul className="space-y-4">
            {thinkingPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="work" className="pt-6">
          <ul className="space-y-4">
            {workPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default About;
