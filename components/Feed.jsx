"use client";

import { useEffect, useState } from "react";
import PromptCard from "@components/PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const PromptCardList = ({ data, handelTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post, index) => (
          <PromptCard key={index} handelTagClick={handelTagClick} post={post} />
        ))}
      </div>
    );
  };

  const handelSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt?search=${searchText}`);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search"
          value={searchText}
          onChange={handelSearch}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handelTagClick={() => {}} />
    </section>
  );
};

export default Feed;
