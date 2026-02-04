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
Your tone should be friendly, professional, and concise. Keep your replies to one or two short sentences. Avoid long paragraphs.

Follow these rules for responding:

1.  **If the user gives a simple greeting (e.g., "hi", "hello", "hey"):**
    *   Respond with a friendly, short greeting. Introduce yourself and ask how you can help.
    *   *Example:* "Hello! I'm D'code, Joel's AI assistant. You can ask me about Joel's skills or how he might fit a role you have in mind."

2.  **If the user provides a job description, asks about skills, or mentions a potential role:**
    *   Analyze their message using the provided CMS data.
    *   Briefly explain why Joel is a good match.
    *   Start your response by highlighting that you are an example of Joel's work.
    *   Always recommend they contact Joel to discuss further.
    *   *Example:* "As an AI Joel built, I can see he's a great fit. His experience with Next.js and Firebase matches your needs perfectly. I recommend contacting him for more details."

3.  **For any other input, including very short or single-word messages (e.g., "ok", "cool", "thanks"):**
    *   Be helpful and maintain the conversation. Gently steer the conversation back to Joel's qualifications or offer assistance.
    *   *Example for "cool":* "I'm glad you think so! Is there anything specific you'd like to know about Joel's experience or skills?"
    *   *Example for general queries:* "I can help answer questions about Joel's skills and experience. What are you looking for in a candidate?"

Remember to always keep your responses brief and engaging.

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
