import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function BlogContent() {
  const posts = [
    {
      title: "Building Scalable Web Applications with React and TypeScript",
      date: "March 15, 2024",
      excerpt: "Learn how to build maintainable and scalable web applications using React and TypeScript. We'll cover best practices, common pitfalls, and advanced patterns.",
      tags: ["React", "TypeScript", "Web Development"],
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
    },
    {
      title: "Microservices Architecture: A Practical Guide",
      date: "March 10, 2024",
      excerpt: "Explore the world of microservices architecture. Learn about service discovery, load balancing, and how to handle distributed systems challenges.",
      tags: ["Microservices", "Architecture", "Backend"],
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop"
    },
    {
      title: "Getting Started with Cloud Native Development",
      date: "March 5, 2024",
      excerpt: "A comprehensive guide to cloud native development. Learn about containers, Kubernetes, and how to build applications for the cloud.",
      tags: ["Cloud", "Kubernetes", "DevOps"],
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=400&fit=crop"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Latest Posts</h2>
        <Button variant="outline">
          Subscribe to Newsletter
        </Button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.title} className="overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <Badge variant="secondary">{post.readTime}</Badge>
              </div>
              
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.date}</span>
                <Button variant="ghost" className="flex items-center gap-2">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}