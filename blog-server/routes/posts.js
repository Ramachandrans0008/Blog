import express from "express";
import categoryModel from "../Models/category.model.js";
import postModel from "../Models/posts.model.js";

const router = express.Router();

// Getting all Post
router.get("/", async (req, res) => {
  try {
    const posts = await postModel.find();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting a single post using id
router.get("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post
router.post("/", async (req, res) => {
  const post = new postModel({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    author: req.body.author,
    image: req.body.image,
  });
  try {
    const newpost = await post.save();
    res.status(201).json(newpost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.category = req.body.category || post.category;
    post.author = req.body.author || post.author;
    post.image = req.body.image || post.image;
    post.updateddAt = Date.now();

    const updatedpost = await post.save();
    res.json(updatedpost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    await postModel.findByIdAndDelete(post._id);
    res.json({ message: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch posts by category by id
router.get("/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // validate
    const categoryexists = await categoryModel.findById(categoryId);

    if (!categoryexists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // fetch posts
    const posts = await postModel
      .find({ category: categoryId })
      .populate("category");
    // .populate("category");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
