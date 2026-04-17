CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`route_slug` text NOT NULL,
	`author_name` text DEFAULT 'Randonneur' NOT NULL,
	`content` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`is_approved` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE INDEX `comments_route_slug_idx` ON `comments` (`route_slug`);--> statement-breakpoint
CREATE TABLE `reactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`route_slug` text NOT NULL,
	`type` text NOT NULL,
	`session_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `reactions_route_slug_idx` ON `reactions` (`route_slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `reactions_route_session_type_uidx` ON `reactions` (`route_slug`,`session_id`,`type`);