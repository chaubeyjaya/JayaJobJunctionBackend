import JobApply from "../models/jobApplyModel.js";
import multer from "multer";
import path from "path";

// ====== FILE UPLOAD CONFIGURATION ======
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder name for saving files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

export const upload = multer({ storage: storage });

// ====== CONTROLLER FUNCTION ======
export const createJobApplication = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File upload is required" });
    }

    const newApplication = new JobApply({
      name,
      email,
      message,
      phone,
      file: req.file.path,
    });

    await newApplication.save();

    res.status(201).json({
      message: "Job application submitted successfully",
      data: newApplication,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



// ====== GET ALL JOB APPLICATIONS ======
export const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApply.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error", error });
  }
};





//today 30 december
// ======================
// MONTHLY STUDENT STATS
// ======================
export const getMonthlyStudentStats = async (req, res) => {
  try {
    const stats = await JobApply.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          students: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const result = stats.map((item) => ({
      name: months[item._id - 1],
      students: item.students,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Monthly Stats Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};