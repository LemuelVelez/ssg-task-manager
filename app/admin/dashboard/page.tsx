"use client";

import withAuth from "@/hoc/withAuth";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Toggle sidebar visibility

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}

      {/* Main Dashboard Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />{" "}
        {/* Pass the toggle function */}
        <Dashboard />
      </main>
    </div>
  );
};

export default withAuth(AdminDashboard);
