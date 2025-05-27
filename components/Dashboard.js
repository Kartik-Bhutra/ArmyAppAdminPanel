import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function Dashboard({ children, user }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex h-16 items-center justify-between bg-white/80 backdrop-blur-sm px-4 shadow-md md:px-6 border-b border-blue-100">
        <div className="flex items-center gap-4">
          <MobileNav />
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Army Admin
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="font-medium">{user?.userId}</span>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
