import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import './App.css';

const TransactionApp = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: '',
    date: '', 
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://api.npoint.io/9a6438df7be8936787f7');
      // If the transactions are nested inside an object, extract them here
      const transactionsArray = response.data.transactions || response.data;

      setTransactions(transactionsArray);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleAddTransaction = () => {
    
    setTransactions([...transactions, newTransaction]);

    
    setNewTransaction({ description: '', amount: '', category: '', date: '' });
  };

  const handleSortTransactions = () => {
    const sortedTransactions = [...transactions].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
    setTransactions(sortedTransactions);
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <input
          type="text"
          placeholder="Description"
          value={newTransaction.description}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newTransaction.category}
          onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
        />
        <button onClick={handleAddTransaction}>Add Transaction</button>
        <button onClick={handleSortTransactions}>Sort</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.date}</td>
              <td>
                <button onClick={() => handleDeleteTransaction(transaction.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionApp;
