import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import styled from 'styled-components';

// Styled components for custom styling
const StatCard = styled(Card)`
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Dashboard = () => {
  const candidates = [
    { name: 'Priya Sharma', email: 'priya@example.com', role: 'Frontend Developer', status: 'Interview Scheduled' },
    { name: 'Rahul Verma', email: 'rahul@example.com', role: 'Backend Developer', status: 'Under Review' },
    { name: 'Meera Kapoor', email: 'meera@example.com', role: 'UI/UX Designer', status: 'Rejected' },
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#F7FAFC' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          Recruiter Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Overview of candidate activity and hiring pipeline.
        </Typography>
      </div>

      {/* Stat Cards */}
      <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
        <Grid size={{sm:6,md:3}} >
          <StatCard>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Total Candidates
              </Typography>
              <Typography variant="h4" style={{ color: '#3B82F6', fontWeight: 'bold' }}>
                3,102
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid size={{sm:6,md:3}} >
          <StatCard>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Jobs Posted
              </Typography>
              <Typography variant="h4" style={{ color: '#8B5CF6', fontWeight: 'bold' }}>
                289
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid size={{sm:6,md:3}} >
          <StatCard>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Interviews Scheduled
              </Typography>
              <Typography variant="h4" style={{ color: '#10B981', fontWeight: 'bold' }}>
                76
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid size={{sm:6,md:3}}>
          <StatCard>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                New Applications
              </Typography>
              <Typography variant="h4" style={{ color: '#EC4899', fontWeight: 'bold' }}>
                134
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
      </Grid>

      {/* Candidates Table */}
      <Paper style={{ padding: '2rem', backgroundColor: '#fff', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
          Recent Candidates
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Applied Role</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map((candidate, index) => (
                <TableRow key={index} hover>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.role}</TableCell>
                  <TableCell>
                    <span style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      backgroundColor: candidate.status === 'Interview Scheduled' ? '#D1FAE5' : candidate.status === 'Under Review' ? '#FDE047' : '#FCA5A5',
                      color: candidate.status === 'Interview Scheduled' ? '#10B981' : candidate.status === 'Under Review' ? '#F59E0B' : '#EF4444',
                    }}>
                      {candidate.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
          <Button variant="contained" color="primary">
            View All Candidates
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;
