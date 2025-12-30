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






// 🗑️ DELETE COMPANY (ADD THIS)
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company deleted successfully",
      company: deletedCompany,
    });
  } catch (error) {
    console.error("Company delete error:", error.message);
    res.status(500).json({ error: error.message });
  }
};




//today 30 december
// 📊 COMPANY GRAPH (1 BAR = 1 COMPANY)
export const getCompanyStats = async (req, res) => {
  try {
    const companies = await Company.find();

    const result = companies.map((company) => ({
      name: company.name,   // ✅ MODEL FIELD
      applications: 1,      // each company = 1 bar
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 🔢 TOTAL COMPANIES COUNT
export const getTotalCompanies = async (req, res) => {
  try {
    const total = await Company.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json(err);
  }
};