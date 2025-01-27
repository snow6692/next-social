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

// random posts
export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.log("Error in get posts", error);
    throw new Error("Failed to fetch posts");
  }
}

// TODO: Posts from your own followers

export async function toggleLike(postId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;

    //check existing like
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: { authorId: true },
    });

    if (!post) throw new Error("Post not found ");
    if (existingLike) {
      //unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      //like and a notification (when like someone else post)
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            postId,
          },
        }),
        // if not the owner
        ...(post.authorId !== userId
          ? [
              prisma.notification.create({
                data: {
                  type: "LIKE",
                  userId: post.authorId,
                  creatorId: userId,
                  postId,
                },
              }),
            ]
          : []),
      ]);
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Failed to toggle like :", error);
    return { success: true, error: "Failed to toggle like" };
  }
}

export async function addComment(
  postId: string,
  content: string,
  image?: string,
) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;
    if (!content) throw new Error("Content is required");

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });
    if (!post) throw new Error("Post not found");
    //Create a comment and a notification
    const [comment] = await prisma.$transaction(async (tx) => {
      //Create comment
      const newComment = await tx.comment.create({
        data: {
          content,
          image,
          authorId: userId,
          postId,
        },
      });

      //create the notification when comment on someone else's post
      if (post.authorId !== userId) {
        await tx.notification.create({
          data: {
            type: "COMMENT",
            userId: post.authorId,
            creatorId: userId,
            postId,
            commentId: newComment.id,
          },
        });
      }
      revalidatePath(`/`);
      return [newComment];
    });
    return { success: true, comment };
  } catch (error) {
    return { success: false, error: "Failed to create comment" };
  }
}

export async function deletePost(postId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    if (!post) throw new Error("Post not found");
    if (post.authorId !== userId)
      throw new Error("Unauthorized can't delete  this post ");
    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Failed to delete the post");
    return { success: false, error: "Failed to delete the post" };
  }
}
