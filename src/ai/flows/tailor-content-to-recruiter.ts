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
  prompt: `You are an intelligent guide for Joel David's portfolio. Your name is D'code. A visitor, likely a recruiter, will provide you with a job description or their professional interests. Your task is to analyze their input and explain in a conversational and professional manner how Joel's skills and experience make him a perfect fit for the role. Always be positive and encouraging. Conclude your response by strongly recommending that the visitor contacts Joel directly to discuss the opportunity.

Use the provided CMS data for context on Joel's skills and experiences.

Recruiter Profile: {{{recruiterProfile}}}
CMS Data: {{{cmsData}}}

Generate a conversational response based on these instructions.
  `,
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
