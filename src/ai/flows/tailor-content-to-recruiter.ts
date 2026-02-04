'use server';
/**
 * @fileOverview A Genkit flow that tailors content to a recruiter's profile.
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
  tailoredSkills: z.array(z.string()).describe('The tailored skills.'),
  tailoredExperiences:
    z.array(z.string()).describe('The tailored experiences.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the content tailoring decisions.'),
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
  prompt: `You are an AI assistant specializing in tailoring content for a professional portfolio.

  Based on the recruiter's profile, identify the skills and experiences from the CMS data that are most relevant to the recruiter's interests and the roles they are hiring for.

  Recruiter Profile: {{{recruiterProfile}}}
  Available Skills: {{{skills}}}
  Available Experiences: {{{experiences}}}
  CMS Data: {{{cmsData}}}

  Consider the recruiter's role, industry, and any specific keywords or interests mentioned in their profile.

  Highlight the skills and experiences that align with the recruiter's needs and demonstrate the candidate's suitability for potential job opportunities.

  Provide a concise summary of your reasoning for selecting the tailored skills and experiences.

  Output the tailored skills and experiences as arrays of strings and explain the reasoning in the reasoning field.
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
