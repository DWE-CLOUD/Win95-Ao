import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Loader2 } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  language: string;
  deployments_url: string;
  has_deployment?: boolean;
}

export function ProjectsContent() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const reposResponse = await fetch(
          'https://api.github.com/users/DWE-CLOUD/repos?per_page=100'
        );

        if (!reposResponse.ok) throw new Error('Failed to fetch projects');

        let repos = await reposResponse.json();

        repos = repos.filter(
          (repo: GitHubRepo) => repo.stargazers_count > 0 || repo.homepage
        );

        repos = repos.sort(
          (a: GitHubRepo, b: GitHubRepo) =>
            b.stargazers_count - a.stargazers_count
        );

        const reposWithDeployments = await Promise.all(
          repos.map(async (repo: GitHubRepo) => {
            try {
              const deploymentsResponse = await fetch(repo.deployments_url);
              if (deploymentsResponse.ok) {
                const deployments = await deploymentsResponse.json();
                return {
                  ...repo,
                  has_deployment: deployments.length > 0,
                };
              }
            } catch (error) {
              console.error(`Error fetching deployments for ${repo.name}:`, error);
            }
            return repo;
          })
        );

        setProjects(reposWithDeployments);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Error: {error}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.name}
            description={project.description || 'No description available'}
            technologies={[project.language, ...(project.topics || [])].filter(Boolean)}
            demoUrl={project.homepage}
            githubUrl={project.html_url}
            stars={project.stargazers_count}
            hasDeployment={project.has_deployment}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  technologies,
  demoUrl,
  githubUrl,
  stars,
  hasDeployment,
}: {
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl: string;
  stars: number;
  hasDeployment?: boolean;
}) {
  const formatTitle = (title: string) => {
    return title
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{formatTitle(title)}</h3>
          <div className="flex gap-2">
            {hasDeployment && (
              <Badge variant="outline" className="text-xs bg-green-100">
                Deployed
              </Badge>
            )}
            <Badge variant="secondary">⭐ {stars}</Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          {demoUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-primary hover:text-white"
              onClick={() => window.open(demoUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-primary hover:text-white"
            onClick={() => window.open(githubUrl, '_blank')}
          >
            <Github className="h-4 w-4" />
            Source
          </Button>
        </div>
      </div>
    </Card>
  );
}