import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "detai hobe"],
  },
  tags: {
    type: String,
    required: [true, "deo"],
  },
});

const Prompt = models.Prompt || model("Prompt", promptSchema);
export default Prompt;
