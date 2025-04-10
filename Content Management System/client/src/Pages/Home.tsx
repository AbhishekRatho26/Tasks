import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Post {
  _id: string;
  title: string;
  content: string;
  category: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState<Post[]>([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddPost = () => {
    navigate('/add-post');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (token) {
      fetchPosts();
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Content Management</Typography>
          <Box>
            <Typography variant="subtitle1" component="span" sx={{ marginRight: 2 }}>
              Welcome, {user.name || 'User'}
            </Typography>
            <Button color="inherit" onClick={handleAddPost}>
              Add Post
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Home Page
        </Typography>
        <Typography gutterBottom>
          This is the main dashboard. You can create posts or manage your content.
        </Typography>

        <Box mt={4}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card onClick={()=>{
                localStorage.setItem("post",post._id)
                navigate(`/edit/${post._id}`)
              }} key={post._id} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {post.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    Category: {post.category?.name || 'N/A'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Created At: {new Date(post.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No posts available.</Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
