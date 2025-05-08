import React, { useState } from 'react';
import { Button, Checkbox, Grid, TextField, Typography, Paper } from '@mui/material';
import { styled } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled(Paper)`
  max-width: 400px;
  padding: 2rem;
  margin: auto;
  margin-top: 5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid #ccc;
  text-transform: none;
`;

const RoleToggle = styled(Button)`
  text-transform: none;
  font-size: 0.875rem;
  border-radius: 9999px;
`;

const Register = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/register', {
        email,
        password,
        role
      });
      console.log(response?.data)
      const token = response?.data?.token;
      const user = response?.data?.user;
      localStorage.setItem("token",token)
      localStorage.setItem("user",JSON.stringify(user))
      navigate("/login")
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', px: 2, backgroundColor: '#f3f4f6' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Container>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            JobSeekerX
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
            Register to your account
          </Typography>

          <Grid container justifyContent="center" spacing={2} sx={{ mt: 2, mb: 3 }}>
            <Grid item>
              <RoleToggle
                variant={role === 'student' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setRole('student')}
              >
                Student
              </RoleToggle>
            </Grid>
            <Grid item>
              <RoleToggle
                variant={role === 'recruiter' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setRole('recruiter')}
              >
                Recruiter
              </RoleToggle>
            </Grid>
          </Grid>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
              <Grid item>
                <Checkbox size="small" /> Remember me
              </Grid>
              <Grid item>
                <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                  Forgot password?
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 1 }}
            >
              Register
            </Button>
          </form>

          <Typography variant="body2" align="center" color="textSecondary" sx={{ my: 2 }}>
            or
          </Typography>

          <GoogleButton fullWidth>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
            Continue with Google
          </GoogleButton>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Register;
