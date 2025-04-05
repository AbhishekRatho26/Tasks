
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteTransaction } from '../features/transactions/transactionSlice';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TransactionTable = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <Paper>
      <Typography variant="h6" sx={{ p: 2 }}>
        Transactions
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No transactions added.
                </TableCell>
              </TableRow>
            ) : (
              transactions
                .slice()
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.title}</TableCell>
                    <TableCell sx={{ color: txn.type === 'Income' ? 'green' : 'red' }}>
                      ₹ {txn.amount}
                    </TableCell>
                    <TableCell>{txn.type}</TableCell>
                    <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => navigate(`/edit/${txn.id}`)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(txn.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionTable;
