import { Schema, model, models } from "mongoose";

const time = Date.now();
const currentDate = new Date(time);
const convertToUTC7 = currentDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
  likes: [
    {
      type: String,
    },
  ],
  likesCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: convertToUTC7,
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
