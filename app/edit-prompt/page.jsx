"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

function EditPrompt() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submit, setsubmit] = useState(false);
  const [post, setpost] = useState({
    prompt: "",
    tags: "",
  });

  useEffect(() => {
    const fetchPromptData = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setpost({
        prompt: data.prompt,
        tags: data.tags,
      });
    };
    if (promptId) fetchPromptData();
  }, [promptId]);
  const EditPro = async (e) => {
    e.preventDefault();
    setsubmit(true);

    if (!promptId) alert("id nai");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
      type="Edit"
      post={post}
      submit={submit}
      setpost={setpost}
      handelsubmit={EditPro}
    />
  );
}

export default EditPrompt;
