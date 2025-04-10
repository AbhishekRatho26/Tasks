import React, { useEffect, useState } from 'react';
import {
  TextField, Card, Typography, Button, Select, MenuItem,
  InputLabel, FormControl, Box, Snackbar, Alert,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { fetchCategories } from '../features/categories/categorySlice';
import { addPost, resetStatus } from '../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';

const AddPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: categories } = useAppSelector((state: { categories: any; }) => state.categories);
  const { status, error } = useAppSelector((state: { posts: any; }) => state.posts);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      setOpenSnackbar(true);
      dispatch(resetStatus());
      setTimeout(() => navigate('/'), 2000);
    }
  }, [status, navigate, dispatch]);

  const handleSubmit = () => {
    dispatch(addPost({ title, content, category }));
    setTitle('');
    setContent('');
    setCategory('');
  };

  return (
    <>
      <Card sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 5 }}>
        <Typography variant="h4" gutterBottom>Post Form</Typography>
        <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth multiline rows={4} label="Content" value={content} onChange={(e) => setContent(e.target.value)} sx={{ mb: 2 }} />
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
            {categories.map((cat: any) => (
              <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box textAlign="right">
          <Button variant="contained" onClick={handleSubmit}>Add Post</Button>
        </Box>
      </Card>

      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">Post added successfully!</Alert>
      </Snackbar>
    </>
  );
};

export default AddPost;
