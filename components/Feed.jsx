"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import usePrompt from "@hooks/usePrompt";

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
  const { posts, fetchPosts, handleLikePrompt, handleUnLikePrompt } = usePrompt();
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleTagClick = async (tag) => {
    setSearchText(tag);

    const searchResult = filterPosts(tag);
    setSearchedResults(searchResult);
  };

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
        <input type="text" placeholder="Search for a prompt, tag, or username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>

      {searchText ? <PromptCardList data={searchedResults} handleTagClick={handleTagClick} /> : <PromptCardList data={posts} handleTagClick={handleTagClick} handleLikePrompt={handleLikePrompt} handleUnLikePrompt={handleUnLikePrompt} />}
    </section>
  );
};

export default Feed;
