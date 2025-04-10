// src/features/categories/categorySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const res = await axios.get('http://localhost:5000/api/categories');
  return res.data.data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder: { addCase: (arg0: any, arg1: (state: any) => void) => { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): void; new(): any; }; }; new(): any; }; }; }) => {
    builder
      .addCase(fetchCategories.pending, (state: { loading: boolean; }) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state: { data: any; loading: boolean; }, action: { payload: any; }) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state: { loading: boolean; error: any; }, action: { error: { message: string; }; }) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export default categorySlice.reducer;
