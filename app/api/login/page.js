"use client";
import { useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
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
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("userId", "==", formData.userId),
        where("password", "==", formData.password)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid user ID or password");
        return;
      }

      const userData = querySnapshot.docs[0].data();

      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/");
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
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
