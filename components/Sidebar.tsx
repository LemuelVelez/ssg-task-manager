import { FaHome, FaListAlt, FaClipboardCheck } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 h-full flex flex-col text-gray-200 w-16 sm:w-1/4 md:w-48 lg:w-64">
      {/* Logo and Header - Header text is hidden on small screens */}
      <div className="flex flex-col items-center p-4">
        <img
          src="/icons/logo.svg"
          alt="Logo"
          className="h-10 w-10 sm:h-16 sm:w-16 rounded-full aspect-square"
        />
        <span className="font-bold text-xl mt-2 hidden sm:block">
          Admin Dashboard
        </span>
      </div>

      {/* Navigation links with icons only on smaller screens */}
      <nav className="flex-grow">
        <ul className="space-y-4 p-4">
          <li>
            <Link
              href="/admin/dashboard"
              className={`flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
                pathname === "/admin/dashboard" ? "bg-gray-700" : ""
              }`}
            >
              <FaHome className="text-blue-400" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/task-management"
              className={`flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
                pathname === "/admin/task-management" ? "bg-gray-700" : ""
              }`}
            >
              <FaListAlt className="text-blue-400" />
              <span className="hidden sm:inline">Task Management</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/approval"
              className={`flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer ${
                pathname === "/admin/approval" ? "bg-gray-700" : ""
              }`}
            >
              <FaClipboardCheck className="text-blue-400" />
              <span className="hidden sm:inline">Approval</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer - hidden on small screens */}
      <footer className="p-4 text-center text-sm hidden sm:block">
        © 2024 SSG Task Management JESUS BE THE GLORY!
      </footer>
    </aside>
  );
};

export default Sidebar;
