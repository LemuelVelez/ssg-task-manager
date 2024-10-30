import Link from "next/link";
import {
  FaHome,
  FaClipboardCheck,
  FaTasks,
  FaBars,
  FaTimes,
} from "react-icons/fa"; // Import icons
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import { useState } from "react"; // Import useState for state management

const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu open/close

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu state
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 text-gray-200">
      <div className="flex items-center p-2 md:p-4">
        <span className="lg:text-3xl sm:text-xs font-bold">
          SSG Task Management
        </span>
      </div>
      <div className="flex items-center">
        {/* Mobile Menu Icon */}
        <button onClick={toggleMenu} className="md:hidden p-2">
          {isMenuOpen ? (
            <FaTimes className="text-2xl" /> // Show close icon when menu is open
          ) : (
            <FaBars className="text-2xl" /> // Show menu icon when menu is closed
          )}
        </button>
      </div>

      {/* Mobile Menu Container */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-48 bg-gray-800 rounded-lg shadow-lg md:hidden z-50">
          {" "}
          {/* Increased z-index */}
          <ul className="flex flex-col p-2 space-y-2">
            <Link href="/">
              <li
                className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
                  pathname === "/" ? "bg-gray-700" : ""
                }`}
              >
                <FaHome className="text-2xl" /> {/* Home icon */}
                <span>Home</span>
              </li>
            </Link>
            <Link href="/proof">
              <li
                className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
                  pathname === "/proof" ? "bg-gray-700" : ""
                }`}
              >
                <FaClipboardCheck className="text-2xl" />{" "}
                {/* Proof of Duty Submission icon */}
                <span>Proof</span>
              </li>
            </Link>
            <Link href="/task">
              <li
                className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
                  pathname === "/task" ? "bg-gray-700" : ""
                }`}
              >
                <FaTasks className="text-2xl" />{" "}
                {/* Task Submission Proof icon */}
                <span>Task</span>
              </li>
            </Link>
          </ul>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Navigation Links */}
        <Link href="/">
          <li
            className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
              pathname === "/" ? "bg-gray-700" : ""
            }`}
          >
            <FaHome className="text-2xl" /> {/* Home icon */}
            <span className="hidden md:inline">Home</span>
          </li>
        </Link>
        <Link href="/proof">
          <li
            className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
              pathname === "/proof" ? "bg-gray-700" : ""
            }`}
          >
            <FaClipboardCheck className="text-2xl" />{" "}
            {/* Proof of Duty Submission icon */}
            <span className="hidden md:inline">Proof</span>
          </li>
        </Link>
        <Link href="/task">
          <li
            className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
              pathname === "/task" ? "bg-gray-700" : ""
            }`}
          >
            <FaTasks className="text-2xl" /> {/* Task Submission Proof icon */}
            <span className="hidden md:inline">Task</span>
          </li>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
