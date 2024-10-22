import { FaHome, FaListAlt, FaClipboardCheck } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 h-full flex flex-col text-gray-200">
      <div className="p-4 font-bold text-xl">Admin Dashboard</div>
      <nav className="flex-grow">
        <ul className="space-y-4 p-4">
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
            <FaHome className="text-blue-400" />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
            <FaListAlt className="text-blue-400" />
            <span>Task Management</span>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
            <FaClipboardCheck className="text-blue-400" />
            <span>Approval</span>
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
