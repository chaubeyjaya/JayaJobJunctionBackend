import mongoose from "mongoose";

const jobApplySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  file: {
    type: String, // file path or URL
    required: true,
  },
}, { timestamps: true });

const JobApply = mongoose.model("JobApply", jobApplySchema);

export default JobApply;
