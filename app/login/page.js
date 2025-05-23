import LoginForm from "@/components/LoginForm";
import KeyIcon from "@/icons/Key";
import { getAuthUser } from "@/utils/getAuthUser";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getAuthUser();
  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[95%] max-w-[400px] transition-all duration-300 hover:shadow-2xl mx-4">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <KeyIcon />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-500">
              Please enter your details to sign in
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
