import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: 'Income' | 'Expense';
  date: string;
};

type State = {
  transactions: Transaction[];
};

const initialState: State = {
  transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
      }
    }
  }
});

export const { addTransaction, deleteTransaction, updateTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
