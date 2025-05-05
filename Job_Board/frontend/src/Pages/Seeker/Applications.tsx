import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Chip,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import axios from 'axios';

interface Company {
    _id: string;
    name: string;
  }
  
  interface Job {
    _id: string;
    title: string;
    location: string;
    company: Company;
  }
  
  interface Application {
    _id: string;
    resume: string;
    coverletter: string;
    job: Job;
    applicant: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

// Styled Components
const Header = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #4f46e5, #7c3aed)",
  padding: theme.spacing(6, 2),
  textAlign: 'center',
  color: '#fff',
  boxShadow: theme.shadows[2],
}));

const FilterSection = styled(Box)(({ theme }) => ({
  maxWidth: '96rem',
  margin: '0 auto',
  padding: theme.spacing(5, 3, 2),
}));

const ApplicationGrid = styled(Grid)(({ theme }) => ({
  maxWidth: '96rem',
  margin: '0 auto',
  padding: theme.spacing(2, 3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return { backgroundColor: '#fef9c3', color: '#854d0e' };
    case 'accepted':
      return { backgroundColor: '#dbeafe', color: '#1e40af' };
    case 'rejected':
      return { backgroundColor: '#fee2e2', color: '#b91c1c' };
    default:
      return {};
  }
};

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [applications,setApplications] = useState<Application[]>([])

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get('http://localhost:5000/api/v1/user/applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(response.data.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.job.company.name.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesStatus =
      statusFilter === 'All' || application.status.toLowerCase() === statusFilter.toLowerCase();
  
    return matchesSearch && matchesStatus;
  });
  

  return (
    <Box minHeight="100vh" bgcolor="#f8fafc" color="text.primary">
      <Header>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          My Applications
        </Typography>
        <Typography variant="h6">
          Track the jobs you’ve applied to
        </Typography>
      </Header>

      <FilterSection display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
        <TextField
          fullWidth
          placeholder="Search by job title or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
        />
        <TextField
          select
          fullWidth
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </TextField>
      </FilterSection>

      <ApplicationGrid container spacing={3}>
        {filteredApplications.length === 0 ? (
          <Grid size={12}>
            <Typography align="center" color="text.secondary" variant="h6">
              No applications found.
            </Typography>
          </Grid>
        ) : (
          filteredApplications.map((job) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={job._id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" fontWeight="600" color="#2563eb" gutterBottom>
                    {job.job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {job.job.company.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    📅 Applied on: {job.createdAt}
                  </Typography>
                  <Chip
                    label={job.status}
                    sx={{
                      mt: 2,
                      px: 1.5,
                      py: 0.5,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      borderRadius: '9999px',
                      ...getStatusColor(job.status),
                    }}
                  />
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        )}
      </ApplicationGrid>
    </Box>
  );
};

export default Applications;
