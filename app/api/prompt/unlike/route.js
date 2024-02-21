import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { user, _id } = await req.json();
  try {
    await connectToDB();
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      _id,
      {
        $pull: {
          // to remove the user from the likes array
          likes: user,
        },
        $inc: {
          // decrement the likesCount by 1
          likesCount: -1,
        },
      },
      { new: true } // to inform that we want to return the updated prompt
    );

    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    console.error("Failed to unlike prompt:", error);
    return new Response(`Failed to unlike prompt`, { status: 500 });
  }
};
