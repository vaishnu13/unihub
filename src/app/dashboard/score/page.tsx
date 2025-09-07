'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  calculateHireabilityScore,
  type CalculateHireabilityScoreOutput,
} from '@/ai/flows/calculate-hireability-score';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Loader2, Lightbulb, ShieldAlert, Sparkles } from 'lucide-react';

const formSchema = z.object({
  skills: z.string().min(10, 'Please list at least some of your skills.'),
  experience: z.string().min(20, 'Please describe your experience in more detail.'),
  projects: z.string().min(20, 'Please describe your projects in more detail.'),
});

type FormData = z.infer<typeof formSchema>;

export default function ScorePage() {
  const [result, setResult] = useState<CalculateHireabilityScoreOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (error) {
      console.error('Error calculating score:', error);
      // You can add a toast notification here to inform the user
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || result) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Your Hireability Score</CardTitle>
            <CardDescription>
              {isLoading ? 'Analyzing your profile...' : 'Based on the information you provided.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Calculating your score...</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Your Score</p>
                  <p className="text-7xl font-bold text-primary">{result.score}</p>
                  <Progress value={result.score} className="mt-4" />
                </div>
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
              </div>
            ) : null}
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4 md:flex-row md:justify-end">
            <Button variant="outline" onClick={() => setResult(null)} disabled={isLoading}>Assess Again</Button>
            <Button asChild>
              <a href="/dashboard/learning-path">Generate Learning Path</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

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
                        Assess My Hireability
                    </Button>
                </CardFooter>
                </Card>
            </form>
        </Form>
    </div>
  );
}