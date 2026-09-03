import { useState, useEffect } from 'react';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const saveTransactions = (newTransactions) => {
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const addTransaction = (transaction) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    const updatedTransactions = [...transactions, newTransaction];
    saveTransactions(updatedTransactions);
  };

  const updateTransaction = (id, updatedData) => {
    const updatedTransactions = transactions.map((transaction) => 
      transaction.id === id ? { ...transaction, ...updatedData } : transaction
    );
    saveTransactions(updatedTransactions);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    saveTransactions(updatedTransactions);
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
};

export default useTransactions;