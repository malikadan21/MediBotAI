'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/');
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Sign Up</button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-6 text-center text-gray-600">Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Login</Link></p>
      </div>
    </div>
  );
}
