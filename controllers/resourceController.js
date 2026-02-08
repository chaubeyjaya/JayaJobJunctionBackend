import Resource from "../models/Resource.js";

// ➕ Add Resource (Admin)
export const addResource = async (req, res) => {
  try {
    const { title, description, link, category } = req.body;

    const resource = new Resource({
      title,
      description,
      link,
      category
    });

    await resource.save();

    res.status(201).json({
      success: true,
      message: "Resource added successfully",
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add resource"
    });
  }
};

// 📥 Get All Resources (User)
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resources"
    });
  }
};
