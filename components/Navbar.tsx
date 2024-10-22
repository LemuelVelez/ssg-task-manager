import { FaBell, FaBars, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
import Button from "./ui/button";

interface NavbarProps {
  toggleSidebar: () => void; // Function type that returns void
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [highlightNotification, setHighlightNotification] = useState(false); // State for highlighting notification icon
  const [notifications] = useState([
    "Overdue task: Task 1",
    "Upcoming deadline: Task 2",
    "Pending approvals: Task 3",
  ]); // Example notifications

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

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 text-gray-200">
      <div className="flex items-center">
        <FaBars
          className="text-blue-400 cursor-pointer"
          size={24}
          onClick={toggleSidebar} // Toggle the sidebar when clicked
        />
        <span className="ml-4 text-xl font-bold">SSG Task Management</span>
      </div>
      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <FaBell
            className={`text-blue-400 cursor-pointer ${
              highlightNotification ? "text-red-500" : ""
            }`} // Change color when highlighted
            size={24}
            onClick={handleNotificationClick} // Handle notifications click
          />
          {notifications.length > 0 && ( // Show a dot if there are notifications
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </div>
        <FaUserCircle
          className={`text-blue-400 cursor-pointer ${
            userMenuOpen ? "text-red-500" : ""
          }`} // Change color when user menu is open
          size={32}
          onClick={handleUserClick} // Handle user menu click
        />

        {notificationsOpen && (
          <div
            className="absolute right-16 top-16 bg-gray-700 bg-opacity-60 p-4 rounded-md"
            onMouseLeave={() => setHighlightNotification(false)} // Reset highlight when mouse leaves
          >
            <h3 className="text-gray-200 font-semibold mb-2">Notifications</h3>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="text-gray-200">
                  - {notification}
                </li>
              ))}
            </ul>
          </div>
        )}

        {userMenuOpen && (
          <div className="absolute right-0 top-16 bg-gray-700 bg-opacity-60 p-4 rounded-md">
            <Button className="mx-auto">
              <Link href="/" className="flex items-center justify-center">
                <HiOutlineLogout className="mr-2" size={24} />
                Logout
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
