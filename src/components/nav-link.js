"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();

  const isActive = path === href;

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md transition-colors ${
        isActive ? "bg-indigo-500 text-white" : "bg-transparent text-indigo-200"
      }`}
    >
      {children}
    </Link>
  );
}
