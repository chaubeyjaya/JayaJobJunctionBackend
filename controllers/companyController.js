import Company from '../models/Company.js';

export const createCompany = async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Company create error:", error.message); // 👈 real error console pe dikhega
    res.status(500).json({ error: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching companies' });
  }
};
