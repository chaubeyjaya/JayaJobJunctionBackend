import User from '../models/userModel.js';
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';

import jwt from "jsonwebtoken";


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

    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(409).json({ message: 'User already exists with this email' });
    // }

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

//important isse kaam ho rha tha 
// export const verifyCode = async (req, res) => {
//   try {
//     const { email, code } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

//     if (
//       user.verificationCode !== code ||
//       user.codeExpiresAt < new Date()
//     ) {
//       return res.status(400).json({ message: 'Invalid or expired code' });
//     }

//     user.isVerified = true;
//     user.verificationCode = undefined;
//     user.codeExpiresAt = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Email verified successfully!' });
//   } catch (error) {
//     console.error('❌ Verification error:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Find most recent user with this email
    const user = await User.findOne({ email }).sort({ createdAt: -1 });

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isVerified)
      return res.status(400).json({ message: 'User already verified' });

    // Compare OTP and expiry
    if (
      user.verificationCode !== code ||
      new Date(user.codeExpiresAt).getTime() < Date.now()
    ) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    // Mark as verified
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




export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Check if user email is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified. Please verify your account first." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
