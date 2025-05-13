"use client";

import { useRouter, usePathname } from "next/navigation";
import { LogOut, Newspaper, Tag } from "lucide-react";
import clsx from "clsx"; 
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="w-64 bg-blue-600 text-white min-h-screen px-6 py-8">
      <div className="text-2xl font-bold mb-10">Logoipsum</div>
      <nav className="space-y-4">
        <NavButton
          label="Articles"
          icon={<Newspaper className="w-5 h-5" />}
          href="/admin/dashboard"
          currentPath={pathname}
        />
        <NavButton
          label="Category"
          icon={<Tag className="w-5 h-5" />}
          href="/admin/categories"
          currentPath={pathname}
        />
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-blue-500 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
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
    </div>
  );
}

function NavButton({
  label,
  icon,
  href,
  currentPath,
}: {
  label: string;
  icon: React.ReactNode;
  href: string;
  currentPath: string;
}) {
  const router = useRouter();
  const isActive = currentPath === href;

  return (
    <button
      onClick={() => router.push(href)}
      className={clsx(
        "flex items-center gap-3 w-full text-left px-3 py-2 rounded-md transition",
        isActive ? "bg-blue-500 font-semibold" : "hover:bg-blue-500"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
