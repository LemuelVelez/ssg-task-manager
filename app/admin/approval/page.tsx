"use client";

import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";

// Notification and Proof types
interface Notification {
  id: number;
  message: string;
  priority: string;
}

interface Proof {
  id: number;
  type: "duty" | "task";
  file: File;
  description: string;
  status: "pending" | "approved" | "rejected";
}

// Page component
const Page = () => {
  // State for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // States for notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [newPriority, setNewPriority] = useState("Normal");

  // States for proofs (images/docs)
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [newProofFile, setNewProofFile] = useState<File | null>(null);
  const [newProofType, setNewProofType] = useState("duty");
  const [newProofDescription, setNewProofDescription] = useState("");

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to add a new notification
  const addNotification = () => {
    if (newMessage.trim() === "") return;

    const newNotification: Notification = {
      id: Date.now(),
      message: newMessage,
      priority: newPriority,
    };

    setNotifications([...notifications, newNotification]);
    setNewMessage("");
  };

  // Function to delete a notification
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  // Function to handle file upload for proofs
  const handleProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewProofFile(event.target.files[0]);
    }
  };

  // Function to add a new proof submission
  const addProof = () => {
    if (!newProofFile || newProofDescription.trim() === "") return;

    const newProof: Proof = {
      id: Date.now(),
      type: newProofType as "duty" | "task",
      file: newProofFile,
      description: newProofDescription,
      status: "pending",
    };

    setProofs([...proofs, newProof]);
    setNewProofFile(null);
    setNewProofDescription("");
  };

  // Function to approve or reject a proof
  const updateProofStatus = (id: number, status: "approved" | "rejected") => {
    setProofs(
      proofs.map((proof) =>
        proof.id === id ? { ...proof, status } : proof
      )
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-200">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}

      <div className={`flex-1 ${isSidebarOpen ? "ml-0" : ""} overflow-auto`}>
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Approval</h1>

          {/* Notifications Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-lg font-semibold mb-4">Send Notification</h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                className="p-2 bg-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 flex-1"
                placeholder="Notification message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <select
                className="p-2 bg-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
              >
                <option value="Normal">Normal</option>
                <option value="High">High Priority</option>
                <option value="Urgent">Urgent</option>
              </select>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-gray-200 p-2 rounded-md"
                onClick={addNotification}
              >
                Send Notification
              </button>
            </div>
          </div>

          {/* Display Notifications */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            {notifications.length > 0 ? (
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li key={notification.id} className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
                    <div>
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-gray-400">Priority: {notification.priority}</p>
                    </div>
                    <button
                      className="text-red-400 hover:text-red-500"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No notifications yet.</p>
            )}
          </div>

          {/* Proof Upload Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-lg font-semibold mb-4">Submit Proof</h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="p-2 bg-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={newProofType}
                onChange={(e) => setNewProofType(e.target.value)}
              >
                <option value="duty">Proof of Duty</option>
                <option value="task">Proof of Task Completion</option>
              </select>

              <input
                type="file"
                className="p-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={handleProofUpload}
              />

              <input
                type="text"
                className="p-2 bg-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 flex-1"
                placeholder="Proof description..."
                value={newProofDescription}
                onChange={(e) => setNewProofDescription(e.target.value)}
              />

              <button
                className="bg-blue-600 hover:bg-blue-700 text-gray-200 p-2 rounded-md"
                onClick={addProof}
              >
                Submit Proof
              </button>
            </div>
          </div>

          {/* Display Proofs */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Pending Proof Submissions</h2>
            {proofs.length > 0 ? (
              <ul className="space-y-4">
                {proofs.map((proof) => (
                  <li key={proof.id} className="p-4 bg-gray-700 rounded-md">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div>
                        <p className="font-medium">{proof.description}</p>
                        <p className="text-sm text-gray-400">
                          Type: {proof.type === "duty" ? "Proof of Duty" : "Proof of Task"}
                        </p>
                        <p className="text-sm text-gray-400">Status: {proof.status}</p>
                      </div>

                      {/* Display proof file */}
                      {proof.file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(proof.file)}
                          alt="Proof"
                          className="max-w-xs max-h-48 object-cover rounded-md"
                        />
                      ) : (
                        <a
                          href={URL.createObjectURL(proof.file)}
                          download={proof.file.name}
                          className="text-blue-400 underline"
                        >
                          Download {proof.file.name}
                        </a>
                      )}

                      {/* Approve/Reject buttons */}
                      <div className="flex gap-2">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-gray-200 p-2 rounded-md"
                          onClick={() => updateProofStatus(proof.id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-gray-200 p-2 rounded-md"
                          onClick={() => updateProofStatus(proof.id, "rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No proofs submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
