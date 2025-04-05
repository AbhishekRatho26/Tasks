import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Box, Typography } from '@mui/material';

const TransactionChart = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const data = [{ name: 'Transactions', Income: income, Expense: expense }];

  return (
    <Box mb={4}>
      <Typography variant="h6" mb={2}>Income vs Expense</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#4caf50" />
          <Bar dataKey="Expense" fill="#f44336" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TransactionChart;
