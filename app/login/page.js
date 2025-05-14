"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoginInput from "@/components/LoginInput";
import SignInButton from "@/components/SignInButton";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      Cookies.set("token", data.token, { secure: true, sameSite: "Strict" });
      Cookies.set("role", data.role, { secure: true, sameSite: "Strict" });

      router.push("/");
    } catch (err) {
      setError("An error occurred during login");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 animate-fadeIn">
        Welcome Back
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl"
      >
        <LoginInput
          text="User ID"
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />
        <LoginInput
          text="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
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
        <SignInButton loading={loading} />
      </form>
    </div>
  );
}
