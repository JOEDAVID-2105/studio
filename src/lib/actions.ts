
'use server';

import {
  tailorContentToRecruiter,
  type TailorContentToRecruiterOutput,
} from '@/ai/flows/tailor-content-to-recruiter';
import { z } from 'zod';
import { cmsData, experiences, skills } from './data';

const actionSchema = z.object({
  recruiterProfile: z
    .string()
    .min(10, 'Please provide more details about the recruiter.')
    .max(500, 'Profile is too long.'),
});

export type TailorContentState = {
  data: { response: string } | null;
  error: string | null;
  message: string;
};

export async function tailorContentAction(
  prevState: TailorContentState,
  formData: FormData
): Promise<TailorContentState> {
  const validatedFields = actionSchema.safeParse({
    recruiterProfile: formData.get('recruiterProfile'),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error:
        validatedFields.error.flatten().fieldErrors.recruiterProfile?.[0] ||
        'Invalid input.',
      message: 'Failed to tailor content.',
    };
  }

  try {
    const result = await tailorContentToRecruiter({
      recruiterProfile: validatedFields.data.recruiterProfile,
      skills,
      experiences: experiences.map((exp) => exp.title),
      cmsData,
    });
    return {
      data: result,
      error: null,
      message: 'Content tailored successfully.',
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: 'An unexpected error occurred while processing your request.',
      message: 'Failed to tailor content.',
    };
  }
}
