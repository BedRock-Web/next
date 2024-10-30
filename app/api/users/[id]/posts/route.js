import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (res, { params }) => {
  try {
    await connectToDB();
    const posts = await Prompt.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("jhamela hoise", { status: 200 });
  }
};
