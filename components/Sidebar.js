"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navbarItem";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="h-full flex flex-col">
      <nav className="flex-1 py-4">
        <div className="h-full bg-white/80 backdrop-blur-sm border-r border-blue-100 w-64 flex-shrink-0 hidden md:block">
          <nav className="mt-8 space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    className={`relative group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                  }`}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.icon}
                      />
                    </svg>
                    <span className="truncate">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 w-1 h-full bg-blue-600 rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </nav>
    </div>
  );
}
