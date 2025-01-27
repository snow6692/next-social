"use server";

import prisma from "@/lib/db";
import { getDbUserId } from "./userAction";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, image: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return { success: false, error: "Unauthorized" };

    const post = await prisma.post.create({
      data: {
        image,
        content,
        authorId: userId,
      },
    });
    revalidatePath("/");
    return { success: true, post };
  } catch (error) {
    console.error("Failed to create Post:", error);
    return { success: false, error: "Failed to create post" };
  }
}
