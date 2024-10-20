"use client";
import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Import burger icon from React Icons
import { Badge, IconButton } from "@mui/material"; // MUI components for notifications
import { Notifications as NotificationsIcon } from "@mui/icons-material"; // Notification icon from MUI
import withAuth from "@/hoc/withAuth"; // Higher-order component for authentication
import DashboardContent from "@/components/dashboard/DashboardContent"; // Dashboard content component
import Sidebar from "@/components/dashboard/Sidebar"; // Sidebar component
import { motion } from "framer-motion"; // Framer Motion for animations

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State for toggling the sidebar

  // Toggle the sidebar and navbar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.div
        initial={{ width: sidebarOpen ? 250 : 0 }}
        animate={{ width: sidebarOpen ? 250 : 0 }}
        className={`bg-gray-800 text-white transition-all duration-300 ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <Sidebar />
      </motion.div>

      {/* Main content area */}
      <div className="flex-1">
        {/* Navbar */}
        <div className="bg-gray-900 text-white flex items-center justify-between p-4 sticky top-0 z-10">
          {/* Burger icon to toggle the sidebar */}
          <IconButton onClick={toggleSidebar} className="text-white">
            <FaBars />
          </IconButton>

          {/* Notification icon */}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              {" "}
              {/* Example notification count */}
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>

        {/* Dashboard content */}
        <div className="p-4">
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard); // Wrap with HOC for authentication
