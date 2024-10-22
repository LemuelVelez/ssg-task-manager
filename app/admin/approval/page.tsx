"use client";

import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";

const Page = () => {
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
        <div className="p-4">
          {" "}
          {/* Optional padding for content area */}
          <h1 className="text-xl font-bold">Approval</h1>
          {/* Add your main content here */}
          <div>page</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
