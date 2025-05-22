import { z } from 'zod';

export const createTweetSchema = z.object({
  author: z.string().min(1, 'Author name is required'),
  content: z.string()
    .min(1, 'Tweet content is required')
    .max(280, 'Tweet cannot be longer than 280 characters'),
});

export type CreateTweetInput = z.infer<typeof createTweetSchema>; 