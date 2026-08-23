"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { auth } from "@/auth";
import slugify from "slugify";

export async function getCategories() {
  return db.select().from(categories).orderBy(categories.name);
}

export async function createCategory(name: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const trimmed = name.trim();
  if (!trimmed) throw new Error("Category name is required");

  const [category] = await db
    .insert(categories)
    .values({
      name: trimmed,
      slug: slugify(trimmed, { lower: true, strict: true }),
    })
    .returning();

  return category;
}

export async function deleteCategory(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  // postCategories.categoryId has onDelete: "cascade" in the schema,
  // so links to posts are cleaned up automatically.
  await db.delete(categories).where(eq(categories.id, id));
}