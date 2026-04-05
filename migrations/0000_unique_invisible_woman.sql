CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`route_slug` text NOT NULL,
	`author_name` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`is_approved` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`route_slug` text NOT NULL,
	`type` text NOT NULL,
	`session_id` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
