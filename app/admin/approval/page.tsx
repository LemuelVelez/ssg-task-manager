"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import NotificationForm from "./NotificationForm";
import NotificationList from "./NotificationList";
import ProofList from "./ProofList";
import withAuth from "@/app/hoc/withAuth";
import { updateProofStatus, getProofs } from "@/lib/utils/appwrite"; // Import necessary Appwrite functions

// Define the types for proofs
interface Proof {
  id: string; // Changed to string to match Appwrite document ID type
  type: "Duty" | "Task";
  fileUrl: string; // Include fileUrl to match the ProofList interface
  description: string;
  status: "Pending" | "Approved" | "Rejected"; // Change to uppercase
}

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [proofs, setProofs] = useState<Proof[]>([]); // Initialize proofs state

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle adding a new notification
  const handleAddNotification = () => {
    // Logic to handle adding notifications
  };

  // Handle notification deletion
  const handleDeleteNotification = () => {
    // Logic to handle notification deletion
  };

  // Fetch proofs from Appwrite
  const fetchProofs = async () => {
    try {
      const retrievedProofs: Proof[] = await getProofs(); // Fetch proofs
      setProofs(retrievedProofs); // Set the fetched proofs
    } catch (error) {
      console.error("Error fetching proofs:", error);
    }
  };

  // Handle updating proof status
  const onUpdateProofStatus = async (
    id: string,
    status: "Pending" | "Approved" | "Rejected"
  ) => {
    try {
      await updateProofStatus(id, status); // Update proof status in Appwrite
      fetchProofs(); // Refetch proofs after updating
    } catch (error) {
      console.error("Error updating proof status:", error);
    }
  };

  useEffect(() => {
    fetchProofs(); // Fetch proofs on component mount
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-200">
      {isSidebarOpen && <Sidebar />}
      <div className={`flex-1 ${isSidebarOpen ? "ml-0" : ""} overflow-auto`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Approval</h1>

          {/* Notification form to add new notifications */}
          <NotificationForm onAddNotification={handleAddNotification} />

          {/* Notification list to display current notifications */}
          <NotificationList onDeleteNotification={handleDeleteNotification} />

          {/* ProofList component */}
          <ProofList
            proofs={proofs} // Pass the correct proofs array
            onUpdateProofStatus={onUpdateProofStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Page);
