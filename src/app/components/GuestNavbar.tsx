"use client";

import Link from "next/link";
import { useState } from "react";

const GuestNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">Weather Me Now</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link href="/weather" className="text-white hover:text-gray-300">
            About us
          </Link>
          <Link href="/login" className="text-white hover:text-gray-300">
            Sign in
          </Link>
          <Link href="/signup" className="text-white hover:text-gray-300">
            Register
          </Link>
        </div>
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link
            href="/"
            className="block text-white hover:text-gray-300 py-2 px-4"
          >
            Home
          </Link>
          <Link
            href="/weather"
            className="block text-white hover:text-gray-300 py-2 px-4"
          >
            About us
          </Link>
          <Link
            href="/login"
            className="block text-white hover:text-gray-300 py-2 px-4"
          >
            Sign in
          </Link>
          <Link href="/signup" className="text-white hover:text-gray-300">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default GuestNavbar;
