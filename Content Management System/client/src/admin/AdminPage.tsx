import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Admin Panel
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => handleNavigation('/admin/users')}>
              Users
            </Button>
            <Button color="inherit" onClick={() => handleNavigation('/admin/posts')}>
              Posts
            </Button>
            <Button color="inherit" onClick={() => handleNavigation('/admin/categories')}>
              Categories
            </Button>
            <Button color="inherit" onClick={() => handleNavigation('/admin/dashboard')}>
             Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box mt={8} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Welcome to the Admin Panel
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Use the navigation bar to manage users, posts, and categories.
          </Typography>

          <Grid container spacing={3} justifyContent="center" mt={5}>
            <Grid item>
              <Button variant="contained" size="large" onClick={() => handleNavigation('/admin/users')}>
                Manage Users
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" onClick={() => handleNavigation('/admin/posts')}>
                Manage Posts
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" onClick={() => handleNavigation('/admin/categories')}>
                Manage Categories
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default AdminPage;
