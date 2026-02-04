import { PlaceHolderImages } from './placeholder-images';

export const projects = [
  {
    id: 1,
    title: 'Custos Omega',
    description:
      'Custos Omega helps individuals and households track income and expenses through a clean, AI-assisted progressive web app. Built to explore real-world financial workflows, usability, and scalable frontend architecture.',
    techStack: ['PWA', 'Firebase'],
    imageUrl: PlaceHolderImages.find((img) => img.id === 'project-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find((img) => img.id === 'project-1')?.imageHint || '',
    liveUrl: 'https://custos-omega.vercel.app/',
  },
];

export const faqs = [
  {
    id: 'faq-1',
    question: 'What technologies are you most passionate about?',
    answer:
      "I'm deeply passionate about the modern web stack, particularly Next.js and the React ecosystem. I also have a strong interest in 3D graphics with Three.js/WebGL and the creative possibilities of Generative AI.",
  },
  {
    id: 'faq-2',
    question: 'Are you available for freelance projects?',
    answer:
      'Yes, I am open to discussing freelance opportunities. If you have a project in mind, please feel free to reach out via email with the details.',
  },
  {
    id: 'faq-3',
    question: 'What is your process for starting a new project?',
    answer:
      'My process begins with a discovery phase to fully understand the project goals and user needs. This is followed by UI/UX design and prototyping, then agile development with regular check-ins, and finally, deployment and testing.',
  },
  {
    id: 'faq-4',
    question: 'How do you stay updated with the latest industry trends?',
    answer:
      'I am a firm believer in continuous learning. I regularly follow industry blogs, participate in online courses, contribute to open-source projects, and attend tech meetups and conferences to stay on the cutting edge.',
  },
];

export const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Firebase',
  'Tailwind CSS',
  'ShadCN',
  'Three.js',
  'WebGL',
  'UI/UX Design',
  'Figma',
  'Framer Motion',
  'GenAI',
  'Python',
];

export const experiences = [
  {
    title: 'Real-time collaborative whiteboard',
    description:
      'Developed a real-time collaborative whiteboard using Firebase Realtime Database and React.',
  },
  {
    title: '3D product visualizer',
    description: 'Created a 3D product visualizer with Three.js and WebGL.',
  },
  {
    title: 'Full-stack e-commerce site',
    description:
      'Built a full-stack e-commerce site with Next.js, Stripe, and a custom CMS.',
  },
  {
    title: 'Enterprise component library',
    description:
      'Designed and implemented a component library for a large-scale enterprise application.',
  },
  {
    title: 'Dynamic content personalization engine',
    description: 'Integrated GenAI models to create a dynamic content personalization engine.',
  },
];

export const cmsData = `
Skills: ${skills.join(', ')}.
Experiences:
${experiences.map((exp) => `- ${exp.title}: ${exp.description}`).join('\n')}
`;
