"use client";
import { useState } from "react";
import GuestNavbar from "../components/GuestNavbar";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("https://localhost:8443/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Registrering lyckades! Du kan nu logga in.");
        setFormData({ fullName: "", email: "", password: "" }); // Återställ formuläret
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Något gick fel under registreringen."
        );
      }
    } catch (error) {
      setErrorMessage("Ett nätverksfel uppstod. Försök igen senare.");
    }
  };

  return (
    <>
      <GuestNavbar />
      <div className="bg-blue-900 bg-gradient-to-b from-slate-950 flex sm:items-center justify-center min-h-screen px-4">
        <div className="bg-gradient-to-b from-slate-600 shadow-md rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Registrera dig
          </h2>

          {successMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-white"
              >
                Fullständigt namn
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className=" text-black px-1 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Ange ditt namn"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                E-post
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className=" text-black px-1 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Ange din e-post"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Lösenord
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="text-black px-1 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Ange ditt lösenord"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Registrera
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
