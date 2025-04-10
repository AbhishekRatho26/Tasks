import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface Post {
  _id: string;
  title: string;
  content: string;
  status: string; // Added status field
  createdAt: string;
  author: { _id: string; name: string };
  category?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Category {
  _id: string;
  name: string;
}

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [postRes, userRes, catRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/posts'),
        axios.get('http://localhost:5000/api/admin/users'),
        axios.get('http://localhost:5000/api/admin/categories'),
      ]);
      setPosts(postRes.data.posts || []);
      setUsers(userRes.data.users || []);
      setCategories(catRes.data.categories || []);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCard = (title: string, value: string | number, onClick: () => void) => (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }} onClick={onClick}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const postPerCategory = categories.map((cat) => ({
    name: cat.name,
    count: posts.filter((post) => post.category === cat._id).length,
  }));

  const userRoleDistribution = [
    { name: 'Admin', value: users.filter((u) => u.role === 'admin').length },
    { name: 'User', value: users.filter((u) => u.role === 'user').length },
  ];

  const postStatusDistribution = [
    { name: 'Published', value: posts.filter((p) => p.status === 'published').length },
    { name: 'Draft', value: posts.filter((p) => p.status === 'draft').length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button onClick={()=>navigate("/admin")}>Back</Button>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {renderCard('Total Users', users.length, () => navigate('/admin/users'))}
        {renderCard('Total Posts', posts.length, () => navigate('/admin/posts'))}
        {renderCard('Total Categories', categories.length, () => navigate('/admin/categories'))}
      </Grid>

      <Grid container spacing={4} mt={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{width:"400px"}}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Users by Role
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userRoleDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {userRoleDistribution.map((entry, index) => (
                      <Cell key={`role-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{width:"400px"}}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Posts per Category
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={postPerCategory}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{width:"400px"}}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Posts by Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={postStatusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {postStatusDistribution.map((entry, index) => (
                      <Cell key={`status-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
