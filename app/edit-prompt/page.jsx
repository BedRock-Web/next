"use client";
import { useEffect, useState, Suspense } from "react"; // Import Suspense from React
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

function EditPrompt() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tags: "",
  });

  useEffect(() => {
    const fetchPromptData = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tags: data.tags,
      });
    };
    if (promptId) fetchPromptData();
  }, [promptId]);

  const EditPro = async (e) => {
    e.preventDefault();
    setSubmit(true);

    if (!promptId) alert("ID not provided");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
        }),
        headers: {
          "Content-Type": "application/json", // Ensure the content type is set
        },
      });
      if (response.ok) {
        route.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      submit={submit}
      setpost={setPost}
      handelsubmit={EditPro}
    />
  );
}

const EditPromptWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
};

export default EditPromptWithSuspense;
