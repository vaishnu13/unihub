'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { Gauge, Sparkles, Briefcase, BookOpen, Bot, MessageSquare, GraduationCap, Building, UserCheck, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GridTrail } from '@/components/GridTrail';
import { cn } from '@/lib/utils';
import React from 'react';


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

const partners = [
    'DIET',
    'Avanthi Institute',
    'Dr. Lankapalli Bullayya College',
    'NSRIT',
    'Aditya Engineering College',
    'Vignan Institute',
    'GMR Institute of Technology'
]

const platformUsers = [
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: 'For Students',
    description: 'Get an AI-powered Hireability Score, personalized learning paths, and connect directly with recruiters.',
    href: '/signup',
  },
    {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: 'For Companies',
    description: 'Find top talent with advanced filters, ranked lists, and schedule campus drives with a single click.',
    href: '/login',
  },
    {
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: 'For Colleges',
    description: 'Monitor placement stats, identify at-risk students, and manage campus recruitment drives effortlessly.',
    href: '/college/login',
  },
]

export default function Home() {

  React.useEffect(() => {
    const containers = document.querySelectorAll('.glowing-card-container');

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      target.querySelectorAll<HTMLElement>('.glowing-card').forEach(card => {
        card.style.setProperty('--px', `${x}px`);
        card.style.setProperty('--py', `${y}px`);
      });
    };

    containers.forEach(container => {
      container.addEventListener('mousemove', handleMouseMove as EventListener);
    });

    return () => {
      containers.forEach(container => {
        container.removeEventListener('mousemove', handleMouseMove as EventListener);
      });
    };
  }, []);

  return (
    <div className="flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
             <Link href="#partners" className="text-muted-foreground transition-colors hover:text-foreground">
              Partners
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

      <main>
        <section className="relative py-20 md:py-32">
          <GridTrail />
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
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 glowing-card-container">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center glowing-card">
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
          <div className="container">
            <div className="text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                    A Platform for Everyone
                </h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Tailored dashboards and powerful tools for students, colleges, and companies to thrive in the modern talent landscape.
                </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3 glowing-card-container">
                {platformUsers.map((user) => (
                  <Link href={user.href} key={user.title} className="h-full">
                    <Card className="h-full glowing-card">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                {user.icon}
                            </div>
                            <CardTitle className="font-headline text-xl">{user.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{user.description}</p>
                        </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>

         <section id="partners" className="py-20 md:py-32">
            <div className="container">
                <div className="text-center">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        Our Partners
                    </div>
                    <h2 className="mt-4 font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                       Our Journey Begins: Working With Institutions & Employers
                    </h2>
                </div>
                <div className="relative mt-16">
                    <div className="overflow-hidden">
                        <div className="flex gap-6 animate-infinite-scroll">
                            {partners.concat(partners).map((partner, index) => (
                                <Card key={index} className="flex-shrink-0 w-64">
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <GraduationCap className="h-8 w-8 text-primary" />
                                        <p className="font-semibold">{partner}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="team" className="py-20 md:py-32 bg-card">
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
                             <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
                                <User className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-bold font-headline">Vaishnu Vindula</h3>
                            <p className="text-sm text-muted-foreground">Founder</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

      </main>
        <div className="fixed bottom-6 right-6 z-50">
            <Button size="icon" className="rounded-full w-16 h-16 bg-purple-600 hover:bg-purple-700 shadow-lg">
                <MessageSquare className="h-8 w-8" />
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
