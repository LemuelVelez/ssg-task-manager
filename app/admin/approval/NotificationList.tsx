import React, { useEffect, useState } from "react";
import { getNotifications, deleteNotification } from "@/lib/utils/appwrite"; // Import the getNotifications and deleteNotification functions from Appwrite
import { Button } from "@/components/ui/button";
import { AiOutlineDelete, AiOutlineBell } from "react-icons/ai"; // Import icons
import Swal from "sweetalert2"; // Import SweetAlert2
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import Card components
import { Badge, statusDisplayMap } from "@/components/ui/badge"; // Import Badge and statusDisplayMap

interface Notification {
  id: string; // Changed type to string because Appwrite uses strings for document IDs
  message: string;
  Priority: "Normal" | "High" | "Urgent"; // Specify the type for priority
}

interface NotificationListProps {
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
      } catch (error) {
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
    <Card className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="flex text-white items-center">
          <AiOutlineBell className="mr-2" />
          {/* Add bell icon for notifications */}
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className="p-4 bg-gray-700 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-4 max-w-full sm:max-w-md lg:max-w-lg">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <AiOutlineBell className="flex-shrink-0 text-xl sm:text-2xl text-blue-500" />
                      {/* Bell icon for notification message */}
                      <p className="font-medium text-gray-300 leading-relaxed whitespace-pre-line break-words text-sm sm:text-base lg:text-lg">
                        {notification.message}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-2 text-gray-400 flex items-center text-xs sm:text-sm lg:text-base">
                      <Badge variant={notification.Priority}>
                        {statusDisplayMap[notification.Priority]}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white flex items-center p-2 rounded-md"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <AiOutlineDelete className="ml-0" />
                  </Button>
                </div>
              </Card>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No notifications yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationList;
