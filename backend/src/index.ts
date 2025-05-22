import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { db } from './db';
import { tweets } from './db/schema';
import { createTweetSchema } from './validations/tweet';
import { desc } from 'drizzle-orm';

const app = new Hono();

// Enable CORS
app.use('/*', cors());

// Create a new tweet
app.post('/api/tweet', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = createTweetSchema.parse(body);
    
    const newTweet = await db.insert(tweets).values({
      author: validatedData.author,
      content: validatedData.content,
    }).returning();

    return c.json(newTweet[0], 201);
  } catch (error) {
    if (error.name === 'ZodError') {
      return c.json({ error: error.errors }, 400);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get all tweets
app.get('/api/tweets', async (c) => {
  try {
    const allTweets = await db.select().from(tweets).orderBy(desc(tweets.createdAt));
    return c.json(allTweets);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
}); 