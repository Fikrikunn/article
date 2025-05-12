"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth(requiredRole?: "User" | "Admin") {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Kalau belum login
    if (!token) {
      router.replace("/login");
      return;
    }

    // Kalau role tidak sesuai
    if (requiredRole && role !== requiredRole) {
      router.replace("/login");
      return;
    }

    setLoading(false);
  }, [requiredRole, router]);

  return { loading };
}
