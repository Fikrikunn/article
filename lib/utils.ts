import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function logout() {
  const confirmed = window.confirm("Are you sure you want to logout?");
  if (!confirmed) return;
  
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/"; 
}
