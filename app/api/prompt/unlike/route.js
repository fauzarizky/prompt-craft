import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, promptId } = req.body;

  try {
    await connectToDB();
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      promptId,
      {
        $pull: { // to remove the userId from the likes array
          likes: userId,
        },
        $inc: { // decrement the likesCount by 1
          likesCount: -1,
        },
      },
      { new: true } // to inform that we want to return the updated prompt
    );

    res.status(200).json({
      ok: true,
      data: updatedPrompt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to unlike prompt",
    });
  }
};
