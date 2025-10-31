import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

const user = JSON.parse(localStorage.getItem('user') || 'null');
const token = localStorage.getItem('accessToken');


export const registerCustomer = createAsyncThunk(
  'auth/registerCustomer',
  async ({ email, password, fullName }, { rejectWithValue }) => {
    try {
      const data = await authService.registerCustomer({ email, password, fullName });
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const loginCustomer = createAsyncThunk(
  'auth/loginCustomer',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.loginCustomer({ email, password });
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user,
    token: token,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.token = null;
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    
    builder.addCase(registerCustomer.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(registerCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(registerCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(loginCustomer.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(loginCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.message = action.payload.message; 
    });
    builder.addCase(loginCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout, clearError, clearMessage } = authSlice.actions;

export default authSlice.reducer;
