"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

function CreatePrompt() {
  const { data: session } = useSession(false);
  const route = useRouter();
  const [submit, setsubmit] = useState(false);
  const [post, setpost] = useState({
    prompt: "",
    tags: "",
  });
  const createPro = async (e) => {
    e.preventDefault();
    setsubmit(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tags: post.tags,
        }),
      });
      if (response.ok) {
        route.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmit(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      submit={submit}
      setpost={setpost}
      handelsubmit={createPro}
    />
  );
}

export default CreatePrompt;
