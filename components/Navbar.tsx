import { FaBell, FaBars, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { Button } from "./ui/button";
import { logout } from "@/lib/utils/appwrite"; // Adjust the import path as necessary

interface NavbarProps {
  toggleSidebar: () => void; // Function type that returns void
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [highlightNotification, setHighlightNotification] = useState(false); // State for highlighting notification icon

  // Example notifications categorized into different types
  const [notifications] = useState({
    overdue: ["Task 1: Submit report", "Task 4: Complete documentation"],
    upcoming: ["Task 2: Project proposal - Due Nov 15"],
    pending: ["Task 3: Approval needed for budget request"],
  });

  const handleNotificationClick = () => {
    setNotificationsOpen(!notificationsOpen); // Toggle notifications
    setUserMenuOpen(false); // Ensure the user menu is closed

    // Toggle highlight only if opening notifications, reset if closing
    if (!notificationsOpen) {
      setHighlightNotification(true); // Highlight when opening
    } else {
      setHighlightNotification(false); // Reset when closing
    }
  };

  const handleUserClick = () => {
    setUserMenuOpen(!userMenuOpen); // Toggle user menu
    setNotificationsOpen(false); // Ensure notifications are closed
    setHighlightNotification(false); // Reset highlight when user menu is opened
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      window.location.href = "/"; // Redirect to home after logout (adjust as necessary)
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 text-gray-200">
      <div className="flex items-center">
        <FaBars
          className="text-blue-400 cursor-pointer text-lg sm:text-2xl"
          onClick={toggleSidebar} // Toggle the sidebar when clicked
        />
        <span className="ml-4 text-lg sm:text-xl font-bold">
          SSG Task Management
        </span>
      </div>
      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <FaBell
            className={`text-blue-400 cursor-pointer text-lg sm:text-2xl ${
              highlightNotification ? "text-red-500" : ""
            }`} // Change color when highlighted
            onClick={handleNotificationClick} // Handle notifications click
          />
          {Object.values(notifications).flat().length > 0 && ( // Show a dot if there are notifications
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </div>
        <FaUserCircle
          className={`text-blue-400 cursor-pointer text-lg sm:text-2xl ${
            userMenuOpen ? "text-red-500" : ""
          }`} // Change color when user menu is open
          onClick={handleUserClick} // Handle user menu click
        />

        {notificationsOpen && (
          <div
            className="absolute right-0 top-16 bg-gray-700 bg-opacity-80 p-4 rounded-md z-10 w-64 sm:w-72"
            onMouseLeave={() => setHighlightNotification(false)} // Reset highlight when mouse leaves
          >
            <h3 className="text-gray-200 font-semibold mb-2">Notifications</h3>
            <div className="space-y-2">
              {notifications.overdue.length > 0 && (
                <div className="bg-red-500 bg-opacity-20 p-2 rounded-md">
                  <h4 className="text-red-500 font-bold">Overdue Tasks</h4>
                  <ul className="list-disc pl-4 text-gray-200 font-semibold">
                    {notifications.overdue.map((notification, index) => (
                      <li key={index}>{notification}</li>
                    ))}
                  </ul>
                </div>
              )}

              {notifications.upcoming.length > 0 && (
                <div className="bg-blue-500 bg-opacity-20 p-2 rounded-md">
                  <h4 className="text-blue-500 font-bold">
                    Upcoming Deadlines
                  </h4>
                  <ul className="list-disc pl-4 text-gray-200 font-semibold">
                    {notifications.upcoming.map((notification, index) => (
                      <li key={index}>{notification}</li>
                    ))}
                  </ul>
                </div>
              )}

              {notifications.pending.length > 0 && (
                <div className="bg-yellow-500 bg-opacity-20 p-2 rounded-md">
                  <h4 className="text-yellow-500 font-bold">
                    Pending Approvals
                  </h4>
                  <ul className="list-disc pl-4 text-gray-200 font-semibold">
                    {notifications.pending.map((notification, index) => (
                      <li key={index}>{notification}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {userMenuOpen && (
          <div className="absolute right-0 top-16 bg-gray-700 bg-opacity-60 p-4 rounded-md z-10 w-64 sm:w-72">
            <Button
              variant="gradient"
              className="mx-auto"
              onClick={handleLogout}
            >
              <div className="flex items-center justify-center">
                <HiOutlineLogout className="mr-2" size={24} />
                Logout
              </div>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
