import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Button
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface Author {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  status:string
  author: Author;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
    const navigate = useNavigate()
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/posts');
      const postsData = Array.isArray(res.data.posts) ? res.data.posts : [];
      setPosts(postsData);
    } catch (error: any) {
      console.error('Error fetching posts:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const filteredPosts = posts.filter((post) => {
    const lowerSearch = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerSearch) ||
      post.content.toLowerCase().includes(lowerSearch) ||
      post.author?.name?.toLowerCase().includes(lowerSearch) ||
      post.author?._id?.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Button onClick={()=>navigate("/admin")}>Back</Button>
        <Typography variant="h4" gutterBottom>
          Post Details
        </Typography>

        <TextField
          label="Search by title, content, author name or ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Content</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Author Name</b></TableCell>
                <TableCell><b>Author ID</b></TableCell>
                <TableCell><b>Created At</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>{post.status}</TableCell>
                  <TableCell>{post.author?.name || 'Unknown'}</TableCell>
                  <TableCell>{post.author?._id || 'N/A'}</TableCell>
                  <TableCell>{dayjs(post.createdAt).format('DD MMM YYYY, HH:mm')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Posts;
