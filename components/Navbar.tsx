import { FaBars, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { Button } from "./ui/button";
import { logout } from "@/lib/utils/appwrite"; // Adjust the import path as necessary
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NavbarProps {
  toggleSidebar: () => void; // Function type that returns void
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false); // State for user menu

  const handleUserClick = () => {
    setUserMenuOpen(!userMenuOpen); // Toggle user menu
  };

  const handleLogout = async () => {
    try {
      // Show a toast notification with 3-second delay before redirecting
      toast.info("Logging out...", {
        position: "top-right",
        autoClose: 3000, // 3 seconds delay
      });

      // Wait for the delay before performing logout
      setTimeout(async () => {
        await logout(); // Call the logout function
        window.location.href = "/"; // Redirect to home after logout
      }, 3000);
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

      {/* User icon on the right */}
      <div className="relative flex items-center ml-auto">
        <FaUserCircle
          className={`text-blue-400 cursor-pointer text-lg sm:text-2xl ${
            userMenuOpen ? "text-red-500" : ""
          }`} // Change color when user menu is open
          onClick={handleUserClick} // Handle user menu click
        />
        {userMenuOpen && (
          <div className="absolute right-0 top-16 bg-gray-700 bg-opacity-70 p-4 rounded-md shadow-lg z-10 w-64 sm:w-72">
            <Button
              variant="gradient"
              className="w-full"
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

      {/* Toast container for notifications */}
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
