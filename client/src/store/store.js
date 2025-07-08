import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contactReducer from './slices/contactSlice';
import blogReducer from './slices/blogSlice';
import adminContactReducer from './slices/adminContactSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    blog: blogReducer,
    adminContact: adminContactReducer,
  },
});

export default store; 