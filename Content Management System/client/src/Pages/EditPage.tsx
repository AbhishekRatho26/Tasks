import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { fetchPostById, updatePost, deletePost } from '../features/posts/postSlice';
import { fetchCategories } from '../features/categories/categorySlice';

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { current, loading } = useAppSelector((state) => state.posts);
  const { data: categories, loading: catLoading } = useAppSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
    dispatch(fetchCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (current) {
      setFormData({
        title: current.title || '',
        content: current.content || '',
        category: current.category || '',
      });
    }
  }, [current]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value as string }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updatePost({ id, postData: formData }));
    navigate('/');
  };

  const handleDelete = async () => {
    await dispatch(deletePost(id!));
    setSnackbarOpen(true);
    setTimeout(() => navigate('/'), 1500);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading || catLoading) return <CircularProgress />;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>Edit Post</Typography>

      <TextField
        label="Title"
        name="title"
        fullWidth
        value={formData.title}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        label="Content"
        name="content"
        fullWidth
        multiline
        rows={4}
        value={formData.content}
        onChange={handleChange}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
          label="Category"
        >
          {categories.map((cat: any) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" gap={2} mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Post deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditPost;
