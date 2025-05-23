import { getAuthUser } from "@/utils/getAuthUser";
import { redirect } from "next/navigation";

export default async function HomePage() {
  let user;

  try {
    user = await getAuthUser();
    if (!user) {
      redirect("/login");
    }
  } catch (err) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome Back, {user?.role === "admin" ? "Administrator" : "Owner"}
          </h1>
          <p className="mt-2 text-gray-600">You are logged in as {user?.userId}</p>
        </div>
      </div>
    </div>
  );
}
