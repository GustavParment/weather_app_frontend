"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GuestNavbar from "../components/GuestNavbar";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("https://localhost:8443/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Token:", data.token);

      localStorage.setItem("token", data.token);
      if (data.role) {
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("username", username);
      }

      router.push("/dashboard");
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Login failed");
    }
  };

  return (
    <>
    <GuestNavbar />
      <div className="flex justify-center items-center min-h-screen bg-blue-300 px-4">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xs">
          <h2 className="text-cyan-800 text-2xl text-center mb-6">
            Logga in på Mina Sidor
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Användarnamn
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Lösenord
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Logga In
            </button>
            {error && (
              <p className="text-red-500 text-xs italic mt-4">{error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
