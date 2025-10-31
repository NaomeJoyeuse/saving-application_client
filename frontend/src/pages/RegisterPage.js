
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerCustomer } from '../store/slices/authSlice';
// import { useNavigate } from 'react-router-dom';

// export default function RegisterPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Generate simple device ID
//     const deviceId = `DV-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

//     const result = await dispatch(registerCustomer({ fullName, email, password, deviceId }));

//     if (result.payload?.token) {
//       navigate('/');
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left marketing panel */}
//       <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-600 to-green-400 text-white p-20 flex-col justify-center">
//         <h1 className="text-5xl font-bold mb-6">Savings Management System</h1>
//         <p className="text-lg mb-4">
//           Take control of your finances, track your savings, and manage your account with ease. 
//           Join thousands of users who are growing their wealth today.
//         </p>
//         <p className="italic">Safe, fast, and reliable – your money, your way.</p>
//       </div>

//       {/* Right form panel */}
//       <div className="flex-1 flex items-center justify-center bg-gray-50 p-10">
//         <form
//           onSubmit={handleRegister}
//           className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6"
//         >
//           <h2 className="text-3xl font-bold text-gray-900 text-center">Create Account</h2>
//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <input
//             type="text"
//             placeholder="Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             required
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
//           >
//             {loading ? 'Creating Account...' : 'Register'}
//           </button>

//           <p className="text-sm text-gray-500 text-center">
//             Already have an account? <a href="/login" className="text-emerald-600 hover:underline">Login</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerCustomer, clearError, clearMessage } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Clear messages when component unmounts
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleRegister = async (e) => {
    e.preventDefault();

    
    const deviceId = `DV-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const result = await dispatch(registerCustomer({ fullName, email, password, deviceId }));

    if (result.payload?.data?.user) {
      
       navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left marketing panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-600 to-green-400 text-white p-20 flex-col justify-center">
        <h1 className="text-5xl font-bold mb-6">Savings Management System</h1>
        <p className="text-lg mb-4">
          Take control of your finances, track your savings, and manage your account with ease. 
          Join thousands of users who are growing their wealth today.
        </p>
        <p className="italic">Safe, fast, and reliable – your money, your way.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-10">
        <form
          onSubmit={handleRegister}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center">Create Account</h2>

          {/* Success message */}
          {message && (
            <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded-lg text-sm">
              {message}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Already have an account? <a href="/" className="text-emerald-600 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
