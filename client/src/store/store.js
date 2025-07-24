import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogSlice";
import adminContactReducer from "./slices/adminContactSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    adminContact: adminContactReducer,
  },
});

export default store;
