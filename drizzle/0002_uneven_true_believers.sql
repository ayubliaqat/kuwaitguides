CREATE INDEX "faqs_post_id_idx" ON "faqs" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "post_categories_post_id_idx" ON "post_categories" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "post_categories_category_id_idx" ON "post_categories" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "post_tags_post_id_idx" ON "post_tags" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "post_tags_tag_id_idx" ON "post_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "posts_status_idx" ON "posts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "posts_author_id_idx" ON "posts" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "related_posts_post_id_idx" ON "related_posts" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "related_posts_related_post_id_idx" ON "related_posts" USING btree ("related_post_id");