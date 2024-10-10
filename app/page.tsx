"use client";

import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/ssg-logo.svg" // Ensure this path is correct for your SSG logo
            height={1000}
            width={1000}
            alt="SSG Logo"
            className="mb-5 h-20 w-fit rounded-full" // Added rounded-full to make it circular
          />
          <RegisterForm /> {/* Replaced PatientForm with RegisterForm */}
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Jesus Be The Glory!
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/register.gif" // Ensure this image aligns with your SSG Task Management branding
        height={1000}
        width={1000}
        alt="SSG Registration"
        className="side-img max-w-[50%]" // Adjust the size and styling as needed
      />
    </div>
  );
}
