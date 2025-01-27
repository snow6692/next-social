"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { createPost } from "@/actions/postAction";
import { toast } from "sonner";

function CreatePosts() {
  const { user } = useUser();

  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;
    setIsPosting(true);
    try {
      const result = await createPost(content, imageUrl);
      if (result?.success) {
        toast.success("Post created!");
        setContent("");
        setImageUrl("");
      } else {
        toast.error(result?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsPosting(false);
    }
  };
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="size-10">
              <AvatarImage src={user?.imageUrl || " "} />
            </Avatar>
            <Textarea
              placeholder="Write whatever you want"
              className="min-h-[100px] resize-none border-none p-0 text-base focus-visible:ring-0"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>
          {/* Todo: Handle image upload  */}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="mr-2 size-4" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="mr-2 size-4" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreatePosts;
