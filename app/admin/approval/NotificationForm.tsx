"use client";

import React, { useState } from "react";
import { createNotification } from "@/lib/utils/appwrite"; // Import the createNotification function
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Import your custom Select components
import { AiOutlineMessage, AiOutlineStar, AiOutlineSend } from "react-icons/ai"; // Import icons
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea component

interface NotificationFormProps {
  onAddNotification: (message: string, priority: string) => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({
  onAddNotification,
}) => {
  const [newId, setNewId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newPriority, setNewPriority] = useState<"Normal" | "High" | "Urgent">(
    "Normal"
  );

  const handleSubmit = async () => {
    // Basic validation
    if (!newMessage.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Notification message is required.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!newPriority) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please select a notification priority.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      // Create the notification using Appwrite
      const response = await createNotification({
        message: newMessage,
        Priority: newPriority, // Ensure this is correct (case-sensitive)
      });

      // Call the onAddNotification callback if needed
      onAddNotification(response.message, newPriority); // Modify as necessary based on response

      // Show success alert
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Notification sent successfully.",
        confirmButtonText: "OK",
      });

      // Clear the input fields
      setNewId("");
      setNewMessage("");
      setNewPriority("Normal");
    } catch (error) {
      console.error("Failed to create notification:", error);
      // Show error alert with specific error message if available
      const errorMessage =
        (error instanceof Error && error.message) ||
        "Failed to send notification.";

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg mb-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
        Send Notification
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <AiOutlineMessage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
          <Textarea
            className="pl-10" // Add left padding for icon
            placeholder="Notification message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required // Make field required
          />
        </div>
        <div className="relative flex-1">
          <Select
            value={newPriority}
            onValueChange={(value) =>
              setNewPriority(value as "Normal" | "High" | "Urgent")
            }
            required // Make field required
          >
            <SelectTrigger className="bg-gray-700 rounded-md pl-10 flex items-center">
              <AiOutlineStar className="absolute left-3 text-gray-400" />
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="bg-gradient-to-r from-gray-400 to-gray-800">
              {["Normal", "High", "Urgent"].map((priority) => (
                <SelectItem
                  key={priority}
                  value={priority}
                  className="relative flex items-center"
                >
                  {priority === "Normal" && "Normal"}
                  {priority === "High" && "High Priority"}
                  {priority === "Urgent" && "Urgent"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md flex items-center w-full sm:w-auto"
          onClick={handleSubmit}
        >
          <AiOutlineSend className="mr-1" /> {/* Add send icon */}
          Send Notification
        </Button>
      </div>
    </div>
  );
};

export default NotificationForm;
