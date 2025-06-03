import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navbarItem";
import { motion } from "framer-motion";
import Logout from "@/icons/Logout";
import Links from "@/icons/Links";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-full flex-col">
      <nav className="flex-1">
        <div className="h-full bg-white/80 backdrop-blur-sm border-r border-blue-100 w-64 flex flex-col">
          <div className="flex-1 px-3 py-4 space-y-1">
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
                    <Links icon={item.icon} />
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
          </div>

          <div className="p-4 border-t border-gray-100">
            <motion.button
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <Logout />
              Logout
            </motion.button>
          </div>
        </div>
      </nav>
    </div>
  );
}
