ALTER TABLE `comments` ADD `parent_id` integer REFERENCES comments(id);--> statement-breakpoint
ALTER TABLE `comments` ADD `is_author` integer DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX `comments_parent_id_idx` ON `comments` (`parent_id`);