"use client";

import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import NotificationForm from "./NotificationForm";
import NotificationList from "./NotificationList";
import ProofForm from "./ProofForm";
import ProofList from "./ProofList";

// Define the types for proofs
interface Proof {
  id: number;
  type: "duty" | "task";
  file: File;
  description: string;
  status: "pending" | "approved" | "rejected";
}

// Define the types for notifications
interface Notification {
  id: string; // Unique identifier for the notification
  message: string; // The notification message
  Priority: string; // Notification Priority
}

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]); // State for notifications

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const addProof = (file: File, type: "duty" | "task", description: string) => {
    const newProof: Proof = {
      id: Date.now(),
      type,
      file,
      description,
      status: "pending",
    };
    setProofs((prevProofs) => [...prevProofs, newProof]);
  };

  const updateProofStatus = (id: number, status: "approved" | "rejected") => {
    setProofs((prevProofs) =>
      prevProofs.map((proof) =>
        proof.id === id ? { ...proof, status } : proof
      )
    );
  };

  // Handle adding a new notification
  const handleAddNotification = (message: string, Priority: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(), // Unique ID generation, ensure it's unique across notifications
      message,
      Priority,
    };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
  };

  // Handle notification deletion
  const handleDeleteNotification = (id: string) => {
    console.log("Delete notification with id:", id);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    ); // Remove from state
  };

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

          {/* Proof form and list components */}
          <ProofForm onAddProof={addProof} />
          <ProofList proofs={proofs} onUpdateProofStatus={updateProofStatus} />
        </div>
      </div>
    </div>
  );
};

export default Page;
