"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Notification from '../../components/Notification';
import Loading from '../../components/Loading';
import ExtendedUser from '../../types/extendedUser';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  useEffect(() => {
    if (session && session.user) {
      setFirstName((session.user as ExtendedUser).firstName || '');
      setLastName((session.user as ExtendedUser).lastName || '');
      setEmail((session.user as ExtendedUser).email || '');
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session && session.user) {
      const isChanged =
        firstName !== ((session?.user as ExtendedUser).firstName || '') ||
        lastName !== ((session?.user as ExtendedUser).lastName || '') ||
        email !== ((session?.user as ExtendedUser).email || '') ||
        password !== '';
      setIsButtonDisabled(!isChanged);
    }
  }, [firstName, lastName, email, password, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const resData = await res.json();

      if(!res.ok) 
        throw Error(`${resData.data}`);
      
      setNotification({ message: 'Profile updated successfully', type: 'success' });
      window.location.reload();
    } catch(error) {
      console.error('Error updating profile:', error);
      setNotification({ message: 'Error updating profile', type: 'error' });
    }
  };

  if (!session || !session.user || status !== 'authenticated')
    return (
      <div className="text-stone-800 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold mb-8">
          You are not logged in. Please log in to view your profile.
        </h1>
      </div>
    )
  if (loading)
    return <Loading />;

  return (
    <div className="container mx-auto p-4 text-stone-800">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-bold">First Name:</td>
            <td className="border px-4 py-2">{(session.user as ExtendedUser).firstName}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Last Name:</td>
            <td className="border px-4 py-2">{(session.user as ExtendedUser).lastName}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Email:</td>
            <td className="border px-4 py-2">{(session.user as ExtendedUser).email}</td>
          </tr>
        </tbody>
      </table>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-gray-600 text-xs italic">Leave blank if you don't want to change it</p>
        </div>

        <div className="flex items-center justify-between relative">
          <button
            type="submit"
            className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isButtonDisabled}
          >
            Update Profile
          </button>

          {isButtonDisabled && (
            <div className="absolute top-full mt-1 bg-gray-700 text-white text-xs rounded py-1 px-2 shadow-lg">
              The profile can be updated only if some information has been changed.
            </div>
          )}
        </div>
      </form>

      {notification && <>
        <Notification
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification(null)}
        />
      </>}
    </div>
  );
};

export default Profile;
