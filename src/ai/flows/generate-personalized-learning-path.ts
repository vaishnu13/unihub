'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized learning paths based on a student's hireability score.
 *
 * - generatePersonalizedLearningPath - A function that generates a personalized learning path.
 * - GeneratePersonalizedLearningPathInput - The input type for the generatePersonalizedLearningPath function.
 * - GeneratePersonalizedLearningPathOutput - The return type for the generatePersonalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedLearningPathInputSchema = z.object({
  hireabilityScore: z
    .number()
    .describe("The student's hireability score, a number between 0 and 100."),
  studentSkills: z.array(z.string()).describe('A list of the student skills.'),
});
export type GeneratePersonalizedLearningPathInput = z.infer<
  typeof GeneratePersonalizedLearningPathInputSchema
>;

const GeneratePersonalizedLearningPathOutputSchema = z.object({
  learningPath: z.string().describe('A personalized learning path for the student.'),
});
export type GeneratePersonalizedLearningPathOutput = z.infer<
  typeof GeneratePersonalizedLearningPathOutputSchema
>;

export async function generatePersonalizedLearningPath(
  input: GeneratePersonalizedLearningPathInput
): Promise<GeneratePersonalizedLearningPathOutput> {
  return generatePersonalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedLearningPathPrompt',
  input: {schema: GeneratePersonalizedLearningPathInputSchema},
  output: {schema: GeneratePersonalizedLearningPathOutputSchema},
  prompt: `You are an expert career counselor specializing in creating personalized learning paths for students.

  Based on the student's hireability score of {{hireabilityScore}} and their current skills:
  {{#if studentSkills}}
  Skills:
  {{#each studentSkills}}
  - {{{this}}}
  {{/each}}
  {{else}}
  No skills listed.
  {{/if}}

  Generate a personalized learning path for the student, focusing on improving their skills and increasing their hireability. The learning path should be detailed and actionable, including specific courses, projects, and experiences.
  `,
});

const generatePersonalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedLearningPathFlow',
    inputSchema: GeneratePersonalizedLearningPathInputSchema,
    outputSchema: GeneratePersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
