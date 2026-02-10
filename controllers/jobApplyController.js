
//ekdm shi code hai  ye 

// import JobApply from "../models/jobApplyModel.js";
// import multer from "multer";
// import path from "path";

// // ====== FILE UPLOAD CONFIGURATION ======
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // folder name for saving files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
//   },
// });

// export const upload = multer({ storage: storage });

// // ====== CONTROLLER FUNCTION ======
// export const createJobApplication = async (req, res) => {
//   try {
//     const { name, email, message, phone } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "File upload is required" });
//     }

//     const newApplication = new JobApply({
//       name,
//       email,
//       message,
//       phone,
//       file: req.file.path,
//     });

//     await newApplication.save();

//     res.status(201).json({
//       message: "Job application submitted successfully",
//       data: newApplication,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };


// // ====== GET ALL JOB APPLICATIONS ======
// export const getAllApplications = async (req, res) => {
//   try {
//     const applications = await JobApply.find().sort({ createdAt: -1 });
//     res.status(200).json(applications);
//   } catch (error) {
//     console.error("Error fetching applications:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// //today 30 december
// // ======================
// // MONTHLY STUDENT STATS
// // ======================
// export const getMonthlyStudentStats = async (req, res) => {
//   try {
//     const stats = await JobApply.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           students: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//     ];

//     const result = stats.map((item) => ({
//       name: months[item._id - 1],
//       students: item.students,
//     }));

//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Monthly Stats Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };





//10 feb
//upr wala comment kiya huw a code ekdm shi hai but ye wala mai esliye banai hu ki company ka bhi dteial aaye user jb apply kre job ke liye to
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
    // ✅ Extract ALL fields including company data
    const { 
      name, 
      email, 
      message, 
      phone,
      companyId,        // ✅ Add this
      companyName,      // ✅ Add this
      companyAddress,   // ✅ Add this
      companyContact    // ✅ Add this
    } = req.body;

    // ✅ DEBUG: Check what data is coming
    console.log("📦 Received data:", req.body);
    console.log("📎 File:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "File upload is required" });
    }

    // ✅ Create application with company data
    const newApplication = new JobApply({
      name,
      email,
      message,
      phone,
      file: req.file.path,
      companyId,        // ✅ Save company ID
      companyName,      // ✅ Save company name
      companyAddress,   // ✅ Save company address
      companyContact,   // ✅ Save company contact
    });

    await newApplication.save();

    res.status(201).json({
      message: "Job application submitted successfully",
      data: newApplication,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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

// ✅ BONUS: Get applications by company
export const getApplicationsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const applications = await JobApply.find({ companyId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      companyName: applications[0]?.companyName || "Unknown",
      totalApplications: applications.length,
      applications
    });
  } catch (error) {
    console.error("Error fetching company applications:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ BONUS: Get company-wise stats
export const getCompanyWiseStats = async (req, res) => {
  try {
    const stats = await JobApply.aggregate([
      {
        $group: {
          _id: "$companyName",
          totalApplications: { $sum: 1 },
          companyId: { $first: "$companyId" },
          companyAddress: { $first: "$companyAddress" },
        },
      },
      { $sort: { totalApplications: -1 } },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error("Company Stats Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};