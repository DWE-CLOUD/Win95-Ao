import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function SkillsContent() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'C/C++', level: 85 },
        { name: 'Golang', level: 80 },
        { name: 'PHP', level: 75 },
        { name: 'Ruby', level: 75 },
      ],
    },
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React.js', level: 90 },
        { name: 'Next.js', level: 90 },
        { name: 'HTML5/CSS3', level: 85 },
        { name: 'SASS', level: 80 },
        { name: 'Tailwind CSS', level: 85 },
      ],
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 85 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MySQL', level: 85 },
        { name: 'SQL', level: 80 },
      ],
    },
    {
      title: 'AI/ML & Cybersecurity',
      skills: [
        { name: 'TensorFlow', level: 85 },
        { name: 'Keras', level: 85 },
        { name: 'Scikit-learn', level: 80 },
        { name: 'Binary Analysis', level: 85 },
        { name: 'Penetration Testing', level: 80 },
      ],
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 85 },
        { name: 'Kubernetes', level: 80 },
        { name: 'AWS', level: 85 },
        { name: 'Linux', level: 85 },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {skillCategories.map((category) => (
        <Card key={category.title} className="p-6">
          <h3 className="text-xl font-bold mb-4">{category.title}</h3>
          <div className="space-y-4">
            {category.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
