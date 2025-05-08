import { Typography, Container, Paper, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <Container maxWidth="md" style={{ paddingTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#F7FAFC' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          Recruiter Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          You can add a company, delete it, and check for applicants.
        </Typography>
        <Stack direction="row" spacing={2} marginTop={2}>
          <Button variant="contained" color="primary" onClick={() => navigate("/employee/company/post") }>Add Company</Button>
          <Button variant="outlined" color="error" onClick={ () => navigate("/employee/jobs")}>Add Job</Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Dashboard;
