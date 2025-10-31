// src/pages/ClientDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBalance,
  fetchTransactions,
  depositFunds,
  withdrawFunds,
  clearAccountError,
  clearAccountMessage,
} from '../store/slices/accountSlice';

export default function ClientDashboard() {
  const dispatch = useDispatch();
  const { balance, transactions, loading, error, message } = useSelector(
    (state) => state.account
  );

  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositDesc, setDepositDesc] = useState('');
  const [withdrawDesc, setWithdrawDesc] = useState('');

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchTransactions({ limit: 10 }));

    return () => {
      dispatch(clearAccountError());
      dispatch(clearAccountMessage());
    };
  }, [dispatch]);

  const handleDeposit = (e) => {
    e.preventDefault();
    dispatch(depositFunds({ amount: parseFloat(depositAmount), description: depositDesc }));
    setDepositAmount('');
    setDepositDesc('');
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    dispatch(withdrawFunds({ amount: parseFloat(withdrawAmount), description: withdrawDesc }));
    setWithdrawAmount('');
    setWithdrawDesc('');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar placeholder or use your ClientSidebar here */}
      <div className="lg:w-64"></div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Messages */}
        {message && (
          <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-2 rounded-lg mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Balance card */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-lg font-medium text-gray-700">Current Balance</h2>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            ${balance?.toFixed(2) || '0.00'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deposit form */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-medium mb-4 text-gray-700">Deposit Funds</h3>
            <form onSubmit={handleDeposit} className="space-y-3">
              <input
                type="number"
                placeholder="Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={depositDesc}
                onChange={(e) => setDepositDesc(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Deposit'}
              </button>
            </form>
          </div>

          {/* Withdraw form */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-medium mb-4 text-gray-700">Withdraw Funds</h3>
            <form onSubmit={handleWithdraw} className="space-y-3">
              <input
                type="number"
                placeholder="Amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={withdrawDesc}
                onChange={(e) => setWithdrawDesc(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Withdraw'}
              </button>
            </form>
          </div>
        </div>

        {/* Transaction history */}
        <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions && transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="px-4 py-2 text-sm text-gray-700">{new Date(tx.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{tx.type}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{tx.amount.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{tx.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center text-sm text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
