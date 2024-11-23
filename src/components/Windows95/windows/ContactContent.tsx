import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Github, Linkedin, Twitter, Globe } from 'lucide-react';

export function ContactContent() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Get in Touch</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Your name" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="your@email.com" />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <Textarea
              placeholder="Write your message here..."
              className="min-h-[150px]"
            />
          </div>
          <Button type="submit">Send Message</Button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Connect With Me</h2>

        <div className="grid gap-4">
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            title="Email"
            value="ao.noreply@gmail.com"
            link="mailto:ao.noreply@gmail.com"
          />
          <ContactCard
            icon={<Github className="h-5 w-5" />}
            title="GitHub"
            value="github.com/DWE-CLOUD"
            link="https://github.com/DWE-CLOUD"
          />
          <ContactCard
            icon={<Linkedin className="h-5 w-5" />}
            title="LinkedIn"
            value="linkedin.com/in/ohri-akshit"
            link="https://linkedin.com/in/ohri-akshit"
          />
          <ContactCard
            icon={<Twitter className="h-5 w-5" />}
            title="Twitter"
            value="@DWOSCLOUD"
            link="https://twitter.com/DWOSCLOUD"
          />
          <ContactCard
            icon={<Globe className="h-5 w-5" />}
            title="Website"
            value="dwos.cloud"
            link="https://dwos.cloud"
          />
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  value,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
}) {
  return (
    <Card
      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => window.open(link, '_blank')}
    >
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-blue-600">{value}</p>
        </div>
      </div>
    </Card>
  );
}
