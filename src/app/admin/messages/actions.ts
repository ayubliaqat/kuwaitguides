"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { auth } from "@/auth";

export async function getMessages() {
  return db
    .select()
    .from(contactMessages)
    .orderBy(contactMessages.createdAt);
}

export async function markAsRead(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  await db
    .update(contactMessages)
    .set({ read: true })
    .where(eq(contactMessages.id, id));
}

export async function deleteMessage(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  await db.delete(contactMessages).where(eq(contactMessages.id, id));
}