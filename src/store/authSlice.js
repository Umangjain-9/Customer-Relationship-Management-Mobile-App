import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import api from '../api/api'; // Using api directly as services might be too specific

// Mocking login for json-server
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users?email=${credentials.email}&password=${credentials.password}`);
    if (response.data.length > 0) {
      const user = response.data[0];
      const token = `mock-token-for-${user.id}`; // Create a mock token
      await SecureStore.setItemAsync('userToken', token);
      await SecureStore.setItemAsync('userData', JSON.stringify(user));
      return { user, token };
    }
    return rejectWithValue('Invalid credentials');
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await SecureStore.deleteItemAsync('userToken');
  await SecureStore.deleteItemAsync('userData');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    restoreToken: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { restoreToken, setLoading } = authSlice.actions;
export default authSlice.reducer;