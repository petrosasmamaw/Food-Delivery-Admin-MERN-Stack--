import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const Register = ({ onClose, openLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setLoading(false);
      alert(error.message);
    } else {
      // Optionally, save fullName in Supabase profile table
      await supabase.from('profiles').upsert({ id: data.user.id, full_name: fullName });
      setLoading(false);
      alert('Registration successful! Check your email to confirm.');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-11/12 max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={openLogin}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
