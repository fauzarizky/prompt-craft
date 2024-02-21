"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
import usePrompt from "@hooks/usePrompt";

const MyProfile = () => {
  const { data: session } = useSession();
  const { posts, setPosts, fetchPosts, fetchCurrentLoginUserPosts, handleLikePrompt, handleUnLikePrompt } = usePrompt();
  const [isActiveTab, setIsActiveTab] = useState(1);
  const likedPosts = posts.filter((post) => post.likes.find((like) => like.id === session?.user.id));
  const selectedData = isActiveTab === 1 ? posts : likedPosts;
  const router = useRouter();

  const handleEdit = (post) => router.push(`/update-prompt?id=${post._id}`);
  const handleTabChange = (index) => {
    setIsActiveTab(index);
    if (index === 1) {
      fetchCurrentLoginUserPosts(session);
    } else if (index === 2) {
      fetchPosts();
    }
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (session?.user.id) fetchCurrentLoginUserPosts(session);
  }, []);

  return (
    <Profile
      name={"my"}
      desc={"Welcome to your personalized profile page"}
      data={selectedData}
      isActive={isActiveTab}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleTabChange={handleTabChange}
      handleLikePrompt={handleLikePrompt}
      handleUnLikePrompt={handleUnLikePrompt}
    />
  );
};

export default MyProfile;
