"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { toast } from "sonner";

const PromptCardList = ({ data, handleTagClick, handleLikePrompt, handleUnLikePrompt }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} handleLikePrompt={handleLikePrompt} handleUnLikePrompt={handleUnLikePrompt} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
  };

  const handleTagClick = async (tag) => {
    setSearchText(tag);

    const searchResult = filterPosts(tag);
    setSearchedResults(searchResult);
  };

  const handleLikePrompt = async (promptId, userId) => {

    try {
      const response = await fetch('/api/prompt/like', {
        method: 'POST',
        body: JSON.stringify({
          promptId,
          userId
        })
      })

      if (response.ok){
        fetchPosts()
        toast({
          title: "Success",
          message: "Liked prompt",
          type: "success",
          duration: 1500
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        message: "Failed to like prompt",
        type: "error",
        duration: 1500
      })
    }
  }

  const handleUnLikePrompt = async (promptId, userId) => {
    try {
      const response = await fetch('/api/prompt/unlike', {
        method: 'POST',
        body: JSON.stringify({
          promptId,
          userId
        })
      })

      if (response.ok){
        fetchPosts()
        toast({
          title: "Success",
          message: "Unliked prompt",
          type: "success",
          duration: 1500
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        message: "Failed to like prompt",
        type: "error",
        duration: 1500
      })
    }
  }

  const filterPosts = (search) => {
    const regex = new RegExp(search, "i"); // i for case insensitive
    return posts.filter((post) => regex.test(post.prompt) || regex.test(post.creator.username) || regex.test(post.tag));
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>

      {searchText ? <PromptCardList data={searchedResults} handleTagClick={handleTagClick} handleLikePrompt={handleLikePrompt} /> : <PromptCardList data={posts} handleTagClick={handleTagClick} handleLikePrompt={handleLikePrompt} handleUnLikePrompt={handleUnLikePrompt} />}
    </section>
  );
};

export default Feed;
