import React, { useEffect, useState } from "react";
import { getNotifications, deleteNotification } from "@/lib/utils/appwrite"; // Import the getNotifications and deleteNotification functions from Appwrite
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai"; // Import bell icon for notifications
import { AiOutlineStar } from "react-icons/ai"; // Import star icon for priority
import Swal from "sweetalert2"; // Import SweetAlert2

interface Notification {
  id: string; // Changed type to string because Appwrite uses strings for document IDs
  message: string;
  Priority: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onDeleteNotification: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  onDeleteNotification,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications from the Appwrite database when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await getNotifications();
        setNotifications(fetchedNotifications);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id); // Call the deleteNotification function from Appwrite
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      ); // Remove the notification from the state after successful deletion
      onDeleteNotification(id); // Optionally trigger parent function if needed

      // Show success alert
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Notification has been deleted successfully.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Failed to delete notification:", error);
      setError("Failed to delete notification");
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete notification.",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading notifications...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <AiOutlineBell className="mr-2" />{" "}
        {/* Add bell icon for notifications */}
        Notifications
      </h2>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="flex justify-between items-center p-2 bg-gray-700 rounded-md"
            >
              <div>
                <p className="font-medium flex items-center">
                  <AiOutlineBell className="mr-1" />{" "}
                  {/* Add bell icon for notification message */}
                  {notification.message}
                </p>
                <p className="text-sm text-gray-400 flex items-center">
                  <AiOutlineStar className="mr-1" />{" "}
                  {/* Add star icon for priority */}
                  Priority: {notification.Priority}
                </p>
              </div>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white flex items-center"
                onClick={() => handleDeleteNotification(notification.id)}
              >
                Delete
                <AiOutlineDelete className="ml-1" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No notifications yet.</p>
      )}
    </div>
  );
};

export default NotificationList;
