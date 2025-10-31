
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { accountService } from '../../services/accountService';

export const fetchBalance = createAsyncThunk('account/fetchBalance', async (_, { rejectWithValue }) => {
  try {
    const data = await accountService.getBalance();
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchAccountDetails = createAsyncThunk(
  'account/fetchAccountDetails',
  async (_, { rejectWithValue }) => {
    try {
      const data = await accountService.getAccountDetails();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'account/fetchTransactions',
  async ({ limit, offset } = {}, { rejectWithValue }) => {
    try {
      const data = await accountService.getTransactionHistory(limit, offset);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const depositFunds = createAsyncThunk(
  'account/depositFunds',
  async ({ amount, description }, { rejectWithValue }) => {
    try {
      const data = await accountService.deposit(amount, description);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const withdrawFunds = createAsyncThunk(
  'account/withdrawFunds',
  async ({ amount, description }, { rejectWithValue }) => {
    try {
      const data = await accountService.withdraw(amount, description);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    balance: 0,
    details: null,
    transactions: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearAccountError: (state) => {
      state.error = null;
    },
    clearAccountMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.data.balance;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

   
    builder
      .addCase(fetchAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload.data;
      })
      .addCase(fetchAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data.transactions;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  
    builder
      .addCase(depositFunds.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(depositFunds.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.balance = action.payload.newBalance.balance;
        })

      .addCase(depositFunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  
    builder
      .addCase(withdrawFunds.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(withdrawFunds.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.balance = action.payload.newBalance.balance;
      })
      .addCase(withdrawFunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAccountError, clearAccountMessage } = accountSlice.actions;
export default accountSlice.reducer;
