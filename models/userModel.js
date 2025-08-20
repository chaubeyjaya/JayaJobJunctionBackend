import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  codeExpiresAt: Date,
  tenthMarks: String,
  tenthYear: String,
  tenthSchool: String,
  twelfthMarks: String,
  twelfthYear: String,
  twelfthSchool: String,
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;

