import { getPosts } from "@/actions/postAction";
import { getDbUserId } from "@/actions/userAction";
import WhoToFollow from "@/components/follow/WhoToFollow";
import CreatePosts from "@/components/posts/CreatePosts";
import PostCard from "@/components/posts/PostCard";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    <div className="col-span-1 grid gap-6 lg:grid-cols-10">
      <div className="lg:col-span-6">
        {user ? <CreatePosts /> : null}

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>
      <div className="sticky top-20 hidden lg:col-span-4 lg:block">
        <WhoToFollow />
      </div>
    </div>
  );
}
