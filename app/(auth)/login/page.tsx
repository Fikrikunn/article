// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const loginSchema = z.object({
//   username: z.string().min(1, "Please enter your username"),
//   password: z.string().min(6, "Please enter your password"),
// });

// type LoginSchema = z.infer<typeof loginSchema>;

// export default function LoginPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginSchema>({
//     resolver: zodResolver(loginSchema),
//   });

//   const router = useRouter()

//  useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     if (token) {
//       if (role === "User") {
//         router.push("/user/articles");
//       } else if (role === "Admin") {
//         router.push("/admin/dashboard");
//       } else {
//         router.push("/login");
//       }
//     } else {
//       router.push("/login");
//     }
//   }, [router]);


//   const onSubmit = async (data: LoginSchema) => {
//     try {
//       const response = await axios.post("https://test-fe.mysellerpintar.com/api/auth/login", data)

//       console.log("Success login", data);

//       const { token, role } = response.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("username", data.username);
//       localStorage.setItem("password", data.password);

//       // Redirect berdasarkan role yang dikembalikan dari server
//       if (role === "Admin") {
//         window.location.href = "/admin/dashboard";
//       } else {
//         window.location.href = "/user/articles";
//       }
//     } catch (error) {
//       console.error("Login error", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
//         <div className="flex justify-center mb-6">
//           <img src="logo-1d.png" alt="Logo" className="h-30 w-50" />
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           <div>
//             <Label className="mb-2">Username</Label>
//             <Input {...register("username")} placeholder="Input username" />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
//             )}
//           </div>
//           <div>
//             <Label className="mb-2">Password</Label>
//             <Input
//               {...register("password")}
//               type="password"
//               placeholder="Input password"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>
//           <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
//             Login
//           </Button>
//         </form>
//         <p className="text-center text-sm mt-4">
//           Don&apos;t have an account?{" "}
//           <Link href="/register" className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
