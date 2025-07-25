const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
} = require("../controller/blogs");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/admin/all", getAllBlogs);
router.get("/all", getAllBlogs);
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog); 
router.delete("/:id", authMiddleware, deleteBlog);
router.get("/:id", getBlogById);

module.exports = router;
