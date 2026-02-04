'use server';
/**
 * @fileOverview A Genkit flow that acts as an intelligent guide for a portfolio.
 *
 * - tailorContentToRecruiter - A function that tailors content based on recruiter profile.
 * - TailorContentToRecruiterInput - The input type for the tailorContentToRecruiter function.
 * - TailorContentToRecruiterOutput - The return type for the tailorContentToRecruiter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorContentToRecruiterInputSchema = z.object({
  recruiterProfile: z
    .string()
    .describe('The profile of the recruiter, including their role and interests.'),
  skills: z.array(z.string()).describe('The skills to highlight.'),
  experiences: z.array(z.string()).describe('The experiences to highlight.'),
  cmsData: z
    .string()
    .describe('The data from the CMS tool containing available skills and experiences.'),
});

export type TailorContentToRecruiterInput = z.infer<
  typeof TailorContentToRecruiterInputSchema
>;

const TailorContentToRecruiterOutputSchema = z.object({
  response: z
    .string()
    .describe(
      "A conversational response explaining why Joel is a good fit, ending with a call to action to contact him."
    ),
});

export type TailorContentToRecruiterOutput = z.infer<
  typeof TailorContentToRecruiterOutputSchema
>;

export async function tailorContentToRecruiter(
  input: TailorContentToRecruiterInput
): Promise<TailorContentToRecruiterOutput> {
  return tailorContentToRecruiterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailorContentToRecruiterPrompt',
  input: {schema: TailorContentToRecruiterInputSchema},
  output: {schema: TailorContentToRecruiterOutputSchema},
  prompt: `You are D'code, a friendly and professional AI assistant for Joel David's portfolio. Your purpose is to help visitors, especially recruiters, understand Joel's skills.
Keep your replies short and conversational, not long paragraphs. A single sentence or two is best.

1.  **If the user says "hi" or "hello" or a similar greeting:** Respond with a friendly, short greeting. Introduce yourself and ask how you can help.
    *   *Example:* "Hello! I'm D'code, Joel's AI assistant. You can ask me about Joel's skills or how he might fit a role you have in mind."

2.  **If the user gives a job description or asks about skills:**
    *   Analyze their message using the provided CMS data.
    *   Briefly explain why Joel is a good match.
    *   Start your response by introducing yourself as an example of Joel's work.
    *   Always recommend they contact Joel to discuss further.
    *   *Example:* "As an AI Joel built, I can see he's a great fit. His experience with Next.js and Firebase matches your needs perfectly. I recommend contacting him for more details."

3.  **For any other input:** Be helpful, but steer the conversation back to Joel's qualifications.
    *   *Example:* "I can help answer questions about Joel's skills and experience. What are you looking for in a candidate?"

Remember to keep it short!

User Input: {{{recruiterProfile}}}
Joel's Skills & Experience (CMS Data): {{{cmsData}}}

Generate a response.`,
});

const tailorContentToRecruiterFlow = ai.defineFlow(
  {
    name: 'tailorContentToRecruiterFlow',
    inputSchema: TailorContentToRecruiterInputSchema,
    outputSchema: TailorContentToRecruiterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
