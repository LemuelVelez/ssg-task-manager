"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineClipboardList,
  HiLockClosed,
  HiOutlineUpload,
} from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";
import { MdOfflineBolt, MdCheckCircle } from "react-icons/md";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-200 overflow-hidden">
      {/* Main Content Section */}
      <section className="flex flex-1 items-center justify-center">
        <Card className="max-w-xl p-6 space-y-6 bg-gray-900 rounded-lg shadow-lg w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10">
          {/* Centered Logo Section */}
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 overflow-hidden rounded-full">
              <Image
                src="/icons/logo.svg"
                height={300}
                width={300}
                alt="SSG Task Management Logo"
                className="object-cover"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl">
            Welcome to the SSG Task Management System
          </h1>
          <p className="text-center text-base sm:text-lg md:text-xl">
            Effortlessly manage tasks, track attendance, and ensure active
            participation of members in the SSG office.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-1 gap-6 mt-6">
            {[
              {
                icon: (
                  <HiOutlineClipboardList
                    className="text-blue-400 mr-3"
                    size={24}
                  />
                ),
                text: "Assign and track tasks in real-time.",
              },
              {
                icon: (
                  <HiOutlineUpload className="text-blue-400 mr-3" size={24} />
                ),
                text: "Upload proof of duty with selfies.",
              },
              {
                icon: <FaUserCheck className="text-blue-400 mr-3" size={24} />,
                text: "Submit proof of task completion.",
              },
              {
                icon: (
                  <MdOfflineBolt className="text-blue-400 mr-3" size={24} />
                ),
                text: "Access offline and sync when online.",
              },
              {
                icon: (
                  <MdCheckCircle className="text-blue-400 mr-3" size={24} />
                ),
                text: "Admin approval system for submissions.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center p-4 border border-gray-600 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {feature.icon}
                <span className="text-sm sm:text-base">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Proof Submission Button */}
          <div className="flex justify-center mt-6">
            <Button>
              <Link
                href="/submit-proof"
                className="flex items-center w-full justify-center"
              >
                <HiOutlineUpload className="text-blue-400 mr-2" size={24} />
                Submit Proof of Duty
              </Link>
            </Button>
          </div>

          {/* Admin Sign In Link */}
          <div className="flex justify-center mt-4">
            <Link
              href="/admin/login"
              className="flex items-center text-white underline"
            >
              <HiLockClosed className="text-blue-400 mr-2" size={24} />
              Admin Login
            </Link>
          </div>

          {/* Footer Section */}
          <div className="text-center mt-6">
            <p className="text-sm sm:text-base">
              © 2024 SSG Task Management System
            </p>
            <p className="text-sm sm:text-base">JESUS BE THE GLORY!</p>
          </div>
        </Card>
      </section>
    </div>
  );
}
