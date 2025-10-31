import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../store/slices/accountSlice';
import TransactionTable from '../components/transactionTable';
import { Search } from 'lucide-react';

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.account);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    dispatch(fetchTransactions({ limit: 50 }));
  }, [dispatch]);

  // Filter and search logic
  const filteredTransactions = transactions
    .filter((tx) =>
      filterType === 'ALL' ? true : tx.type === filterType
    )
    .filter((tx) =>
      tx.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">
          Transaction History
        </h1>

       
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by type or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="ALL">All Types</option>
            <option value="DEPOSIT">Deposits</option>
            <option value="WITHDRAW">Withdrawals</option>
          </select>
        </div>
      </div>

      
      {loading ? (
        <div className="text-center text-gray-500 mt-10">Loading transactions...</div>
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}
    </div>
  );
}
