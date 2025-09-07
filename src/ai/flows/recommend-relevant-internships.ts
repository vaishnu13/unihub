'use server';

/**
 * @fileOverview Recommends relevant internships based on a student's skills and experience.
 *
 * - recommendRelevantInternships - A function that recommends internships tailored to the student's profile.
 * - RecommendRelevantInternshipsInput - The input type for the recommendRelevantInternships function.
 * - RecommendRelevantInternshipsOutput - The return type for the recommendRelevantInternships function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendRelevantInternshipsInputSchema = z.object({
  studentProfile: z
    .string()
    .describe("A detailed profile of the student, including skills, experience, projects, and education."),
  desiredIndustry: z
    .string()
    .describe("The student's preferred industry for the internship."),
  locationPreferences: z
    .string()
    .describe("The student's location preferences for the internship (e.g., remote, city, state)."),
});
export type RecommendRelevantInternshipsInput = z.infer<typeof RecommendRelevantInternshipsInputSchema>;

const RecommendRelevantInternshipsOutputSchema = z.object({
  internshipRecommendations: z.array(
    z.object({
      title: z.string().describe("The title of the internship."),
      company: z.string().describe("The company offering the internship."),
      description: z.string().describe("A brief description of the internship."),
      url: z.string().url().describe("The URL to the internship posting."),
    })
  ).describe("A list of internship recommendations tailored to the student's profile."),
});
export type RecommendRelevantInternshipsOutput = z.infer<typeof RecommendRelevantInternshipsOutputSchema>;

export async function recommendRelevantInternships(input: RecommendRelevantInternshipsInput): Promise<RecommendRelevantInternshipsOutput> {
  return recommendRelevantInternshipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendRelevantInternshipsPrompt',
  input: {schema: RecommendRelevantInternshipsInputSchema},
  output: {schema: RecommendRelevantInternshipsOutputSchema},
  prompt: `You are an AI assistant designed to recommend relevant internships to students.

  Based on the student's profile, desired industry, and location preferences, provide a list of internship recommendations.

  Student Profile: {{{studentProfile}}}
  Desired Industry: {{{desiredIndustry}}}
  Location Preferences: {{{locationPreferences}}}

  Please provide the internship recommendations in the following JSON format:
  {{$instructions}}
  `,
});

const recommendRelevantInternshipsFlow = ai.defineFlow(
  {
    name: 'recommendRelevantInternshipsFlow',
    inputSchema: RecommendRelevantInternshipsInputSchema,
    outputSchema: RecommendRelevantInternshipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
