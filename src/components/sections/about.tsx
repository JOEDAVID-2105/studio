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

  const creativeSkills = [
    'Music production with a strong focus on structure, timing, and arrangement',
    'Audio editing and sound refinement for creative and presentation-based projects',
    'Video editing for short-form and long-form digital content',
    'Experience using Logic Pro for music production and audio workflows',
    'Proficient with Adobe Suite (including video and media editing tools)',
    'Apply creative production skills to enhance product presentation and storytelling',
  ];

  const aiToolingPoints = [
    'Use AI tools to accelerate development, prototyping, and problem solving',
    'Experienced with ChatGPT for logic breakdown, code generation, and refactoring',
    'Use Google Gemini for ideation, validation, and content workflows',
    'Work with Firebase Studio for AI-assisted app development and iteration',
    'Familiar with tools like Whisk and Flow for creative and automation workflows',
    'Focus on practical AI usage to improve speed, clarity, and product quality',
  ];


  return (
    <div className="max-w-3xl mx-auto">
       <div className="text-center mb-12">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About Me
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A glimpse into my mindset, workflow, and creative skills.
        </p>
      </div>
      <Tabs defaultValue="intro" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="intro">Introduction</TabsTrigger>
          <TabsTrigger value="thinking">Thinking</TabsTrigger>
          <TabsTrigger value="work">Work</TabsTrigger>
          <TabsTrigger value="creative">Creative</TabsTrigger>
          <TabsTrigger value="ai">AI Tooling</TabsTrigger>
        </TabsList>
        <TabsContent value="intro" className="pt-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I’m Joel, an MSc Mathematics graduate focused on building practical,
            AI-assisted web applications and modern, product-driven web
            experiences using JavaScript and Firebase. I value clarity,
            maintainable systems, and solutions built for real users.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            My academic background includes postgraduate-level mathematical
            research, where I worked with abstract structures and formal
            reasoning. This experience strengthened my ability to think
            rigorously, break down complex problems, and design systems with
            logical consistency—skills that directly influence how I approach
            software development.
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
        <TabsContent value="creative" className="pt-6">
          <ul className="space-y-4">
            {creativeSkills.map((skill, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">{skill}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="ai" className="pt-6">
          <ul className="space-y-4">
            {aiToolingPoints.map((point, index) => (
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
