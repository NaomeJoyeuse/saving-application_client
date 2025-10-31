import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    account : accountReducer,
  
  },

});

export default store;
