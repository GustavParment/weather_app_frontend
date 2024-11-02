"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserNavbar from "../components/UserNavbar";

const Dashboard = () => {
  const router = useRouter();
  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("username");

  console.log(userRole);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
    <UserNavbar />
    <div className="flex h-screen bg-cyan-800 justify-center items-center ">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-white sm:text-4xl">Välkommen till Dashboard!</h1>
        <p className="text-white p-4 sm:text-xl">{userName}</p>
        <p>Du har {userRole} access</p>
        <p>sidan är under konstruktion</p>
        </div>
        
      </div>
    </>
  );
};

export default Dashboard;
