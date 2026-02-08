import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: "General"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
