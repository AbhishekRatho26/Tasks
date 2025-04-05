import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction } from '../features/transactions/transactionSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  amount: Yup.number().required('Amount is required').typeError('Must be a number'),
  type: Yup.string().oneOf(['Income', 'Expense']).required('Type is required'),
  date: Yup.string().required('Date is required'),
});

const AddTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  const existing = id ? transactions.find(t => t.id === id) : null;

  const formik = useFormik({
    initialValues: {
      title: existing?.title || '',
      amount: existing?.amount || '',
      type: existing?.type || '',
      date: existing?.date || new Date().toISOString().split('T')[0],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = {
        ...values,
        id: existing?.id || Date.now().toString(),
        amount: +values.amount,
      };

      if (existing) {
        dispatch(updateTransaction(payload));
      } else {
        dispatch(addTransaction(payload));
      }

      navigate('/');
    },
  });

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {existing ? 'Edit' : 'Add'} Transaction
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <TextField
              fullWidth
              name="amount"
              label="Amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />

            <TextField
              select
              fullWidth
              name="type"
              label="Type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </TextField>

            <TextField
              fullWidth
              type="date"
              name="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />

            <Button variant="contained" type="submit">
              {existing ? 'Update' : 'Add'} Transaction
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddTransaction;