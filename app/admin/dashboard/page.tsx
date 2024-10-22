"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";

const Dashboard = () => {
  // State to control sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Render Sidebar conditionally based on state */}
      {isSidebarOpen && <Sidebar />}

      <div className={`flex-1 ${isSidebarOpen ? "ml-0" : ""} overflow-auto`}>
        {/* Pass toggleSidebar to Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-200 mb-4">
            Task Overview
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Task Cards Placeholder */}
            <div className="bg-gray-700 bg-opacity-60 p-4 rounded-md">
              <h2 className="text-xl text-gray-200">Task 1</h2>
              <p className="text-gray-400">Pending - Deadline: Oct 30</p>
            </div>
            <div className="bg-gray-700 bg-opacity-60 p-4 rounded-md">
              <h2 className="text-xl text-gray-200">Task 2</h2>
              <p className="text-gray-400">In Progress - Deadline: Nov 15</p>
            </div>
            <div className="bg-gray-700 bg-opacity-60 p-4 rounded-md">
              <h2 className="text-xl text-gray-200">Task 3</h2>
              <p className="text-gray-400">Overdue - Deadline: Oct 10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
