import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const KPISummary = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  const kpis = [
    { label: 'Total Income', value: income, color: 'green' },
    { label: 'Total Expense', value: expense, color: 'red' },
    { label: 'Balance', value: balance, color: 'blue' },
  ];

  return (
    <Grid container spacing={3} mb={4}>
      {kpis.map((kpi) => (
        <Grid item xs={12} sm={4} key={kpi.label}>
          <Card sx={{ backgroundColor: '#f0f4f8' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {kpi.label}
              </Typography>
              <Typography variant="h5" color={kpi.color}>
                ₹ {kpi.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default KPISummary;
