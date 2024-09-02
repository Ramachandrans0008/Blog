import express from "express";
const router = express.Router();
import categoryModel from "../Models/category.model.js";

router.get("/", async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const category = await new categoryModel({
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
  });
  try {
    const newcategory = await category.save();
    res.status(201).json(newcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    category.name = req.body.name || category.name;
    category.slug = req.body.slug || category.slug;
    category.description = req.body.description || category.description;
    category.updatedAt = Date.now();

    const updatedcategory = await category.save();
    res.json(updatedcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    await categoryModel.findByIdAndDelete(category._id);
    res.json({ message: "category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
