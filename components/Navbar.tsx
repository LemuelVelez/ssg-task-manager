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

  const handleNotificationClick = () => {
    setNotificationsOpen(!notificationsOpen); // Toggle notifications
    setUserMenuOpen(false); // Ensure the user menu is closed
  };

  const handleUserClick = () => {
    setUserMenuOpen(!userMenuOpen); // Toggle user menu
    setNotificationsOpen(false); // Ensure notifications are closed
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
        <FaBell
          className="text-blue-400 cursor-pointer"
          size={24}
          onClick={handleNotificationClick} // Handle notifications click
        />
        <FaUserCircle
          className="text-blue-400 cursor-pointer"
          size={32}
          onClick={handleUserClick} // Handle user menu click
        />

        {notificationsOpen && (
          <div className="absolute right-16 top-16 bg-gray-700 bg-opacity-60 p-4 rounded-md">
            <h3 className="text-gray-200 font-semibold mb-2">Notifications</h3>
            <ul>
              <li className="text-gray-200">- Overdue task: Task 1</li>
              <li className="text-gray-200">- Upcoming deadline: Task 2</li>
              <li className="text-gray-200">- Pending approvals: Task 3</li>
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
