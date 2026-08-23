"use server";

import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

export async function submitContactMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  await db.insert(contactMessages).values({
    name: data.name,
    email: data.email,
    message: data.message,
  });
}