import React from "react";
import ClientLayout from "./ClientLayout";
import { CreditCard, Activity, PieChart } from "lucide-react";

export default function ClientDashboard() {
  return (
    <ClientLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-4 bg-emerald-50 rounded-full">
            <CreditCard className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Account Balance</p>
            <p className="text-xl font-bold">$3,450.00</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-4 bg-blue-50 rounded-full">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Transactions</p>
            <p className="text-xl font-bold">12</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-4 bg-yellow-50 rounded-full">
            <PieChart className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Savings Goal</p>
            <p className="text-xl font-bold">$5,000</p>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-gray-500 text-sm">Date</th>
              <th className="py-2 px-4 text-gray-500 text-sm">Description</th>
              <th className="py-2 px-4 text-gray-500 text-sm">Amount</th>
              <th className="py-2 px-4 text-gray-500 text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2 px-4 text-gray-700 text-sm">2025-10-31</td>
              <td className="py-2 px-4 text-gray-700 text-sm">Deposit</td>
              <td className="py-2 px-4 text-gray-700 text-sm">+$500.00</td>
              <td className="py-2 px-4 text-green-600 text-sm">Completed</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 px-4 text-gray-700 text-sm">2025-10-30</td>
              <td className="py-2 px-4 text-gray-700 text-sm">Withdrawal</td>
              <td className="py-2 px-4 text-gray-700 text-sm">-$200.00</td>
              <td className="py-2 px-4 text-red-600 text-sm">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ClientLayout>
  );
}
