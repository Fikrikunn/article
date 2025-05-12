"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SideBar from "@/components/ui/SideBar";
import NavbarAdmin from "@/components/ui/NavbarAdmin";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const uname = localStorage.getItem("username");
    const urole = localStorage.getItem("role");
    const upassword = localStorage.getItem("password");

    if (uname) setUsername(uname);
    if (urole) setRole(urole);
    if (upassword) setPassword(upassword);
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex flex-1 flex-col">
        <div className="px-6 py-4 bg-white border-b">
          <NavbarAdmin pathname="Category"/>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center bg-white px-4 text-center">
          <h1 className="text-2xl font-semibold mb-6">User Profile</h1>

          {/* Avatar */}
          <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 flex items-center justify-center text-lg font-semibold text-blue-700">
            {username.charAt(0).toUpperCase()}
          </div>

          {/* Info Box */}
          <div className="w-full max-w-sm space-y-2">
            <InfoRow label="Username" value={username} />
            <InfoRow label="Password" value={password} />
            <InfoRow label="Role" value={role} />
          </div>

          <Button
            className="w-full max-w-sm mt-6 bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/admin/dashboard")}
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

// Komponen kecil untuk merapikan Info Row
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-3 items-center bg-gray-100 px-4 py-2 rounded-lg">
    <span className="font-semibold">{label}</span>
    <span className="text-center">:</span>
    <span className="text-center">{value}</span>
  </div>
);

export default Page;
