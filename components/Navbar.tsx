import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline"; // Updated import for Heroicons v2

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <nav className="bg-gradient-to-r from-gray-600 to-blue-500 text-white px-6 py-4 shadow-md">
      {/* Gray to blue gradient background */}
      <div className="flex justify-between items-center">
        {/* Left: Toggle Sidebar Button with Burger Icon */}
        <button onClick={toggleSidebar} className="focus:outline-none">
          <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </button>

        {/* Middle: Title */}
        <h1 className="text-2xl font-semibold">SSG Task Manager</h1>

        {/* Right: Logout Button */}
        <div className="flex items-center space-x-4">
          <button className="bg-gradient-to-r from-gray-400 to-blue-600 hover:from-gray-500 hover:to-blue-700 px-4 py-2 rounded-md transition duration-300">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
