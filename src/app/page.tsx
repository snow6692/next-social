import WhoToFollow from "@/components/follow/WhoToFollow";
import CreatePosts from "@/components/posts/CreatePosts";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="col-span-1 grid gap-6 lg:grid-cols-10">
      <div className="lg:col-span-6">{user ? <CreatePosts /> : null}</div>
      <div className="sticky top-20 hidden lg:col-span-4 lg:block">
        <WhoToFollow />
      </div>
    </div>
  );
}
