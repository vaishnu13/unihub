'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  calculateHireabilityScore,
  type CalculateHireabilityScoreOutput,
} from '@/ai/flows/calculate-hireability-score';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, Sparkles, Briefcase, Bot, ArrowRight, Lightbulb, ShieldAlert, Loader2 } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const overviewCards = [
    {
        title: "Hireability Score",
        description: "Your current readiness for the job market.",
        value: "78/100",
        progress: 78,
        icon: Gauge,
        link: "/dashboard/score"
    },
    {
        title: "Learning Path",
        description: "Your personalized skill-building roadmap.",
        value: "3/7 Modules",
        progress: 42,
        icon: Sparkles,
        link: "/dashboard/learning-path"
    },
    {
        title: "Internships",
        description: "Recommended and saved opportunities.",
        value: "5 Recommended",
        progress: null,
        icon: Briefcase,
        link: "/dashboard/internships/recommendations"
    }
]

const formSchema = z.object({
  skills: z.string().min(10, 'Please list at least some of your skills.'),
  experience: z.string().min(20, 'Please describe your experience in more detail.'),
  projects: z.string().min(20, 'Please describe your projects in more detail.'),
});

type FormData = z.infer<typeof formSchema>;


export default function DashboardPage() {
    const [result, setResult] = useState<CalculateHireabilityScoreOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAssessed, setIsAssessed] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            skills: 'JavaScript, React, Teamwork',
            experience: 'Internship in frontend development, Freelance web projects',
            projects: 'E-commerce website with payment integration, Portfolio website to showcase my work',
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setResult(null);
        try {
            const scoreResult = await calculateHireabilityScore(data);
            setResult(scoreResult);
            setIsAssessed(true);
        } catch (error) {
            console.error('Error calculating score:', error);
            // You can add a toast notification here to inform the user
        } finally {
            setIsLoading(false);
        }
    };


    if (!isAssessed) {
         return (
            <div className="max-w-4xl mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Assess Your Hireability</CardTitle>
                            <CardDescription>
                            Please provide detailed and specific information about the following areas to help us accurately assess your hireability.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="skills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Skills</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="List your technical and soft skills. Enter each skill on a new line."
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projects"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Projects</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe the projects you have worked on. Enter each project on a new line."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="experience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Experience</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your relevant work experience, internships, or volunteer roles. Enter each on a new line."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                Calculate Score
                            </Button>
                        </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
          );
    }


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Welcome back, Student!</h1>
                <p className="text-muted-foreground">Here's a snapshot of your journey to success.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {overviewCards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.title === "Hireability Score" && result ? `${result.score}/100` : card.value}</div>
                            <p className="text-xs text-muted-foreground">{card.description}</p>
                            {card.progress !== null && <Progress value={card.title === "Hireability Score" && result ? result.score : card.progress} className="mt-4 h-2" />}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline">Your Next Step</CardTitle>
                        <CardDescription>Based on your profile, we recommend focusing on this.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="p-4 rounded-md bg-secondary">
                           <h3 className="font-semibold">Master React Hooks</h3>
                           <p className="text-sm text-muted-foreground mt-1">Complete the advanced module in the Web Development course to significantly boost your frontend skills.</p>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Button asChild>
                            <Link href="/dashboard/courses/web-development">Go to Course <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline">AI Tutor</CardTitle>
                        <CardDescription>Stuck on a problem? Get instant help from your personal AI tutor.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="p-4 rounded-md bg-secondary">
                           <p className="text-sm text-muted-foreground italic">"Can you explain the difference between useEffect and useLayoutEffect in React?"</p>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Button asChild>
                            <Link href="/dashboard/tutor">Ask AI Tutor <Bot className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </Card>
            </div>
             {result && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Your Hireability Analysis</CardTitle>
                        <CardDescription>
                         Based on the information you provided.
                        </CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="bg-green-500/10 border-green-500/20">
                            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                              <Lightbulb className="w-5 h-5 text-green-600" />
                              <CardTitle className="text-lg font-headline text-green-800 dark:text-green-300">Strengths</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-green-700 dark:text-green-400">
                              {result.strengths}
                            </CardContent>
                          </Card>
                           <Card className="bg-yellow-500/10 border-yellow-500/20">
                            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                              <ShieldAlert className="w-5 h-5 text-yellow-600" />
                              <CardTitle className="text-lg font-headline text-yellow-800 dark:text-yellow-300">Areas for Improvement</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-yellow-700 dark:text-yellow-400">
                              {result.weaknesses}
                            </CardContent>
                          </Card>
                        </div>
                     </CardContent>
                 </Card>
            )}
        </div>
    );
}
