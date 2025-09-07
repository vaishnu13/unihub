'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { recommendRelevantInternships, type RecommendRelevantInternshipsOutput } from '@/ai/flows/recommend-relevant-internships';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Briefcase, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  studentProfile: z.string().min(50, 'Please provide a more detailed profile.'),
  desiredIndustry: z.string().min(3, 'Please specify your desired industry.'),
  locationPreferences: z.string().min(3, 'Please specify your location preferences.'),
});

type FormData = z.infer<typeof formSchema>;

export default function RecommendationsPage() {
  const [result, setResult] = useState<RecommendRelevantInternshipsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentProfile: "Computer Science student with strong skills in React, TypeScript, and Node.js. Experience building full-stack web applications. Passionate about creating intuitive user interfaces and solving complex problems. Previous internship focused on frontend development at a SaaS startup.",
      desiredIndustry: "Technology, Software Development, FinTech",
      locationPreferences: "Remote or New York, NY",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const recommendations = await recommendRelevantInternships(data);
      setResult(recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 sticky top-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Get AI Recommendations</CardTitle>
                <CardDescription>
                  Fill in your details to get personalized internship suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="studentProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Profile Summary</FormLabel>
                      <FormControl>
                        <Textarea placeholder="E.g., 3rd year CS student skilled in Python..." {...field} className="h-32" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desiredIndustry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., FinTech, HealthTech" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="locationPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Preferences</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Remote, San Francisco" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Find Internships
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>

      <div className="lg:col-span-2 space-y-6">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed rounded-lg">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Searching for the best opportunities...</p>
          </div>
        )}

        {!isLoading && !result && (
          <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed rounded-lg">
            <Briefcase className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Your Recommended Internships Will Appear Here</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill out the form to get started.
            </p>
          </div>
        )}

        {result && result.internshipRecommendations.map((internship, index) => (
          <Card key={index}>
             <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle>{internship.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><Briefcase className="h-4 w-4"/> {internship.company}</span>
                    </CardDescription>
                </div>
                 <Button asChild>
                    <a href={internship.url} target="_blank" rel="noopener noreferrer">View & Apply</a>
                 </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{internship.description}</p>
            </CardContent>
          </Card>
        ))}
         {result && result.internshipRecommendations.length === 0 && (
             <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed rounded-lg">
                <Briefcase className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Recommendations Found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your profile details or preferences.
                </p>
            </div>
        )}
      </div>
    </div>
  );
}
