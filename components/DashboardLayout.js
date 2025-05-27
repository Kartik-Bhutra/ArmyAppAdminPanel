"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navbarItem";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center px-6">
            <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
          </div>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <button
              className="ml-4 text-gray-600 hover:text-gray-900"
              onClick={() => {
                /* Add logout logic */
              }}
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <header className="h-16 bg-white shadow-sm border-b border-gray-200">
            <div className="h-full px-6 flex items-center justify-end">
              <div className="flex items-center">
                <span className="text-gray-700">Welcome,</span>
                <span className="ml-2 font-medium text-gray-900">
                  Samay Patel
                </span>
              </div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
