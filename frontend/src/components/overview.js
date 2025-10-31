

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchBalance,
//   fetchTransactions,
//   depositFunds,
//   withdrawFunds,
//   clearAccountError,
//   clearAccountMessage,
// } from "../store/slices/accountSlice";
// import { Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

// export default function ClientDashboard() {
//   const dispatch = useDispatch();
//   const { balance, transactions, loading, error, message } = useSelector(
//     (state) => state.account
//   );

//   const [depositAmount, setDepositAmount] = useState("");
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const [depositDesc, setDepositDesc] = useState("");
//   const [withdrawDesc, setWithdrawDesc] = useState("");

//   useEffect(() => {
//     dispatch(fetchBalance());
//     dispatch(fetchTransactions({ limit: 10 }));

//     return () => {
//       dispatch(clearAccountError());
//       dispatch(clearAccountMessage());
//     };
//   }, [dispatch]);

//   const handleDeposit = (e) => {
//     e.preventDefault();
//     dispatch(
//       depositFunds({
//         amount: parseFloat(depositAmount),
//         description: depositDesc,
//       })
//     );
//     setDepositAmount("");
//     setDepositDesc("");
//   };

//   const handleWithdraw = (e) => {
//     e.preventDefault();
//     dispatch(
//       withdrawFunds({
//         amount: parseFloat(withdrawAmount),
//         description: withdrawDesc,
//       })
//     );
//     setWithdrawAmount("");
//     setWithdrawDesc("");
//   };

//   return (
//     <div className="flex-1 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-8 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Client Dashboard</h1>

      
//         {message && (
//           <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded-lg mb-6">
//             {message}
//           </div>
//         )}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
//             {error}
//           </div>
//         )}

      
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 flex items-center justify-between transition-all hover:shadow-xl">
//           <div>
//             <h2 className="text-lg text-gray-500 font-medium">Current Balance</h2>
//             <p className="text-5xl font-extrabold text-emerald-600 mt-3">
//               {balance ? `${balance.toLocaleString()} RWF` : "0 RWF"}
//             </p>
//           </div>
//           <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
//             <Wallet className="w-8 h-8 text-emerald-600" />
//           </div>
//         </div>

        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
         
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <div className="flex items-center gap-3 mb-4">
//               <ArrowDownCircle className="text-emerald-600 w-6 h-6" />
//               <h3 className="text-xl font-semibold text-gray-800">Deposit Funds</h3>
//             </div>
//             <form onSubmit={handleDeposit} className="space-y-4">
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 value={depositAmount}
//                 onChange={(e) => setDepositAmount(e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 value={depositDesc}
//                 onChange={(e) => setDepositDesc(e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-emerald-600 text-white font-medium py-3 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : "Deposit"}
//               </button>
//             </form>
//           </div>

         
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <div className="flex items-center gap-3 mb-4">
//               <ArrowUpCircle className="text-red-600 w-6 h-6" />
//               <h3 className="text-xl font-semibold text-gray-800">Withdraw Funds</h3>
//             </div>
//             <form onSubmit={handleWithdraw} className="space-y-4">
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 value={withdrawAmount}
//                 onChange={(e) => setWithdrawAmount(e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 value={withdrawDesc}
//                 onChange={(e) => setWithdrawDesc(e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-red-600 text-white font-medium py-3 rounded-lg hover:bg-red-700 transition-all disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : "Withdraw"}
//               </button>
//             </form>
//           </div>
//         </div>

     
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
//                   <th className="text-left px-6 py-3 font-medium text-gray-600">Type</th>
//                   <th className="text-left px-6 py-3 font-medium text-gray-600">Amount (RWF)</th>
//                   <th className="text-left px-6 py-3 font-medium text-gray-600">Description</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {transactions && transactions.length > 0 ? (
//                   transactions.map((tx) => (
//                     <tr key={tx.id} className="border-b hover:bg-gray-50 transition">
//                       <td className="px-6 py-3 text-gray-700">
//                         {new Date(tx.createdAt).toLocaleString()}
//                       </td>
//                       <td
//                         className={`px-6 py-3 font-semibold ${
//                           tx.type === "DEPOSIT" ? "text-emerald-600" : "text-red-600"
//                         }`}
//                       >
//                         {tx.type}
//                       </td>
//                       <td className="px-6 py-3 text-gray-800 font-medium">{tx.amount}</td>
//                       <td className="px-6 py-3 text-gray-600">{tx.description || "—"}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="4"
//                       className="text-center text-gray-500 py-6 italic"
//                     >
//                       No transactions found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBalance,
  fetchTransactions,
  depositFunds,
  withdrawFunds,
  clearAccountError,
  clearAccountMessage,
} from "../store/slices/accountSlice";
import { Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function ClientDashboard() {
  const dispatch = useDispatch();
  const { balance, transactions, loading, error, message } = useSelector(
    (state) => state.account
  );

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositDesc, setDepositDesc] = useState("");
  const [withdrawDesc, setWithdrawDesc] = useState("");
  const [user, setUser] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchTransactions({ limit: 10 }));

    return () => {
      dispatch(clearAccountError());
      dispatch(clearAccountMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (message) setShowMessage(true);
  }, [message]);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  const handleDeposit = (e) => {
    e.preventDefault();
    dispatch(
      depositFunds({
        amount: parseFloat(depositAmount),
        description: depositDesc,
      })
    );
    setDepositAmount("");
    setDepositDesc("");
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    dispatch(
      withdrawFunds({
        amount: parseFloat(withdrawAmount),
        description: withdrawDesc,
      })
    );
    setWithdrawAmount("");
    setWithdrawDesc("");
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
       
        {user && (
          <p className="text-gray-700 text-lg mb-4">
            Welcome, <span className="font-semibold">{user.fullName || user.email}</span>
          </p>
        )}

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Client Dashboard</h1>

        {showMessage && message && (
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-100 border border-emerald-400 text-emerald-700 px-6 py-4 rounded-lg shadow-lg z-50 flex items-center justify-between gap-4"
          >
            <span>{message}</span>
            <button
              onClick={() => setShowMessage(false)}
              className="text-emerald-700 font-bold hover:text-emerald-900"
            >
              ✕
            </button>
          </div>
        )}

        {showError && error && (
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg z-50 flex items-center justify-between gap-4"
          >
            <span>{error}</span>
            <button
              onClick={() => setShowError(false)}
              className="text-red-700 font-bold hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}

       
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 flex items-center justify-between transition-all hover:shadow-xl">
          <div>
            <h2 className="text-lg text-gray-500 font-medium">Current Balance</h2>
            <p className="text-5xl font-extrabold text-emerald-600 mt-3">
              {balance ? `${balance.toLocaleString()} RWF` : "0 RWF"}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <Wallet className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <ArrowDownCircle className="text-emerald-600 w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">Deposit Funds</h3>
            </div>
            <form onSubmit={handleDeposit} className="space-y-4">
              <input
                type="number"
                placeholder="Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={depositDesc}
                onChange={(e) => setDepositDesc(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white font-medium py-3 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50"
              >
                {loading ? "Processing..." : "Deposit"}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <ArrowUpCircle className="text-red-600 w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">Withdraw Funds</h3>
            </div>
            <form onSubmit={handleWithdraw} className="space-y-4">
              <input
                type="number"
                placeholder="Amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={withdrawDesc}
                onChange={(e) => setWithdrawDesc(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white font-medium py-3 rounded-lg hover:bg-red-700 transition-all disabled:opacity-50"
              >
                {loading ? "Processing..." : "Withdraw"}
              </button>
            </form>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Type</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Amount (RWF)</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions && transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <tr key={tx.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-3 text-gray-700">
                        {new Date(tx.createdAt).toLocaleString()}
                      </td>
                      <td
                        className={`px-6 py-3 font-semibold ${
                          tx.type === "DEPOSIT" ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {tx.type}
                      </td>
                      <td className="px-6 py-3 text-gray-800 font-medium">{tx.amount}</td>
                      <td className="px-6 py-3 text-gray-600">{tx.description || "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-6 italic">
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
