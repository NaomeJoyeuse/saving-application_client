import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // You can add more slices here later
  },
//   devTools: process.env.NODE_ENV !== 'production',
});

export default store;
