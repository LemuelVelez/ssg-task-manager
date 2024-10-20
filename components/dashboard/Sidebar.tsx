"use client"; // Ensure that this component runs only on the client side

import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  Home,
  CheckCircle,
  AssignmentTurnedIn,
  ExitToApp,
} from "@mui/icons-material"; // MUI icons for sidebar
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const Sidebar = () => {
  const router = useRouter(); // Using the correct useRouter from next/navigation
  const [isMounted, setIsMounted] = useState(false); // To track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Set the component as mounted
  }, []);

  // Handle navigation to different dashboard sections
  const handleNavigation = (path: string) => {
    if (isMounted) {
      router.push(path); // Only navigate if the component is mounted
    }
  };

  return (
    <div className="h-full">
      <List>
        {/* Home link */}
        <ListItem
          component="div"
          onClick={() => handleNavigation("/admin/dashboard")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <Home className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Proof of Duty link */}
        <ListItem
          component="div"
          onClick={() => handleNavigation("/admin/proof-duty")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <CheckCircle className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Proof of Duty" />
        </ListItem>

        {/* Task Submissions link */}
        <ListItem
          component="div"
          onClick={() => handleNavigation("/admin/task-submissions")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <AssignmentTurnedIn className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Task Submissions" />
        </ListItem>

        {/* Logout link */}
        <ListItem
          component="div"
          onClick={() => handleNavigation("/admin/logout")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <ExitToApp className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
