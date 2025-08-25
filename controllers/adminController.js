import jwt from "jsonwebtoken";
import ADMIN from "../models/Admin.js";

// Admin login
export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN.email && password === ADMIN.password) {
    // Generate JWT token
    const token = jwt.sign({ name: ADMIN.name }, "secret123", { expiresIn: "1h" });
    return res.json({ token, name: ADMIN.name });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

// Verify token / get admin profile
export const getAdminProfile = (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Token required" });

  try {
    const decoded = jwt.verify(token, "secret123");
    res.json({ name: decoded.name });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
