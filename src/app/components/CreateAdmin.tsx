"use client";

import { useState } from "react";
import { createAdmin, AdminData } from "@/services/apiServiceAdmin";

interface CreateAdminFormProps {
  token: string;
}

const CreateAdminForm = ({ token }: CreateAdminFormProps) => {
  const [adminData, setAdminData] = useState<AdminData>({
    email: "",
    password: "",
    fullName: "",
  });
  const [creationError, setCreationError] = useState<string | null>(null);
  const [creationSuccess, setCreationSuccess] = useState<string | null>(null);

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdminCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreationError(null);
    setCreationSuccess(null);

    try {
      const response = await createAdmin(adminData, token);
      setCreationSuccess(`Admin created successfully: ${response.fullName}`);
      setAdminData({ email: "", password: "", fullName: "" });
    } catch (err: any) {
      setCreationError(err.message || "Failed to create admin");
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-600 shadow-md rounded-lg p-8 w-full max-w-xs">
      <h2 className="text-white text-2xl text-center mb-6">Skapa en Ny Admin</h2>
      <form onSubmit={handleAdminCreation}>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="fullName"
          >
            Admin Name
          </label>
          <input
            type="text"
            name="fullName"
            value={adminData.fullName}
            onChange={handleAdminInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleAdminInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Lösenord
          </label>
          <input
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleAdminInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Skapa
        </button>
      </form>
      {creationError && (
        <p className="text-red-500 text-center mt-4">{creationError}</p>
      )}
      {creationSuccess && (
        <p className="text-green-500 text-center mt-4">{creationSuccess}</p>
      )}
    </div>
  );
};

export default CreateAdminForm;
