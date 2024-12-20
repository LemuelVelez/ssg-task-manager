// app/home/page.tsx

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
import { Button } from "@/components/ui/button"; // Ensure the correct import path for Button
import Navbar from "@/components/home/Navbar"; // Import the Navbar component

// Framer Motion variants
const motionVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

export default function Home() {
  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 text-gray-200 overflow-hidden bg-opacity-70"
      style={{
        backgroundImage: "url(/images/background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <Navbar /> {/* Include the Navbar here */}
      {/* Masthead Section */}
      <motion.section
        className="flex flex-1 items-center justify-center text-center py-16 px-4"
        initial="hidden"
        animate="visible"
        variants={motionVariants}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="relative w-32 h-32 mx-auto">
            <Image
              src="/icons/logo.svg"
              height={300}
              width={300}
              alt="SSG Task Management Logo"
              className="object-cover rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to the SSG Task Management System
          </h1>
          <p className="text-lg sm:text-xl">
            Effortlessly manage tasks, track attendance, and ensure active
            participation of members in the SSG office.
          </p>
          <Button variant="gradient" className="mx-auto">
            <Link href="/proof" className="flex items-center justify-center">
              <HiOutlineUpload className="mr-2" size={24} />
              Submit Proof of Duty
            </Link>
          </Button>
        </div>
      </motion.section>
      {/* About Section */}
      <section className="py-16 text-center px-4">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial="hidden"
          animate="visible"
          variants={motionVariants}
        >
          About SSG Task Management
        </motion.h2>
        <p className="max-w-3xl mx-auto text-lg">
          The SSG Task Management System provides a streamlined platform to
          assign, monitor, and track tasks, ensuring officers&apos; active
          participation and duty submissions with ease.
        </p>
      </section>
      {/* Features Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <HiOutlineClipboardList
                  className="text-blue-400 mb-2" // Adjusted to provide some margin below the icon
                  size={24}
                />
              ),
              text: "Assign and track tasks in real-time.",
              bgImage:
                "url('https://www.samratict.com/wp-content/uploads/2015/03/bad_good.gif')",
            },
            {
              icon: (
                <HiOutlineUpload className="text-blue-400 mb-2" size={24} />
              ),
              text: "Upload proof of duty with selfies.",
              bgImage:
                "url('https://www.bakemyweb.com/files/public/de/69/2770cae8aabc7706c58dde69/i/af/bc/64f1b7f4c4d470001e9aafbc/original?name=24.gif-upload.gif&mimetype=image/gif&cd=inline')",
            },
            {
              icon: <FaUserCheck className="text-blue-400 mb-2" size={24} />,
              text: "Submit proof of task completion.",
              bgImage:
                "url('https://images.squarespace-cdn.com/content/v1/53ff9831e4b0b1b06904c5e0/1500458601856-F8KLCDANJAPXEA0FIONA/SubmitButtonAnimation.gif?format=1500w')",
            },
            {
              icon: <MdOfflineBolt className="text-blue-400 mb-2" size={24} />,
              text: "Access Online.",
              bgImage:
                "url('https://www.cliksoftware.com/wp-content/uploads/2022/07/Syncing-to-Clik-Jobs.gif')",
            },
            {
              icon: <MdCheckCircle className="text-blue-400 mb-2" size={24} />,
              text: "Admin approval system for submissions.",
              bgImage:
                "url('https://media.licdn.com/dms/image/v2/D4E12AQHpwhoS6Z8RJw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1659450566928?e=1734566400&v=beta&t=O6uCBMxc6BDISN2PrJeEHUCmgAQMiIrGaJ44GM56zcE')",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 relative"
              style={{
                backgroundImage: feature.bgImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "200px",
              }}
              whileHover="hover"
              variants={motionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-gray-700 bg-opacity-60 p-4 rounded-lg flex flex-col items-center justify-center w-full h-full">
                {feature.icon}
                <span className="text-sm sm:text-base text-center">
                  {feature.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Copyright Section */}
      <div className="text-center py-6 px-4">
        <p className="text-sm sm:text-base">
          © 2024 SSG Task Management System
        </p>
        <p className="text-sm sm:text-base">JESUS BE THE GLORY!</p>
        <div className="mt-4">
          <Link
            href="/admin/login"
            className="flex items-center justify-center text-white underline"
          >
            <HiLockClosed className="text-blue-400 mr-2" size={24} />
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
