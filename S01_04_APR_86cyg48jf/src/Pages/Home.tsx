
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KPISummary from '../components/KPISummary';
import TransactionChart from '../components/TransactionChart';
import TransactionTable from '../components/TransactionTable';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Personal Finance Dashboard</Typography>
        <Button variant="contained" onClick={() => navigate('/add')}>
          Add Transaction
        </Button>
      </Box>

      <KPISummary />
      <TransactionChart />
      <TransactionTable />
    </Container>
  );
};

export default Home;
