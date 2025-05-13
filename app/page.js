import LoginInput from "@/components/LoginInput";
import SignInButton from "@/components/SignInButton";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 animate-fadeIn">
        Welcome Back
      </h1>
      <form className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl">
        <LoginInput text={"User Id"} />
        <LoginInput text={"Password"} />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 transition-all duration-200"
            />
            <p className="ml-2 text-sm text-gray-600">Remember me</p>
          </div>
          <button
            type="button"
            className="text-sm text-blue-500 hover:text-blue-700 transition-all duration-200"
          >
            Forgot Password?
          </button>
        </div>
        <SignInButton />
      </form>
    </div>
  );
}