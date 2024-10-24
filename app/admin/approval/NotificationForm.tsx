import React, { useState } from "react";
import { createNotification } from "@/lib/utils/appwrite"; // Import the createNotification function
import Swal from "sweetalert2"; // Import SweetAlert2
import { AiOutlineMessage, AiOutlineStar, AiOutlineSend } from "react-icons/ai"; // Import icons
import { Button } from "@/components/ui/button";

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
    if (newMessage.trim() === "") return;

    try {
      // Create the notification using Appwrite
      const response = await createNotification({
        id: newId,
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
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to send notification.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
      <h2 className="text-lg font-semibold mb-4">Send Notification</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <AiOutlineMessage className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            className="p-2 bg-gray-700 rounded-md pl-10 w-full resize-none" // Set width to full and prevent resizing
            placeholder="Notification message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <div className="relative">
          <AiOutlineStar className="absolute left-3 top-3 text-gray-400" />
          <select
            className="p-2 bg-gray-700 rounded-md pl-10"
            value={newPriority}
            onChange={(e) =>
              setNewPriority(e.target.value as "Normal" | "High" | "Urgent")
            }
          >
            <option value="Normal">Normal</option>
            <option value="High">High Priority</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md flex items-center"
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
