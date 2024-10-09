"use client"; // Ensure this is a client component
import React from "react";
import Image from "next/image";
import { User, Clipboard, ShieldCheck, Bell } from "@phosphor-icons/react"; // Importing Shadcn UI icons

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-5 overflow-hidden">
      {" "}
      {/* Added overflow-hidden */}
      {/* Header */}
      <header className="flex justify-between items-center">
        <Image
          src="/ssg.svg"
          alt="SSG Logo"
          className="rounded-full"
          width={100}
          height={100}
        />
        <nav>
          <a
            href="#features"
            className="mx-3 text-white transform transition-transform duration-300 hover:scale-110 hover:text-green-400"
          >
            Features
          </a>
          <a
            href="#signin"
            className="mx-3 text-white transform transition-transform duration-300 hover:scale-110 hover:text-green-400"
          >
            Sign In
          </a>
          <a
            href="#signup"
            className="mx-3 text-white transform transition-transform duration-300 hover:scale-110 hover:text-green-400"
          >
            Sign Up
          </a>
        </nav>
      </header>
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center h-screen text-white"
        style={{
          backgroundImage:
            "url('https://www.proofhub.com/articles/wp-content/uploads/2023/03/giphy.gif')",
          backgroundSize: "cover", // Ensures the background covers the entire section
          backgroundRepeat: "no-repeat", // Prevents the background from repeating
          backgroundPosition: "center", // Centers the background
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-85"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold">
            Manage Your Tasks with Ease
          </h2>
          <p className="text-lg mt-3">
            Join our community and take control of your tasks.
          </p>
          <div className="mt-5">
            <button className="bg-blue-600 px-5 py-2 rounded mr-3 transition transform hover:bg-blue-700 hover:scale-105">
              Sign In
            </button>
            <button className="bg-green-600 px-5 py-2 rounded transition transform hover:bg-green-700 hover:scale-105">
              Sign Up
            </button>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <h2 className="text-3xl text-center text-white">Features</h2>
        <div className="flex justify-center mt-10">
          {/* Feature 1: User Authentication */}
          <div className="flex flex-col items-center mx-4 text-center transform transition-transform hover:scale-110 hover:text-green-400">
            <User className="w-16 h-16 mb-2 rounded transition-transform duration-300 transform hover:rotate-12" />
            <h3 className="mt-2">User Authentication</h3>
            <p>Secure sign up and sign in via email or social media.</p>
          </div>

          {/* Feature 2: Task Management */}
          <div className="flex flex-col items-center mx-4 text-center transform transition-transform hover:scale-110 hover:text-green-400">
            <Clipboard className="w-16 h-16 mb-2 rounded transition-transform duration-300 transform hover:rotate-12" />
            <h3 className="mt-2">Task Management</h3>
            <p>Create, edit, and delete tasks with ease.</p>
          </div>

          {/* Feature 3: Role Management */}
          <div className="flex flex-col items-center mx-4 text-center transform transition-transform hover:scale-110 hover:text-green-400">
            <ShieldCheck className="w-16 h-16 mb-2 rounded transition-transform duration-300 transform hover:rotate-12" />
            <h3 className="mt-2">Role Management</h3>
            <p>Assign roles and manage user access effectively.</p>
          </div>

          {/* Feature 4: Task Reminders */}
          <div className="flex flex-col items-center mx-4 text-center transform transition-transform hover:scale-110 hover:text-green-400">
            <Bell className="w-16 h-16 mb-2 rounded transition-transform duration-300 transform hover:rotate-12" />
            <h3 className="mt-2">Task Reminders</h3>
            <p>Receive notifications for upcoming deadlines.</p>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-gray-900">
        <h2 className="text-3xl text-center justify-center text-white">
          How It Works
        </h2>
        <div className="flex justify-center mt-10">
          {/* Step 1 - Sign Up */}
          <div className="flex flex-col items-center mx-4 text-center transform transition-transform hover:scale-110 hover:text-green-400">
            <img
              src="https://media.tenor.com/pSkzLUayMVEAAAAi/ekruut-sign-up.gif"
              alt="Sign Up GIF"
              className="w-16 h-16 mb-2 rounded transition-transform duration-300 transform hover:rotate-12"
            />
            <h3 className="mt-2">1. Sign Up</h3>
            <p>Create an account to get started.</p>
          </div>

          {/* Step 2 - Create Tasks */}
          <div className="flex flex-col items-center mx-4 text-center transform transition-transform hover:scale-110 hover:text-green-400">
            <img
              src="https://media1.tenor.com/m/Mos3BAm5aTcAAAAC/checklist-task.gif"
              alt="Create Tasks GIF"
              className="w-16 h-16 mb-2 rounded transition-transform duration-300 transform hover:rotate-12"
            />
            <h3 className="mt-2">2. Create Tasks</h3>
            <p>Add tasks to organize your workload.</p>
          </div>

          {/* Step 3 - Track Progress */}
          <div className="flex flex-col items-center mx-4 text-center transform transition-transform hover:scale-110 hover:text-green-400">
            <video
              src="https://i.gifer.com/PVtR.mp4"
              className="w-16 h-16 mb-2 rounded transition-transform duration-300 transform hover:rotate-12"
              autoPlay
              loop
              muted
            />
            <h3 className="mt-2">3. Track Progress</h3>
            <p>Monitor your progress and stay productive.</p>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 text-center">
        <h2 className="text-2xl">Ready to get started?</h2>
        <button className="bg-green-600 px-5 py-2 rounded mt-3 transition transform hover:bg-green-700 hover:scale-105">
          Join Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
