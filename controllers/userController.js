import User from '../models/userModel.js';
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// export const createUser = async (req, res) => {
//   const { name, email,password } = req.body;
//   const newUser = new User({ name, email ,password});
//   await newUser.save();
//   res.status(201).json(newUser);
// };



export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      tenthMarks,
      tenthYear,
      tenthSchool,
      twelfthMarks,
      twelfthYear,
      twelfthSchool,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // Generate OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      name,
      email,
      password,
      tenthMarks,
      tenthYear,
      tenthSchool,
      twelfthMarks,
      twelfthYear,
      twelfthSchool,
      verificationCode: code,
      codeExpiresAt: expiry,
    });

    await newUser.save();

    // Send Email
    await sendVerificationEmail(email, code);

    res.status(201).json({ message: 'User registered. Verification code sent to email.' });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

    if (
      user.verificationCode !== code ||
      user.codeExpiresAt < new Date()
    ) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.codeExpiresAt = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    console.error('❌ Verification error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const sendCode = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // save OTP to DB if needed

    await sendVerificationEmail(email, otp);
    res.status(200).json({ message: 'OTP sent successfully', otp }); // remove OTP in production
  } catch (err) {
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
};
