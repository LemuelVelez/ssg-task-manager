import Link from "next/link";
import { FaHome, FaClipboardCheck, FaTasks } from "react-icons/fa"; // Import icons
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation

const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 text-gray-200">
      <div className="flex items-center">
      <span className="ml-4 text-lg sm:text-xl font-bold">SSG Task Management</span>
      </div>
      <div className="flex items-center space-x-4">
        {/* Navigation Links */}
        <Link href="/">
          <li
            className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
              pathname === "/" ? "bg-gray-700" : ""
            }`}
          >
            <FaHome /> {/* Home icon */}
            <span className="hidden md:inline">Home</span>{" "}
            {/* Hide text on small screens */}
          </li>
        </Link>
        <Link href="/proof">
          <li
            className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
              pathname === "/proof" ? "bg-gray-700" : ""
            }`}
          >
            <FaClipboardCheck /> {/* Proof of Duty Submission icon */}
            <span className="hidden md:inline">Proof</span>{" "}
            {/* Hide text on small screens */}
          </li>
        </Link>
        <Link href="/task">
          <li
            className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
              pathname === "/task" ? "bg-gray-700" : ""
            }`}
          >
            <FaTasks /> {/* Task Submission Proof icon */}
            <span className="hidden md:inline">Task</span>{" "}
            {/* Hide text on small screens */}
          </li>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
