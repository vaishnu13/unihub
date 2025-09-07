'use client';

import { useState } from 'react';
import { generatePersonalizedLearningPath } from '@/ai/flows/generate-personalized-learning-path';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';

export default function LearningPathPage() {
  const [learningPath, setLearningPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePath = async () => {
    setIsLoading(true);
    setLearningPath('');
    try {
      const result = await generatePersonalizedLearningPath({
        hireabilityScore: 78, // Mock score
        studentSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
      });
      setLearningPath(result.learningPath);
    } catch (error) {
      console.error('Error generating learning path:', error);
      setLearningPath('Sorry, there was an error generating your learning path. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your Personalized Learning Path</CardTitle>
          <CardDescription>
            Let our AI craft a unique learning roadmap to help you reach your career goals based on your current profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!learningPath && !isLoading && (
            <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed rounded-lg">
              <Sparkles className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Ready to level up?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Click the button below to generate your personalized path.
              </p>
              <Button onClick={handleGeneratePath} className="mt-6">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate My Path
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Crafting your personal roadmap...</p>
            </div>
          )}

          {learningPath && (
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:font-headline prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">
              <pre className="whitespace-pre-wrap font-body text-sm bg-secondary p-4 rounded-md">
                {learningPath}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
