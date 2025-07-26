import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogSlice";
import adminContactReducer from "./slices/adminContactSlice";
import testimonialReducer from "./slices/testimonialSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    adminContact: adminContactReducer,
    testimonial: testimonialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
