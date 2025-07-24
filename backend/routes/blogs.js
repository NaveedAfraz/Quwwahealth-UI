const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogs");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/admin/all", authMiddleware, getAllBlogs);
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
