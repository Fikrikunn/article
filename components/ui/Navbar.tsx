"use client";
import { logout } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { LogOut } from 'lucide-react';
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Navbar() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const localStorageUsername = localStorage.getItem("username");
    if (localStorageUsername) {
      setUsername(localStorageUsername);
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    router.push("/");
  };

  return (
    <>
    <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
      <Link href={"/user/articles"}>
      <h1 className="text-xl font-bold text-white">Logoipsum</h1>
      </Link>
      <div className="flex items-center gap-4">
          
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="link" className="flex items-center gap-2 cursor-pointer">
          <img
            src={`https://avatar.iran.liara.run/username?username=${username}&length=1&background=87CEFA&color=00008B`}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-white">
          {username}
          </div>
        </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <Link href="/user/profile" passHref>
          <DropdownMenuItem asChild>
            <span>My Account</span>
          </DropdownMenuItem>
        </Link>
          <DropdownMenuItem onClick={() => setOpen(true)}
          className="text-red-500 mr-2"
          >
            <LogOut className="text-red-500"/>Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </nav>

    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
          </DialogHeader>
          <p className="text-gray-500">Are you sure want to logout?</p>
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </>
  );
}
