"use client";

import AdminSignInForm from "@/components/forms/AdminSignInForm"; // Using the updated form for admin sign-in
import Image from "next/image";
import React from "react";

export default function AdminSignIn() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/ssg-logo.svg" // Ensure this path is correct for your SSG logo
            height={1000}
            width={1000}
            alt="SSG Logo"
            className="mb-5 h-20 w-fit rounded-full"
          />
          <AdminSignInForm /> {/* Use the AdminSignInForm component */}
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Jesus Be The Glory!
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/signin.gif" // Adjust the image for admin branding
        height={1000}
        width={1000}
        alt="Admin Sign In"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
