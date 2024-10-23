import { FaHome, FaListAlt, FaClipboardCheck } from "react-icons/fa";
import Link from "next/link"; // Import Link from Next.js
import { usePathname } from "next/navigation"; // Import usePathname to access the current path

const Sidebar = () => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <aside className="w-64 bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 h-full flex flex-col text-gray-200">
      <div className="flex flex-col items-center p-4">
        <img
          src="/icons/logo.svg" // Path to the logo in the public folder
          alt="Logo"
          className="h-16 w-16 rounded-full" // Set height and width for circular shape
        />
        <span className="font-bold text-xl mt-2">Admin Dashboard</span>{" "}
        {/* Margin-top for spacing */}
      </div>
      <nav className="flex-grow">
        <ul className="space-y-4 p-4">
          <li
            className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
              pathname === "/admin/dashboard" ? "bg-gray-700" : ""
            }`} // Highlight if active
          >
            <FaHome className="text-blue-400" />
            <Link href="/admin/dashboard">
              <span>Dashboard</span>
            </Link>
          </li>
          <li
            className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
              pathname === "/admin/task-management" ? "bg-gray-700" : ""
            }`} // Highlight if active
          >
            <FaListAlt className="text-blue-400" />
            <Link href="/admin/task-management">
              <span>Task Management</span>
            </Link>
          </li>
          <li
            className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
              pathname === "/admin/approval" ? "bg-gray-700" : ""
            }`} // Highlight if active
          >
            <FaClipboardCheck className="text-blue-400" />
            <Link href="/admin/approval">
              <span>Approval</span>
            </Link>
          </li>
        </ul>
      </nav>
      <footer className="p-4 text-center text-sm">
        © 2024 SSG Task Management JESUS BE THE GLORY!
      </footer>
    </aside>
  );
};

export default Sidebar;
