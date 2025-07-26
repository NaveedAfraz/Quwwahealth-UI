import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../config/config";

const api = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
});

// Get all testimonials
export const getTestimonials = createAsyncThunk(
  "testimonial/getTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/testimonials");
      return response.data;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch testimonials"
      );
    }
  }
);

// Get single testimonial by ID
export const getTestimonialById = createAsyncThunk(
  "testimonial/getTestimonialById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/testimonials/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch testimonial"
      );
    }
  }
);

// Create new testimonial
export const createTestimonial = createAsyncThunk(
  "testimonial/createTestimonial",
  async (testimonialData, { rejectWithValue }) => {
    try {
      const response = await api.post("/testimonials", testimonialData);
      return response.data;
    } catch (error) {
      console.error("Error creating testimonial:", error);
      return rejectWithValue(
        error.response?.data || "Failed to create testimonial"
      );
    }
  }
);

// Update testimonial
export const updateTestimonial = createAsyncThunk(
  "testimonial/updateTestimonial",
  async ({ id, ...testimonialData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/testimonials/${id}`, testimonialData);
      return response.data;
    } catch (error) {
      console.error("Error updating testimonial:", error);
      return rejectWithValue(
        error.response?.data || "Failed to update testimonial"
      );
    }
  }
);

// Delete testimonial
export const deleteTestimonial = createAsyncThunk(
  "testimonial/deleteTestimonial",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/testimonials/${id}`);
      return id; // Return the deleted testimonial ID
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      return rejectWithValue(
        error.response?.data || "Failed to delete testimonial"
      );
    }
  }
);

const initialState = {
  testimonials: [],
  currentTestimonial: null,
  loading: false,
  error: null,
  success: false,
};

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    resetTestimonialState: () => initialState,
  },
  extraReducers: (builder) => {
    // Get All Testimonials
    builder
      .addCase(getTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload.data;
      })
      .addCase(getTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch testimonials";
      })

      // Get Testimonial By ID
      .addCase(getTestimonialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestimonialById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTestimonial = action.payload.data;
      })
      .addCase(getTestimonialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch testimonial";
      })

      // Create Testimonial
      .addCase(createTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.testimonials.unshift(action.payload.data);
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create testimonial";
      })

      // Update Testimonial
      .addCase(updateTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.testimonials.findIndex(
          (t) => t.id === action.payload.data.id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload.data;
        }
        if (state.currentTestimonial?.id === action.payload.data.id) {
          state.currentTestimonial = action.payload.data;
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update testimonial";
      })

      // Delete Testimonial
      .addCase(deleteTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.testimonials = state.testimonials.filter(
          (t) => t.id !== action.payload
        );
        if (state.currentTestimonial?.id === action.payload) {
          state.currentTestimonial = null;
        }
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete testimonial";
      });
  },
});

export const { clearError, clearSuccess, resetTestimonialState } = testimonialSlice.actions;
export default testimonialSlice.reducer;
