import { getPosts } from "@/actions/postAction";

export type Posts = Awaited<ReturnType<typeof getPosts>>;
export type Post = Posts[number];
