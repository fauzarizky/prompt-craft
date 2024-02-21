"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const PromptCard = ({ post, params, handleTagClick, handleEdit, handleDelete, handleLikePrompt, handleUnLikePrompt }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setcopied] = useState("");
  const isLikedByUser = post?.likes?.find((like) => like.id === session?.user.id);

  const handleLikeBtn = (_id, user) => {
    if (session) {
      handleLikePrompt(_id, user, pathName, session, params);
    } else {
      toast.error("Please sign in to like a prompt");
    }
  };

  const handleUnLikeBtn = (_id, user) => {
    if (session) {
      handleUnLikePrompt(_id, user, pathName, session, params);
    } else {
      toast.error("Please sign in to unlike a prompt");
    }
  };

  const handleCopy = () => {
    setcopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setcopied(""), 3000);
  };

  const handleClickCard = () => {
    if (post.creator._id === session?.user.id) return router.push(`/profile`);
    router.push(`/profile/${post.creator?._id}?name=${post.creator?.username}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image src={post.creator.image} alt="user_image" width={40} height={40} className="rounded-full object-contain" onClick={handleClickCard} />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900" onClick={handleClickCard}>
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500" onClick={handleClickCard}>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image alt="icon" src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"} width={12} height={12} />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>
        #{post.tag}
      </p>

      <div className="flex gap-[3px]">
        {isLikedByUser ? (
          <button onClick={() => handleUnLikeBtn(post._id, session?.user)}>
            <ion-icon name="heart"></ion-icon>
          </button>
        ) : (
          <button onClick={() => handleLikeBtn(post._id, session?.user)}>
            <ion-icon name="heart-outline"></ion-icon>
          </button>
        )}
        <p className="font-inter text-sm">{post.likesCount}</p>
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
