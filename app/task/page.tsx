"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Navbar from "@/components/home/Navbar";
import { FaBell } from "react-icons/fa";
import TaskContent from "./TaskContent";
import { getNotifications } from "@/lib/utils/appwrite";
import { Badge } from "@/components/ui/badge"; // Adjust the path as needed

const Page = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [highlightNotification, setHighlightNotification] = useState(false);
  const [notifications, setNotifications] = useState({
    Normal: [] as string[],
    High: [] as string[],
    Urgent: [] as string[],
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const allNotifications = await getNotifications();

        const categorizedNotifications = {
          Normal: allNotifications
            .filter((notif) => notif.Priority === "Normal")
            .map((notif) => notif.message),
          High: allNotifications
            .filter((notif) => notif.Priority === "High")
            .map((notif) => notif.message),
          Urgent: allNotifications
            .filter((notif) => notif.Priority === "Urgent")
            .map((notif) => notif.message),
        };

        setNotifications(categorizedNotifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = () => {
    setNotificationsOpen(!notificationsOpen);
    setHighlightNotification(!notificationsOpen);
  };

  const totalNotifications = Object.values(notifications).flat().length;

  // Map priorities to Badge variants
  const mapPriorityToVariant = (priority: string) => {
    switch (priority) {
      case "Normal":
        return "Normal";
      case "High":
        return "High";
      case "Urgent":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <Navbar />
      <div className="p-4 relative">
        <h1 className="text-2xl font-bold">Tasks Assigned to You</h1>
        <p className="text-base">
          Here you can view and manage all your assigned tasks.
        </p>

        <div className="absolute top-4 right-4">
          <div className="relative">
            <FaBell
              className={`text-blue-400 cursor-pointer text-4xl sm:text-5xl lg:text-6xl ${
                highlightNotification ? "text-red-500" : ""
              }`}
              onClick={handleNotificationClick}
            />

            {totalNotifications > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 px-1 py-0.5 bg-red-500 text-xs font-bold text-white rounded-full">
                {totalNotifications}
              </span>
            )}

            {notificationsOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 shadow-lg rounded-lg z-10"
                initial={{ opacity: 0, y: -20 }} // Initial state for animation
                animate={{ opacity: 1, y: 0 }} // Final state for animation
                exit={{ opacity: 0, y: -20 }} // Exit state for animation
                transition={{ duration: 0.2 }} // Animation duration
              >
                <div className="p-2">
                  <h2 className="font-bold text-gray-200">Notifications</h2>
                  <hr className="my-2 border-gray-600" />

                  {Object.entries(notifications).map(([priority, items]) => (
                    <div key={priority} className="mb-2">
                      <h3 className="text-sm font-semibold text-gray-300 flex justify-between items-center">
                        {priority} Priority
                        {items.length > 0 && (
                          <Badge
                            variant={mapPriorityToVariant(priority)}
                            className="text-gray-500 text-sm py-1"
                          >
                            {items.length}{" "}
                            {/* Show the count of notifications */}
                          </Badge>
                        )}
                      </h3>
                      {items.map((item, index) => (
                        <div key={index} className="text-gray-400 text-xs py-1">
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}

                  {totalNotifications === 0 && (
                    <div className="text-gray-400 text-xs">
                      No notifications available
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <TaskContent />
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
