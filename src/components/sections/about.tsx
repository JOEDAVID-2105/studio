import { CheckCircle2 } from 'lucide-react';

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
    <div className="grid md:grid-cols-3 gap-12 items-start">
      <div className="md:col-span-1">
        <p className="text-lg text-muted-foreground leading-relaxed">
          I’m Joel, an MSc Mathematics graduate focused on building practical
          AI-assisted web applications and modern, product-driven web
          experiences using JavaScript and Firebase. I value clarity,
          maintainable systems, and solutions built for real users.
        </p>
      </div>

      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div>
          <ul className="space-y-4">
            {thinkingPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul className="space-y-4">
            {workPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
