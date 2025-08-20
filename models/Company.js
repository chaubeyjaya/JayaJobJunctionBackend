import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  status: { type: String, required: true },
  email: { type: String, unique: true }  , // 👈 agar email use karna hai
  interviewDate: { type: String },
  interviewLocation: { type: String },
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
export default Company;
