import React, { useState } from 'react';
import { Eye } from 'lucide-react';

export default function TransactionTable({ transactions = [] }) {
  const [selectedTx, setSelectedTx] = useState(null);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Recent Transactions
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm font-medium ${
                      tx.type === 'DEPOSIT'
                        ? 'text-emerald-600'
                        : 'text-red-600'
                    }`}
                  >
                    {tx.type}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{tx.amount.toFixed(2)} RWF</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{tx.description || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedTx(tx)}
                      className="inline-flex items-center justify-center p-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-4 text-center text-sm text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Transaction Details
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>ID:</strong> {selectedTx.id}</p>
              <p><strong>Type:</strong> {selectedTx.type}</p>
              <p><strong>Amount:</strong> {selectedTx.amount} RWF</p>
              <p><strong>Description:</strong> {selectedTx.description || '-'}</p>
              <p><strong>Balance Before:</strong> {selectedTx.balanceBefore}</p>
              <p><strong>Balance After:</strong> {selectedTx.balanceAfter}</p>
              <p><strong>Date:</strong> {new Date(selectedTx.createdAt).toLocaleString()}</p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
