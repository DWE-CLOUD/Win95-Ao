import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function EducationContent() {
  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science',
      school: 'SRM Institute of Science and Technology, Tamil Nadu, India',
      period: '2023 - Present',
      description: 'GPA: 8.5 (1st Year)',
      achievements: [
        'Certificate of Achievement, Awarded by Head of Department',
        'Letter of Recommendation, Recognized for Excellence',
        'Published in College Magazine, Twice',
        'Citations in Various LLM Projects',
      ],
      courses: [
        'AI/ML Development',
        'Web Development',
        'Cybersecurity',
        'Cloud Computing',
        'Database Systems',
      ],
    },
    {
      degree: 'High School Diploma',
      school: 'DAV International School, Mumbai, India',
      period: '2015 - 2023',
      description:
        'Completed secondary and higher secondary education with distinguished performance',
      achievements: [
        'Class 10: Secured 95% in CBSE Board Exams',
        'Class 12: Passed with Distinction',
        'Rank 40 in Google Code Hash',
        'All India Rank 10 in INTEL AI Youth Program',
      ],
      courses: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'],
    },
  ];

  const certifications = [
    {
      name: 'Stripe Bug Bounty Winner',
      issuer: 'Stripe',
      date: '2023',
      badge: '🏆',
    },
    {
      name: 'TIME Robotics Level - O/A/B',
      issuer: 'TIME',
      date: '2023',
      badge: '🤖',
    },
    {
      name: 'Hackathon Champion',
      issuer: 'Multiple Events',
      date: '2023-2024',
      badge: '🏅',
    },
    {
      name: 'INTEL AI Youth Program',
      issuer: 'INTEL',
      date: '2023',
      badge: '🧠',
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <div className="space-y-6">
          {education.map((edu) => (
            <Card key={edu.degree} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                </div>
                <Badge variant="secondary">{edu.period}</Badge>
              </div>
              <p className="text-gray-600 mb-4">{edu.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-2">Achievements</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {edu.achievements.map((achievement) => (
                      <li key={achievement} className="text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Key Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course) => (
                      <Badge key={course} variant="outline">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-2xl font-bold mb-4">
          Certifications & Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <Card key={cert.name} className="p-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{cert.badge}</span>
                <div>
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="text-sm text-gray-600">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
