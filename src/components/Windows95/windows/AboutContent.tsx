import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Ao from './images/ao.jpg';


export function AboutContent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <img
          src={Ao}
          alt="Profile"
          className="w-32 h-32 rounded-lg border-2 border-gray-400 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">Akshit Ohri</h2>
          <h3 className="text-lg text-gray-600 mb-4">Serverless Person</h3>
          <p className="text-sm leading-relaxed">
            A passionate Software Developer focused on creating elegant,
            performant, and user-centric digital experiences.
          </p>
        </div>
      </div>

      <Separator />

      <section>
        <h3 className="text-lg font-bold mb-4">Professional Experience</h3>
        <div className="space-y-4">
          <ExperienceCard
            title="Developer Intern"
            company="SRM Technologies"
            period="Mar 2024 - Present"
            description="Developed web applications using React and Node.js. Enhanced user experience through collaborative efforts."
            technologies={['React', 'Node.js']}
          />

          <ExperienceCard
            title="Head of Web Development"
            company="IEEE Computer Society SRMIST"
            period="Sep 2024 - Present"
            description="Led a team of 10+ developers on society projects. Oversaw project planning and execution."
            technologies={['Project Management', 'Team Leadership']}
          />

          <ExperienceCard
            title="Technical Team Member"
            company="Data Science Community SRM"
            period="Oct 2023 - Present"
            description="Built machine learning models for data solutions. Provided technical support for events."
            technologies={['Machine Learning', 'Technical Support']}
          />

          <ExperienceCard
            title="Satoshi Member"
            company="Next Tech Lab"
            period="Nov 2023 - May 2024"
            description="Developed custom payloads and conducted binary analysis. Contributed to cybersecurity research projects."
            technologies={['Binary Analysis', 'Cybersecurity']}
          />
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-lg font-bold mb-4">Core Skills</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'JavaScript',
            'TypeScript',
            'React',
            'Node.js',
            'Python',
            'AWS',
            'Docker',
            'Git',
            'MongoDB',
            'PostgreSQL',
            'REST APIs',
            'GraphQL',
          ].map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}

function ExperienceCard({
  title,
  company,
  period,
  description,
  technologies,
}: {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
        <span className="text-sm text-gray-500">{period}</span>
      </div>
      <p className="text-sm mb-3">{description}</p>
      <div className="flex flex-wrap gap-1">
        {technologies.map((tech) => (
          <Badge key={tech} variant="outline" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
