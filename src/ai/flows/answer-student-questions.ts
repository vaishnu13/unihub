'use server';

/**
 * @fileOverview AI tutor flow that answers student questions and helps them learn new topics.
 *
 * - answerStudentQuestions - A function that handles answering student questions.
 * - AnswerStudentQuestionsInput - The input type for the answerStudentQuestions function.
 * - AnswerStudentQuestionsOutput - The return type for the answerStudentQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerStudentQuestionsInputSchema = z.object({
  question: z.string().describe('The student\'s question.'),
  context: z.string().optional().describe('Relevant context for the question.'),
});
export type AnswerStudentQuestionsInput = z.infer<typeof AnswerStudentQuestionsInputSchema>;

const AnswerStudentQuestionsOutputSchema = z.object({
  answer: z.string().describe('The AI tutor\'s answer to the question.'),
});
export type AnswerStudentQuestionsOutput = z.infer<typeof AnswerStudentQuestionsOutputSchema>;

export async function answerStudentQuestions(input: AnswerStudentQuestionsInput): Promise<AnswerStudentQuestionsOutput> {
  return answerStudentQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerStudentQuestionsPrompt',
  input: {schema: AnswerStudentQuestionsInputSchema},
  output: {schema: AnswerStudentQuestionsOutputSchema},
  prompt: `You are an AI tutor. Answer the following question from a student:

Question: {{{question}}}

{{#if context}}
Context: {{{context}}}
{{/if}}
`,
});

const answerStudentQuestionsFlow = ai.defineFlow(
  {
    name: 'answerStudentQuestionsFlow',
    inputSchema: AnswerStudentQuestionsInputSchema,
    outputSchema: AnswerStudentQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
