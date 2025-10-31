import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginCustomer, clearError, clearMessage } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Login with email and password only
    const result = await dispatch(loginCustomer({ email, password }));

    if (result.payload?.data?.user) {
      
      setSuccessMsg(result.payload.message || 'Login successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200); 
    }
  };

  return (
    <div className="min-h-screen flex">
   
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-600 to-green-400 text-white p-20 flex-col justify-center">
        <h1 className="text-5xl font-bold mb-6">Savings Management System</h1>
        <p className="text-lg mb-4">
          Manage your savings, track your finances, and grow your wealth securely.
        </p>
        <p className="italic">Safe, fast, and reliable – your money, your way.</p>
      </div>


      <div className="flex-1 flex items-center justify-center bg-gray-50 p-10">
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Welcome Back</h2>

          
          <p className="text-center text-sm text-gray-600">
            Your device must be verified by an admin before you can login.
          </p>

    
          {successMsg && (
            <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-2 rounded-lg text-sm text-center">
              {successMsg}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

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
            {loading ? 'Signing In...' : 'Login'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Don't have an account?{' '}
            <a href="/register" className="text-emerald-600 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
