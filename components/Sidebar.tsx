import { useState } from "react";
import { FaHome, FaListAlt, FaClipboardCheck, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Control sidebar visibility
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 text-gray-200 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 w-64 md:w-64 lg:w-64 flex flex-col`}
    >
      {/* Close Button for Mobile */}
      <div className="absolute top-4 right-4 md:hidden">
        <button onClick={toggleSidebar} className="text-gray-200 text-2xl">
          <FaTimes />
        </button>
      </div>

      {/* Logo and Header */}
      <div className="flex flex-col items-center p-4">
        <Image
          src="/icons/logo.svg"
          height={100}
          width={100}
          alt="Logo"
          className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-full aspect-square"
        />
        <span className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl mt-2">
          Admin Dashboard
        </span>
      </div>

      {/* Navigation links */}
      <nav className="flex-grow">
        <ul className="space-y-4 p-4">
          <li>
            <Link
              href="/admin/dashboard"
              className={`flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
                pathname === "/admin/dashboard" ? "bg-gray-700" : ""
              }`}
              onClick={toggleSidebar} // Close sidebar on link click
            >
              <FaHome className="text-blue-400 text-lg sm:text-xl md:text-2xl" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/task-management"
              className={`flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
                pathname === "/admin/task-management" ? "bg-gray-700" : ""
              }`}
              onClick={toggleSidebar} // Close sidebar on link click
            >
              <FaListAlt className="text-blue-400 text-lg sm:text-xl md:text-2xl" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                Task Management
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/approval"
              className={`flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
                pathname === "/admin/approval" ? "bg-gray-700" : ""
              }`}
              onClick={toggleSidebar} // Close sidebar on link click
            >
              <FaClipboardCheck className="text-blue-400 text-lg sm:text-xl md:text-2xl" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                Approval & Notification
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <footer className="p-4 text-center text-xs sm:text-sm md:text-base">
        © 2024 SSG Task Management
        <div> JESUS BE THE GLORY!</div>
      </footer>
    </aside>
  );
};

export default Sidebar;
