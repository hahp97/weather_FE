import { z } from 'zod';

export const searchSchema = z.object({
  location: z
    .string()
    .min(2, 'Location must have at least 2 characters')
    .max(50, 'Location must not exceed 50 characters'),
});
