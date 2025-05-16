"use client";
import PasswordBtn from "@/components/PasswordBtn";
import KeyIcon from "@/icons/Key";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
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

          <form className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  User Id
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your user Id"
                />
              </div>
              <PasswordBtn />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded-lg border-gray-300 transition-all duration-200"
                  id="remember-me"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
