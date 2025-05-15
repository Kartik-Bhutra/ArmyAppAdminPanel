"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function adminLayout ({ children }){
    const pathname = usePathname();
    const [open, setOpen] = useState(true);
  return (
    <div className="bg-gray-100 font-sans">
      <div className="flex h-screen">
        <aside className={`w-64 bg-blue-600 text-white flex flex-col position-fixed top-0 h-screen sidebar_custom ${open ? "open" : ""}`}>
          <div className="hamburger" onClick={() => setOpen(!open)}>☰</div>
          <div className="text-2xl font-bold p-6 border-b border-blue-700">
            Army Admin
          </div>
          <nav className="flex flex-col justify-between h-full">
            <div className="flex-1 p-4 space-y-2">
              <Link href="/admin/clients" className={`block py-2 px-4 rounded ${pathname === "/admin/clients" ? "bg-blue-700" : ""} hover:bg-blue-700 `}>
                Clients
              </Link>
              <Link href="/admin/blocked" className={`block py-2 px-4 rounded ${pathname === "/admin/blocked" ? "bg-blue-700" : ""} hover:bg-blue-700 `}>
                Blocked List
              </Link>
              <Link href="/admin/reports" className={`block py-2 px-4 rounded ${pathname === "/admin/reports" ? "bg-blue-700" : ""} hover:bg-blue-700 `}>
                Reported Numbers
              </Link>
            </div>
            <div className="p-4 space-y-2">
              <button className={`block cursor-pointer w-full text-left py-2 px-4 rounded hover:bg-blue-700 `}> Logout </button>
            </div>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
          <header className="bg-white p-4 shadow flex items-center justify-end position-fixed top-0 right-0 z-10">
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Logged in as <b className="font-bold">{"Samay Patel"}</b></span>
            </div>
          </header>

          <main className="flex-1 p-4 overflow-y-scroll">{children}</main>
        </div>
      </div>
    </div>
  );
};
