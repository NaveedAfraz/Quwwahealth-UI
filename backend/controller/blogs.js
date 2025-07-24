const db = require("../db");
const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      status = "Draft",
      tags,
      featured_image_url,
      meta_title,
      meta_description,
    } = req.body;
    console.log(req.body);
    // Validate required fields
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title, content, and excerpt are required." });
    }

    // const blogData = {
    //   title,
    //   content,
    //   excerpt,
    //   category,
    //   status: status === 'Published' ? 'Published' : 'Draft',
    //   tags: parseTags(tags),
    //   featured_image_url: featured_image_url || '',
    //   meta_title: meta_title?.slice(0, 60) || '',
    //   meta_description: meta_description?.slice(0, 160) || ''
    // };

    const blog = await db.query(
      `INSERT INTO blogs (
        title, content, excerpt, category, status, tags, 
        featured_image_url, meta_title, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        content,
        excerpt || '',
        category,
        status || 'Draft',
        tags,
        featured_image_url,
        meta_title || '',
        meta_description || '',
      ]
    );
    const [newBlog] = await db.query("SELECT * FROM blogs WHERE id = ?", [
      blog.insertId,
    ]);
    const newblog = newBlog[0];

    return res
      .status(201)
      .json({
        message: "Blog created successfully",
        blog: newblog,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to create blog", success: false });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const [blogs] = await db.query("SELECT * FROM blogs");
    console.log(blogs);

    return res
      .status(200)
      .json({ message: "Blogs fetched successfully", blogs, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch blogs", success: false });
  }
};

const updateBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      status = "Draft",
      tags,
      featured_image_url,
      meta_title,
      meta_description,
    } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Title, content, and category are required." });
    }

    const blog = await db.query(
      `UPDATE blogs SET 
        title = ?, 
        content = ?, 
        excerpt = ?, 
        category = ?, 
        status = ?, 
        tags = ?, 
        featured_image_url = ?, 
        meta_title = ?, 
        meta_description = ? 
      WHERE id = ?`,
      [
        title,
        content,
        excerpt || '',
        category,
        status || 'Draft',
        tags,
        featured_image_url,
        meta_title || '',
        meta_description,
        req.params.id,
      ]
    );
    const [updatedBlog] = await db.query("SELECT * FROM blogs WHERE id = ?", [
      req.params.id,
    ]);
    const updatedblog = updatedBlog[0];

    return res
      .status(200)
      .json({
        message: "Blog updated successfully",
        blog: updatedblog,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update blog", success: false });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await db.query("DELETE FROM blogs WHERE id = ?", [
      req.params.id,
    ]);
    console.log(blog);
    const deletedblog = blog;
    return res
      .status(200)
      .json({
        message: "Blog deleted successfully",
        blog: deletedblog,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to delete blog", success: false });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
