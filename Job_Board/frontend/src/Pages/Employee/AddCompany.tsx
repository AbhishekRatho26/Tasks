import { Container, Box, Typography, TextField, FormControl, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Background = styled(Box)`
  background: linear-gradient(to right, #eff6ff, #f5f3ff, #fdf2f8);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
`;

const GlassCard = styled(Paper)`
  position: relative;
  width: 100%;
  max-width: 800px;
  padding: 2.5rem;
  border-radius: 1.5rem;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled(TextField)`
  && {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 1rem;
    input, textarea {
      padding: 1rem;
    }
    fieldset {
      border-color: #d1d5db;
    }
    &:focus-within {
      box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.5);
    }
  }
`;

const SubmitButton = styled(Button)`
  && {
    padding: 1rem 2rem;
    background-color: #7c3aed;
    color: white;
    font-weight: bold;
    font-size: 1.125rem;
    border-radius: 9999px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    &:hover {
      background-color: #6d28d9;
      transform: scale(1.05);
    }
  }
`;

const AddCompany = () => {
  const [name,setName]= useState()
  const [description,setDescription] = useState()
  const [location,setLocation] = useState()
  const [website,setWebsite] = useState()
  const navigate = useNavigate()

  const handleSubmit= async ()=>{
    const data={
      name:name,
      description:description,
      location:location,
      website:website
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/company/register",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response?.data?.message)
      navigate("/employee/dashboard")
    } catch (err: any) {
      
      alert(err?.response?.data?.message || "Something went wrong");
    } 
  }


  return (
    <Background>
      <Container maxWidth="md">
        <GlassCard elevation={6}>
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" fontWeight="800" color="textPrimary" mb={1}>
              🏢 Add New Company
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Add your company details to start posting jobs!
            </Typography>
          </Box>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={4}>
              {/* Company Name */}
              <Grid size={12}>
                <FormControl fullWidth>
                  <StyledInput label="Company Name" placeholder="e.g., OpenAI" value={name} onChange={(e:any)=>setName(e.target.value)}/>
                </FormControl>
              </Grid>

              {/* Location */}
              <Grid size={12}>
                <FormControl fullWidth>
                  <StyledInput label="Location" placeholder="e.g., San Francisco, CA" value={location} onChange={(e:any)=>setLocation(e.target.value)}/>
                </FormControl>
              </Grid>

              {/* Website */}
              <Grid size={12}>
                <FormControl fullWidth>
                  <StyledInput label="Website" placeholder="e.g., https://openai.com" value={website} onChange={(e:any)=>setWebsite(e.target.value)}/>
                </FormControl>
              </Grid>

              {/* Description */}
              <Grid size={12}>
                <FormControl fullWidth>
                  <StyledInput
                    label="Company Description"
                    placeholder="Tell us about your company culture, mission, and values..."
                    multiline
                    rows={5}
                    value={description} onChange={(e:any)=>setDescription(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>

            
            <Box mt={8} textAlign="center">
              <SubmitButton type="submit" variant="contained" onClick={handleSubmit}>
                Add Company
              </SubmitButton>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </Background>
  );
};

export default AddCompany;
