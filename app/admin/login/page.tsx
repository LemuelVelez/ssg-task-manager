"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiOutlineLogin,
} from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
  loginWithEmailAndPassword,
  getLoggedInUser,
} from "@/lib/utils/appwrite";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const loginForm = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const user = await getLoggedInUser();
        if (user) {
          console.info("User is already logged in, redirecting to dashboard.");
          router.replace("/admin/dashboard");
        }
      } catch (error) {
        console.log("User not logged in.");
      }
    };

    checkUserLoggedIn();
  }, [router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const session = await loginWithEmailAndPassword(email, password);
      if (session.userId) {
        console.info("Login successful, redirecting to admin dashboard.");
        router.replace("/admin/dashboard");
      }
    } catch (err) {
      setError((err as any)?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 text-gray-200 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.section
        className="flex flex-1 items-center justify-center text-center py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            className="relative w-32 h-32 mx-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/icons/logo.svg"
              height={300}
              width={300}
              alt="SSG Task Management Logo"
              className="object-cover rounded-full"
            />
          </motion.div>
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Admin Login
          </h1>
          <p className="text-lg sm:text-xl">
            Please enter your credentials to access the admin dashboard.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="flex flex-1 items-center justify-center py-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="bg-gray-800 bg-opacity-80 p-6 sm:p-8 rounded-lg shadow-md max-w-sm w-full">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin} ref={loginForm}>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 pl-10 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter a valid email address"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 pl-10 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                variant="gradient"
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  "Logging in..."
                ) : (
                  <>
                    <HiOutlineLogin className="mr-2" size={24} /> Login
                  </>
                )}
              </Button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-4">
            <hr className="flex-grow border-gray-600" />
            <span className="text-gray-400 mx-2">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>
          <div className="text-center mt-4">
            <Link href="/" className="text-blue-400 underline">
              Back to Home
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.div
        className="text-center py-6 bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 text-gray-200 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="text-sm sm:text-base">
          © 2024 SSG Task Management System
        </p>
        <p className="text-sm sm:text-base">JESUS BE THE GLORY!</p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
