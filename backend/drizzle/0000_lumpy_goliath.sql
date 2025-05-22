CREATE TABLE `tweets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
