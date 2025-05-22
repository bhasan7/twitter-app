import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const tweets = sqliteTable('tweets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  author: text('author').notNull(),
  content: text('content').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type Tweet = typeof tweets.$inferSelect;
export type NewTweet = typeof tweets.$inferInsert; 