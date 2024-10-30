import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Get (read)

export const GET = async (res, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("pai nai", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (error) {
    return new Response("somosha", { status: 500 });
  }
};

// patch (update)

export const PATCH = async (res, { params }) => {
  const { tags, prompt } = await res.json();

  try {
    await connectToDB();
    const promptExist = await Prompt.findById(params.id);
    if (!promptExist) return new Response("pai nai", { status: 404 });
    promptExist.prompt = prompt;
    promptExist.tags = tags;
    await promptExist.save();
    return new Response(JSON.stringify(promptExist), { status: 201 });
  } catch (error) {
    return new Response("somosha", { status: 500 });
  }
};

// Delete
export const DELETE = async (res, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("delete hoise", { status: 200 });
  } catch (error) {
    return new Response("somosha", { status: 500 });
  }
};
