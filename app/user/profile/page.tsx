"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarDetail from "@/components/ui/NavbarDetail";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";

export default function UserProfile() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    const uname = localStorage.getItem("username");
    const urole = localStorage.getItem("role");
    const upassword = localStorage.getItem("password");
    if (upassword) setPassword(upassword);
    if (uname) setUsername(uname);
    if (urole) setRole(urole);
  }, []);

  return (
    <>
  <NavbarDetail />
       <div className="min-h-screen flex flex-col justify-between bg-white">

  <div className="flex flex-col items-center justify-center text-center flex-grow px-4">
    <h1 className="text-2xl font-semibold mt-0 mb-6">User Profile</h1>

    {/* Avatar */}
    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-lg font-semibold text-blue-700 mb-1">
      {username.charAt(0).toUpperCase()}
    </div>

    {/* Info Box */}
    <div className="p-4 w-full max-w-sm">
      <div className="space-y-2">
        <div className="bg-gray-100 grid grid-cols-3 items-center px-4 py-2 rounded-lg">
          <span className="font-semibold">Username</span>
          <span className="text-center">:</span>
          <span className="text-center">{username}</span>
        </div>
        <div className="bg-gray-100 grid grid-cols-3 items-center px-4 py-2 rounded-lg">
          <span className="font-semibold">Password</span>
          <span className="text-center">:</span>
          <span className="text-center">{password}</span>
        </div>
        <div className="bg-gray-100 grid grid-cols-3 items-center px-4 py-2 rounded-lg mb-2">
          <span className="font-semibold">Role</span>
          <span className="text-center">:</span>
          <span className="text-center">{role}</span>
        </div>
      </div>

      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
        onClick={() => router.push("/user/articles")}
      >
        Back to home
      </Button>
    </div>
  </div>

  <Footer />
</div>
</>
  );
}
