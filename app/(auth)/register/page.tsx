"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios from "axios";

// ✅ Update schema untuk menyertakan role
const loginSchema = z.object({
  username: z.string().min(1, "Username field cannot be empty"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["User", "Admin"], {
    required_error: "Role is required",
  }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await axios.post("https://test-fe.mysellerpintar.com/api/auth/register", data);
      console.log("Success login", res.data);
    } catch (error) {
      console.error("Login error", error);
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <div className="flex justify-center mb-6">
          <img src="/logo-1d.png" alt="Logo" className="h-30 w-50" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label className="mb-2">Username</Label>
            <Input {...register("username")} placeholder="Input username" />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-2">Password</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Input password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-2">Role</Label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              defaultValue=""
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Register
          </Button>
        </form>
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
