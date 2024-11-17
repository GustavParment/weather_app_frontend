"use client";

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserNavbar from "../components/UserNavbar";
import { fetchAllUsers, UserData } from "@/services/apiServiceUser";

const Dashboard = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      router.push("/login");
    } else {
      setUserRole(role);
    }
  }, [router]);

  useEffect(() => {
    if (userRole === "ROLE_ADMIN" || userRole === "ROLE_SUPER_ADMIN") {
      fetchAllUsers()
        .then((data) => {
          setUsers(data);
          setError(null);
        })
        .catch((err) => {
          setError("Failed to fetch users: " + err.message);
          setUsers([]);
        });
    }
  }, [userRole]);

  return (
    <>
      <UserNavbar />
      <div className="bg-cyan-800">
        {(userRole === "ROLE_ADMIN" || userRole === "ROLE_SUPER_ADMIN") && (
          <>
            <div
              className="flex justify-center p-4 
        bg-gradient-to-b from-black"
            >
              <h2 className="text-white sm:text-lg xl:text-xl sm:p-2">
                User Database
              </h2>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex flex-col items-center text-white">
              {users.length > 0 ? (
                <table className="table-auto border-collapse border border-slate-500 w-3/4 mt-4">
                  <thead>
                    <tr>
                      <th className="border border-slate-600 px-4 py-2">ID</th>
                      <th className="border border-slate-600 px-4 py-2">
                        Email
                      </th>
                      <th className="border border-slate-600 px-4 py-2">
                        Full Name
                      </th>
                      <th className="border border-slate-600 px-4 py-2">
                        Roles
                      </th>
                      <th className="border border-slate-600 px-4 py-2">
                        Created At
                      </th>
                      <th className="border border-slate-600 px-4 py-2">
                        Updated At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="border border-slate-700 px-4 py-2">
                          {user.id}
                        </td>
                        <td className="border border-slate-700 px-4 py-2">
                          {user.email}
                        </td>
                        <td className="border border-slate-700 px-4 py-2">
                          {user.fullName}
                        </td>
                        {/* Hantera undefined rollers med || [] */}
                        <td className="border border-slate-700 px-4 py-2">
                          {user.role.name}
                        </td>
                        <td className="border border-slate-700 px-4 py-2">
                          {user.createdAt}
                        </td>
                        <td className="border border-slate-700 px-4 py-2">
                          {user.updatedAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                !error && <p>No users found.</p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex h-screen bg-cyan-800 justify-center">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-white sm:text-4xl">Välkommen till Dashboard!</h1>
          <p>Du har "{userRole}"</p>
          <p>sidan är under konstruktion</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
