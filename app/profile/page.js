"use client";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const route = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      if (session?.user.id) setPosts(data);
    };
    fetchPosts();
  }, []);
  const handelEdit = async (post) => {
    route.push(`/edit-prompt?id=${post._id}`);
  };
  const handelDel = async (post) => {
    const isconfirm = confirm("sure????");
    if (isconfirm) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      des="hello"
      handelEdit={handelEdit}
      handelDel={handelDel}
      data={posts}
    />
  );
};

export default MyProfile;
