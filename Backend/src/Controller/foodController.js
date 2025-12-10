import Food from "../Model/Food.js";
import { uploadBuffer } from "../Utils/cloudinary.js";
import cloudinary from "../Utils/cloudinary.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createFood = async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    let imageUrl = null;
    let imagePublicId = null;
    if (req.file && req.file.buffer) {
      try {
        const result = await uploadBuffer(req.file.buffer);
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
      } catch (uploadErr) {
        console.error("Image upload failed:", uploadErr && uploadErr.message ? uploadErr.message : uploadErr);
        return res.status(502).json({ message: "Image upload failed", detail: uploadErr.message || String(uploadErr) });
      }
    }

    const newFood = new Food({ name, price, description, category, image: imageUrl, imagePublicId });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    console.error("createFood error:", err && err.stack ? err.stack : err);
    res.status(500).json({ message: err.message || "Failed to create food" });
  }
};

export const updateFood = async (req, res) => {
  try {
    const updatedFields = req.body;

    if (req.file && req.file.buffer) {
      // if existing food has an imagePublicId, delete old image
      const existing = await Food.findById(req.params.id);
      if (existing && existing.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(existing.imagePublicId);
        } catch (e) {
          // ignore deletion errors
        }
      }

      const result = await uploadBuffer(req.file.buffer);
      updatedFields.image = result.secure_url;
      updatedFields.imagePublicId = result.public_id;
    }

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedFood) return res.status(404).json({ message: "Food not found" });
    res.json(updatedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: "Food not found" });
    // delete image from cloudinary if exists
    if (deletedFood.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(deletedFood.imagePublicId);
      } catch (e) {
        // ignore
      }
    }

    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
