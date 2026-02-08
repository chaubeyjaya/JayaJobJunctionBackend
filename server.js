import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js'; // ✅ import router
import adminRoutes from "./routes/adminRoutes.js";
import jobApplyRoutes from "./routes/jobApplyRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
//nodejs version solve prblm
import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1', '8.8.8.8']);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // to serve uploaded files
// Routes
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes); // 👈 use company routes

app.use("/api/admin", adminRoutes);// Admin routes

app.use("/api/jobapply", jobApplyRoutes);


//resources
app.use("/api/resources", resourceRoutes);

// Connect to DB and start server
connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
 
});
