import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../indexedDB';
import { motion } from 'framer-motion';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

const Login:React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Min 6 characters').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await loginUser(values.email, values.password);
        alert(response.message);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        alert(error);
      }
      setSubmitting(false);
    },
  });

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#f4f4f4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper elevation={4} sx={{ p: 4, width: 350, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" color="#333" mb={2}>
            Log In to Your Account
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              {...formik.getFieldProps('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              {...formik.getFieldProps('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, backgroundColor: '#007bff', fontWeight: 'bold' }}
              >
                Log In
              </Button>
            </motion.div>

            <Typography mt={2} fontSize={14} color="#666">
              Don't have an account?{' '}
              <motion.span whileHover={{ scale: 1.1, color: '#ff6b81' }}>
                <Link to="/signin" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#007bff' }}>
                  Sign Up
                </Link>
              </motion.span>
            </Typography>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
