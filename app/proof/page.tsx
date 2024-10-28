"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar"; // Adjust the path as needed
import ProofForm from "@/app/admin/approval/ProofForm"; // Adjust the path as needed
import ProofList from "@/components/ProofList";

const Page = () => {
  const [proofs] = useState([]);

  // Function to handle proof submission
  const handleAddProof = (
    file: File,
    type: "Duty" | "Task",
    description: string,
    status: "Pending" | "Approved" | "Rejected"
  ) => {
    // Implement the logic here as needed, e.g., updating state or sending data to the server
    console.log("New Proof Submitted:", { file, type, description, status });
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <Navbar /> {/* Include the Navbar here */}
      <div className="p-4">
        <motion.h1
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Proof Submission
        </motion.h1>
        <motion.p
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Please upload your proof of duty or task completion for review and
          approval.
        </motion.p>
        {/* Proof Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProofForm onAddProof={handleAddProof} />
        </motion.div>
        {/* Proof List */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ProofList proofs={proofs} />
        </motion.div>
      </div>
      <div className="text-center py-6 px-4">
        <p className="text-sm sm:text-base">
          © 2024 SSG Task Management System
        </p>
        <p className="text-sm sm:text-base">JESUS BE THE GLORY!</p>
      </div>
    </div>
  );
};

export default Page;
