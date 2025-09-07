import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { Gauge, Sparkles, Briefcase, BookOpen, Bot, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const features = [
  {
    icon: <Gauge className="h-8 w-8 text-primary" />,
    title: 'Hireability Score',
    description: 'Get a data-driven score on your employability and identify areas for improvement.',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'Personalized Learning',
    description: 'Receive a custom learning path with courses and projects to boost your skills.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: 'Internship Matching',
    description: 'Discover internship opportunities perfectly tailored to your profile and ambitions.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Tutor',
    description: 'Ask questions and master any subject with your 24/7 AI-powered academic guide.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Logo />
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="#team" className="text-muted-foreground transition-colors hover:text-foreground">
              Our Team
            </Link>
          </nav>
          <div className="flex items-center gap-4 ml-auto">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-0 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
          />
          <div className="container text-center relative">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your Bridge to a Successful Career
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
              UniHub empowers students with AI-driven tools to enhance skills, secure internships, and launch their dream careers.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32 bg-card">
          <div className="container">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                All-in-One Career Platform
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to go from classroom to career, powered by AI.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-32">
          <div className="container grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                From University Halls to Industry Leader
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                UniHub was born from a simple idea: to bridge the gap between academic learning and professional success. We provide students with the tools and insights needed to thrive in today's competitive job market.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform uses cutting-edge AI to deliver personalized guidance, ensuring every student has a clear path to achieving their career goals.
              </p>
            </div>
            <div className="w-full h-80 relative rounded-lg overflow-hidden">
               <Image
                src="https://picsum.photos/600/400"
                alt="Students collaborating"
                data-ai-hint="students collaborating"
                fill
                className="object-cover"
                />
            </div>
          </div>
        </section>
        
        <section id="team" className="py-20 md:py-32">
            <div className="container">
                <div className="text-center">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        Our Team
                    </div>
                    <h2 className="mt-4 font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                        Meet the Founder
                    </h2>
                </div>
                <div className="mt-16 flex justify-center">
                    <Card className="w-full max-w-xs text-center">
                        <CardContent className="p-6">
                            <Avatar className="h-24 w-24 mx-auto mb-4">
                                <AvatarImage src="https://picsum.photos/200" data-ai-hint="person face"/>
                                <AvatarFallback>VV</AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-bold font-headline">Vaishnu Vindula</h3>
                            <p className="text-sm text-muted-foreground">Founder</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

      </main>
        <div className="fixed bottom-4 right-4 z-50">
            <Button size="icon" className="rounded-full w-14 h-14 bg-purple-600 hover:bg-purple-700 shadow-lg">
                <MessageSquare className="h-6 w-6" />
            </Button>
        </div>
      <footer id="contact" className="border-t">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} UniHub. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground text-center">Any issues or queries? Mail us at: <a href="mailto:unihub.in@gmail.com" className="underline">unihub.in@gmail.com</a></p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
