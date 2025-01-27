"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { toggleFollow } from "@/actions/userAction";

function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = async () => {
    setIsLoading(true);

    await toggleFollow(userId);

    toast.success("Followed successfully !");
    try {
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      size={"sm"}
      className="w-20"
      onClick={handleFollow}
      disabled={isLoading}
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Follow"}
    </Button>
  );
}

export default FollowButton;
