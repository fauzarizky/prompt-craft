import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { user, _id } = await req.json();

  try {
    await connectToDB();
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      _id,
      {
        $addToSet: {
          likes: user,
        },
        $inc: {
          likesCount: 1,
        },
      },
      { new: true } // to inform that we want to return the updated prompt
    );

    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    console.error("Failed to like prompt:", error);
    return new Response(`Failed to like prompt : ${error}`, { status: 500 });
  }
};
