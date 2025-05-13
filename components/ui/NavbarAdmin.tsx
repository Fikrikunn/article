"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function NavbarAdmin({pathname}: { pathname: string }) {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const localStorageUsername = localStorage.getItem("username");
    if (localStorageUsername) {
      setUsername(localStorageUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    router.push("/");
  };
  return (
    <>
      <nav className="px-6 py-5 mx-auto flex justify-between items-center backdrop-blur-lg border-b-2 z-50">
        <Link href="/admin/dashboard" passHref>
     <h1 className="text-xl font-semibold text-black">{pathname}</h1>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" className="flex items-center gap-2 cursor-pointer">
              <img
                src={`https://avatar.iran.liara.run/username?username=${username}&length=1&background=87CEFA&color=00008B`}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-black">{username}</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <Link href="/admin/profile" passHref>
              <DropdownMenuItem asChild>
                <span>My Account</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => setOpen(true)} className="text-red-500">
              <LogOut className="text-red-500 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* Logout Dialog */}
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
