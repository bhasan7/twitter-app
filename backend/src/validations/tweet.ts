import { z } from 'zod';

export const createTweetSchema = z.object({
  author: z.string()
    .min(1, 'Author name cannot be empty')
    .max(50, 'Author name cannot be longer than 50 characters'),
  content: z.string()
    .min(1, 'Tweet content cannot be empty')
    .max(280, 'Tweet cannot be longer than 280 characters'),
});

export type CreateTweetInput = z.infer<typeof createTweetSchema>; 