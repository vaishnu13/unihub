'use server';
/**
 * @fileOverview Calculates a hireability score for a student based on their skills and experience.
 *
 * - calculateHireabilityScore - A function that calculates the hireability score.
 * - CalculateHireabilityScoreInput - The input type for the calculateHireabilityScore function.
 * - CalculateHireabilityScoreOutput - The return type for the calculateHireabilityScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateHireabilityScoreInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma-separated list of the student\'s skills.'),
  experience: z
    .string()
    .describe(
      'A description of the student\'s work or project experience.'
    ),
  projects: z
    .string()
    .describe('A list of projects the student has worked on.'),
});
export type CalculateHireabilityScoreInput = z.infer<
  typeof CalculateHireabilityScoreInputSchema
>;

const CalculateHireabilityScoreOutputSchema = z.object({
  score: z
    .number()
    .describe(
      'A numerical score (0-100) representing the student\'s hireability.'
    ),
  strengths: z
    .string()
    .describe('A summary of the student\'s strengths.'),
  weaknesses: z
    .string()
    .describe('A summary of the student\'s weaknesses.'),
});
export type CalculateHireabilityScoreOutput = z.infer<
  typeof CalculateHireabilityScoreOutputSchema
>;

export async function calculateHireabilityScore(
  input: CalculateHireabilityScoreInput
): Promise<CalculateHireabilityScoreOutput> {
  return calculateHireabilityScoreFlow(input);
}

const calculateHireabilityScorePrompt = ai.definePrompt({
  name: 'calculateHireabilityScorePrompt',
  input: {schema: CalculateHireabilityScoreInputSchema},
  output: {schema: CalculateHireabilityScoreOutputSchema},
  prompt: `You are an AI career advisor that is skilled in assessing a student's hireability.

  Based on the student's provided skills, experience, and projects, calculate a hireability score from 0 to 100. Also, summarize the student's strengths and weaknesses.

  Skills: {{{skills}}}
  Experience: {{{experience}}}
  Projects: {{{projects}}}
  `,
});

const calculateHireabilityScoreFlow = ai.defineFlow(
  {
    name: 'calculateHireabilityScoreFlow',
    inputSchema: CalculateHireabilityScoreInputSchema,
    outputSchema: CalculateHireabilityScoreOutputSchema,
  },
  async input => {
    const {output} = await calculateHireabilityScorePrompt(input);
    return output!;
  }
);
