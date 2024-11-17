import Link from "next/link";
import { useState } from "react";

const UserNavbar = () => {
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
          <Link href="/dashboard" className="text-white hover:text-gray-300">
            Dashboard
          </Link>
          <Link
            href="/todaysWeather"
            className="text-white hover:text-gray-300"
          >
            Todays Weather
          </Link>
          <Link
            href="/login"
            className="text-white hover:text-gray-300"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                fetch("https://localhost:8443/api/auth/logout", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((response) => {
                    if (response.ok) {
                      console.log("Logged out successfully");
                    } else {
                      console.error("Failed to log out");
                    }
                  })
                  .catch((error) => console.error("Logout error:", error));
              }
              localStorage.removeItem("token");
              localStorage.removeItem("userRole");
            }}
          >
            Logout
          </Link>
        </div>
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link
            href="/dashboard"
            className="block text-white hover:text-gray-300 py-2 px-4"
          >
            Dashboard
          </Link>
          <Link
            href="/todaysWeather"
            className="block text-white hover:text-gray-300 py-2 px-4"
          >
            Todays Weather
          </Link>
          <Link
            href="/login"
            className="block text-white hover:text-gray-300 py-2 px-4"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
