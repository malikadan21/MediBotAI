'use client'; // Ensure this file is treated as a Client Component

import React, { useState } from 'react';
import { FaSignInAlt, FaUserPlus, FaCommentDots } from 'react-icons/fa'; // Updated icons
import Link from 'next/link'; // Import Link for navigation

const FloatingActionButton = ({ color }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prevState => !prevState);
    console.log('FAB toggled. isOpen:', !isOpen); // Debugging log
  };

  return (
    <div className="relative">
      {/* FAB Button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-4 left-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${color} text-white text-xl`}
      >
        +
      </button>

      {/* Options */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 flex flex-col space-y-2">
          <Link href="/login" className="flex flex-col items-center">
            <button className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg">
              <FaSignInAlt size={24} />
            </button>
            <span className="mt-1 text-sm text-white">Login</span>
          </Link>
          <Link href="/signup" className="flex flex-col items-center">
            <button className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg">
              <FaUserPlus size={24} />
            </button>
            <span className="mt-1 text-sm text-white">Signup</span>
          </Link>
          <Link href="/feedback" className="flex flex-col items-center">
            <button className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center shadow-lg">
              <FaCommentDots size={24} />
            </button>
            <span className="mt-1 text-sm text-white">Feedback</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;
