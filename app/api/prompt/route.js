import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const search = url.searchParams.get("search");

    let prompts = await Prompt.find({}).populate("creator");

    if (search) {
      const searchLower = search.toLowerCase();
      prompts = prompts.filter(
        (prompt) =>
          (prompt.creator.email &&
            prompt.creator.email.toLowerCase().includes(searchLower)) ||
          (prompt.tags && prompt.tags.toLowerCase().includes(searchLower)) ||
          (prompt.prompt && prompt.prompt.toLowerCase().includes(searchLower))
      );
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("faileddddddd", { status: 500 });
  }
};
