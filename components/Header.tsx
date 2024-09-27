'use client';
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header className="bg-stone-800 p-4 flex justify-between items-center sticky top-0 relative">
      <h1 className="text-white text-3xl font-extrabold px-2"><Link href="/">Recipe Finder</Link></h1>

      {/* Search form - hidden on small screens */}
      <form 
        onSubmit={handleSearchSubmit} 
        className={`${
          showSearch ? 'block' : 'hidden'
        } md:block absolute top-16 right-16 md:static md:flex border-solid border-4 border-stone-800`}
      >
        <input
          type="text"
          placeholder="Search ingredients/recipes"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 focus:outline-none text-stone-800"
        />
        <button
          type="submit"
          className="bg-orange-500 text-stone-100 px-4 py-2 hover:bg-orange-600"
        >
          Search
        </button>
      </form>

      {/* Search Icon for small screens */}
      <button 
        onClick={toggleSearch} 
        className="block md:hidden text-white text-3xl px-4"
        aria-label="Toggle Search"
      >
        {/* Search SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.25-6.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          />
        </svg>
      </button>

      <div className="">
        {status === 'authenticated' ? (
          <div className="flex items-center space-x-4 px-2">
            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="text-white font-bold bg-stone-800 px-4 py-2 rounded group-hover:text-orange-600 hover:text-orange-500">Profile</button>
              <div className="absolute hidden group-hover:block bg-stone-700 top-full right-0 rounded shadow-lg w-48 text-left">
                <Link href="/ingredients">
                  <div className="block px-4 py-2 text-white hover:bg-stone-600">
                    My Ingredients
                  </div>
                </Link>
                <Link href="/favorites">
                  <div className="block px-4 py-2 text-white hover:bg-stone-600">
                    Favorite Recipes
                  </div>
                </Link>
                <Link href="/profile">
                  <div className="block px-4 py-2 text-white hover:bg-stone-600">
                    Edit Profile
                  </div>
                </Link>
                <div className="block px-4 py-2 text-white hover:bg-stone-600 cursor-pointer" onClick={() => signOut()}>
                  Logout
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link href="/auth/signin">
              <span className="font-bold px-4 hover:text-orange-500">Login</span>
            </Link>
            <Link href="/register">
              <span className="font-bold px-4 hover:text-orange-500">Register</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
