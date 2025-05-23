"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PasswordBtn from "./PasswordBtn";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const userData = {
      userId: formData.get("userId"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!res.ok) {
        return;
      }
      const data = await res.json();
      const userCredential = await signInWithCustomToken(auth, data.token);
      const idToken = await userCredential.user.getIdToken();
      await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      });
      router.push("/");
      router.refresh();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="space-y-6" ref={formRef} onSubmit={handleFormSubmit}>
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            User Id
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your user Id"
            name="userId"
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
            name="remerber-me"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
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
        disabled={loading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium 
          transition-all duration-200 hover:bg-blue-700 focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
          transform hover:-translate-y-0.5 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
