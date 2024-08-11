"use client"; // This is required to use React hooks like useState

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const router = useRouter(); // Get the router object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Mock login logic (replace with actual login logic)
    try {
      // Simulate an API call to login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to the home page
      router.push('/');
    } catch (error) {
      // Handle login error
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
      <p className="mt-4">Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
    </div>
  );
}
