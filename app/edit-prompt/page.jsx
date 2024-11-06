import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchPromptData = async () => {
      if (promptId) {
        const res = await fetch(`/api/prompt/${promptId}`);
        const data = await res.json();
        setPost({
          prompt: data.prompt,
          tags: data.tags,
        });
      }
      setLoading(false); // Set loading to false after fetching data
    };

    if (promptId) {
      fetchPromptData();
    } else {
      setLoading(false); // If no promptId, no need to fetch
    }
  }, [promptId]);

  const EditPro = async (e) => {
    e.preventDefault();
    setSubmit(true);

    if (!promptId) {
      alert("ID not provided");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
        }),
        headers: {
          "Content-Type": "application/json",
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

  // If loading, show a fallback loader
  if (loading) {
    return <div>Loading...</div>;
  }

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

export default EditPrompt;
