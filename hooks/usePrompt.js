import { useEffect, useState } from "react";
import { toast } from "sonner";

const usePrompt = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
  };

  const fetchCurrentLoginUserPosts = async (session) => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();

    setPosts(data);
  };

  const fetchSelectedUserPosts = async (params) => {
    const response = await fetch(`/api/users/${params.id}/posts`);
    const data = await response.json();

    setPosts(data);
  };

  const handleLikePrompt = async (_id, user, path, session, params) => {
    try {
      const response = await fetch("/api/prompt/like", {
        method: "POST",
        body: JSON.stringify({
          _id,
          user,
        }),
      });

      if (response.ok) {
        if (path === "/") fetchPosts();
        else if (path === "/profile") fetchCurrentLoginUserPosts(session);
        else if (path === `/profile/${params?.id}`) fetchSelectedUserPosts(params);
        toast("Prompt liked");
      }
    } catch (error) {
      console.log(error);
      toast("Failed to like prompt");
    }
  };

  const handleUnLikePrompt = async (_id, user, path, session, params) => {
    try {
      const response = await fetch("/api/prompt/unlike", {
        method: "POST",
        body: JSON.stringify({
          _id,
          user,
        }),
      });

      if (response.ok) {
        if (path === "/") fetchPosts();
        else if (path === "/profile") fetchCurrentLoginUserPosts(session);
        else if (path === `/profile/${params?.id}`) fetchSelectedUserPosts(params);
        toast("Prompt unliked");
      }
    } catch (error) {
      console.log(error);
      toast("Failed to unlike prompt");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return {
    posts,
    setPosts,
    fetchPosts,
    fetchCurrentLoginUserPosts,
    fetchSelectedUserPosts,
    handleLikePrompt,
    handleUnLikePrompt,
  };
};

export default usePrompt;
