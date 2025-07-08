import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axiosConfig';

// Get all blogs for admin
export const getAdminBlogs = createAsyncThunk('blog/getAdminBlogs', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/blog/admin/all');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch blogs');
  }
});

// Create new blog
export const createBlog = createAsyncThunk('blog/createBlog', async (blogData, { rejectWithValue }) => {
  try {
    const response = await api.post('/blog', blogData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue('An unexpected error occurred while creating the blog.');
  }
});

// Update blog
export const updateBlog = createAsyncThunk('blog/updateBlog', async ({ id, blogData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/blog/${id}`, blogData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue('An unexpected error occurred while updating the blog.');
  }
});

// Delete blog
export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/blog/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to delete blog');
  }
});

// Get blog categories
export const getBlogCategories = createAsyncThunk('blog/getCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/blog/categories');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch categories');
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    categories: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get admin blogs
      .addCase(getAdminBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.blogs = payload?.data?.blogs || payload.blogs || (Array.isArray(payload) ? payload : []);
      })
      .addCase(getAdminBlogs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        state.loading = false;
        const newBlog = payload?.data?.blog || payload.blog || payload;
        if (newBlog?._id) {
          state.blogs.push(newBlog);
          state.success = payload.message || 'Blog created successfully';
        } else {
          state.error = 'Received an invalid response from the server after creating the blog.';
        }
      })
      .addCase(createBlog.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = null;
      })
      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        state.loading = false;
        const updatedBlogData = payload?.data?.blog || payload.blog || payload;

        if (updatedBlogData?._id) {
          const index = state.blogs.findIndex((blog) => blog._id === updatedBlogData._id);
          if (index !== -1) {
            // Preserve existing category if not present in the response
            const category = updatedBlogData.category || state.blogs[index].category;
            state.blogs[index] = { ...state.blogs[index], ...updatedBlogData, category };
          }
          state.success = payload.message || 'Blog updated successfully';
        } else {
          state.error = 'Received an invalid response from the server after updating the blog.';
        }
      })
      .addCase(updateBlog.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, { payload: id }) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog._id !== id);
        state.success = 'Blog deleted successfully';
      })
      .addCase(deleteBlog.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Get categories
      .addCase(getBlogCategories.fulfilled, (state, { payload }) => {
        // Handle various possible API response structures for categories
        state.categories = payload?.data?.categories || payload.categories || (Array.isArray(payload) ? payload : []);
      });
  },
});

export const { clearError, clearSuccess } = blogSlice.actions;
export default blogSlice.reducer; 