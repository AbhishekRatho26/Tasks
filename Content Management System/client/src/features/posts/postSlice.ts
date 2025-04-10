
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addPost = createAsyncThunk('posts/add', async (postData: any, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/api/posts/add', postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.message || err.message);
  }
});

export const fetchPostById = createAsyncThunk('posts/fetchById', async (id: string) => {
  const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
  return res.data;
});

export const updatePost = createAsyncThunk('posts/update', async ({ id, postData }: any) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`http://localhost:5000/api/posts/${id}`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const deletePost = createAsyncThunk('posts/delete', async (id: string) => {
  const token = localStorage.getItem('token');
  await axios.delete(`http://localhost:5000/api/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    current: { title: '', content: '' },
    loading: false,
    error: '',
    status: null,
  },
  reducers: {
    resetStatus(state) {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { resetStatus } = postSlice.actions;
export default postSlice.reducer;
