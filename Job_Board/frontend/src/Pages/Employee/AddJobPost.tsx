import { Container, Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
  max-width: 1000px;
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

const StyledSelect = styled(Select)`
  && {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 1rem;
    .MuiOutlinedInput-notchedOutline {
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

type Company = {
  _id: string;
  name: string;
  description: string;
  location: string[];
};

const AddJobPost = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [requirements, setRequirements] = useState('');
  const [positions,setPositions] = useState("")
  const navigate = useNavigate()

  const getCompanies = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/v1/company/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched companies:', response.data?.company);
      setCompanies(response.data?.company || []); // Adjust based on your API
    } catch (err) {
      console.error('Failed to fetch companies:', err);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleSubmit = async () => {
    
    const jobData = {
      title: title,
      description: description,
      salary: salary,
      experience: experience,
      location: location,
      requirements: requirements,
      position:positions,
      company: selectedCompany,
      jobType: jobType
    };

    console.log('Submitting job:', jobData);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/v1/job/post',
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      alert(response?.data?.message);
      navigate("/employee/jobs")
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };



  useEffect(() => {
    console.log('Selected company ID:', selectedCompany);
  }, [selectedCompany]);

  return (
    <Background>
      <Container maxWidth="lg">
        <GlassCard elevation={6}>
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" fontWeight="800" color="textPrimary" mb={1}>
              🚀 Post Your Job
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Connect with top talent. Make your opportunity shine!
            </Typography>
          </Box>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={4}>
              {/* Title */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <StyledInput label="Job Title" placeholder="e.g., Product Designer" value={title} onChange={(e) => setTitle(e.target.value)} />
                </FormControl>
              </Grid>

              {/* Company */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Company</InputLabel>
                  <StyledSelect
                    value={selectedCompany}
                    onChange={(e: any) => setSelectedCompany(e.target.value)}
                    label="Company"
                  >
                    {companies.map((company) => (
                      <MenuItem key={company._id} value={company._id}>
                        {company.name}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>

              {/* Description */}
              <Grid size={12}>
                <FormControl fullWidth>
                  <StyledInput
                    label="Job Description"
                    placeholder="Describe the role, expectations, and company culture..."
                    multiline
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </Grid>

              {/* Salary */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <StyledInput label="Salary" placeholder="$70k - $90k" value={salary} onChange={(e) => setSalary(e.target.value)} />
                </FormControl>
              </Grid>

              {/* Requirements */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <StyledInput label="Requirements" placeholder="C.C++, Java" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
                </FormControl>
              </Grid>

              {/* Experience */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <StyledInput label="Experience (Years)" placeholder="e.g., 2" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <StyledInput label="Postitions (Years)" placeholder="e.g., 2" type="number" value={positions} onChange={(e) => setPositions(e.target.value)} />
                </FormControl>
              </Grid>

              {/* Job Type */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Job Type</InputLabel>
                  <StyledSelect value={jobType} onChange={(e:any) => setJobType(e.target.value)} label="Job Type">
                    <MenuItem value="full-time">Full-Time</MenuItem>
                    <MenuItem value="part-time">Part-Time</MenuItem>
                    <MenuItem value="internship">Internship</MenuItem>
                    <MenuItem value="remote">Remote</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>

              {/* Location */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <StyledInput label="Location" placeholder="e.g., Remote / New York" value={location} onChange={(e) => setLocation(e.target.value)} />
                </FormControl>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box mt={8} textAlign="center">
              <SubmitButton type="button" variant="contained" onClick={handleSubmit}>
                Post Job
              </SubmitButton>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </Background>
  );
};

export default AddJobPost;
