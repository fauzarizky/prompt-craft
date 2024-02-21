"use client";

import Profile from "@components/Profile";
import usePrompt from "@hooks/usePrompt";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function UserProfile({ params }) {
  const { posts, setPosts, fetchPosts, fetchSelectedUserPosts, handleLikePrompt, handleUnLikePrompt } = usePrompt();
  const [isActiveTab, setIsActiveTab] = useState(1);
  const likedPosts = posts.filter((post) => post.likes.find((like) => like.id === params?.id));
  const selectedData = isActiveTab === 1 ? posts : likedPosts;
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const handleEdit = (post) => router.push(`/update-prompt?id=${post._id}`);

  const handleTabChange = (index) => {
    setIsActiveTab(index);
    if (index === 1) fetchSelectedUserPosts(params);
    else if (index === 2) fetchPosts();
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
    fetchSelectedUserPosts(params);
  }, [params.id]);
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s prompts and be inspired by the power of their imagination.`}
      data={selectedData}
      params={params}
      isActive={isActiveTab}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleLikePrompt={handleLikePrompt}
      handleUnLikePrompt={handleUnLikePrompt}
      handleTabChange={handleTabChange}
    />
  );
}

export default UserProfile;
