"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../../components/Notification';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const resData = await res.json();

      if(!res.ok)
        throw Error(`${resData.data}`);

      setNotification({ message: 'User registered successfully', type: 'success' });
      router.push('/auth/signin');
    } catch(error) {
      console.error('Error registering user:', error);
      setNotification({ message: 'Server error registering user', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-stone-800 mt-10 mb-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500`}
          >
            Register
          </button>
        </form>

        {notification && (
          <div className="mt-4">
            <Notification
              message={notification.message}
              type={notification.type}
              duration={3000}
              onClose={() => setNotification(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
