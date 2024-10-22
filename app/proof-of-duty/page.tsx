"use client";

import React from "react";
import Navbar from "@/components/home/Navbar"; // Adjust the path as needed

const Page = () => {
  return (
    <div>
      <Navbar /> {/* Include the Navbar here */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Submit Proof of your Duty</h1>
        <p>This is the main content of the page.</p>
      </div>
    </div>
  );
};

export default Page;
