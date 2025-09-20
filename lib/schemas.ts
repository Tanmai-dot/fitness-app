import { z } from 'zod';

export const profileSchema = z.object({
  weight: z.string().min(1, 'Weight is required'),
  weightPhoto: z.any().optional(),
  height: z.string().min(1, 'Height is required'),
  age: z.string().min(1, 'Age is required'),
  gender: z.string().min(1, 'Gender is required'),
  location: z.string().min(1, 'Location is required'),
  state: z.string().min(1, 'State is required'),
  village: z.string().min(1, 'Village is required'),
});

export type ProfileValues = z.infer<typeof profileSchema>;