import React from "react";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Left: Toggle Sidebar Button */}
        <button onClick={toggleSidebar} className="text-xl focus:outline-none">
          {/* You can replace this with an icon, such as a hamburger menu */}
          &#9776;
        </button>

        {/* Middle: Title */}
        <h1 className="text-2xl font-semibold">SSG Task Manager</h1>

        {/* Right: Logout Button */}
        <div className="flex items-center space-x-4">
          <button className="bg-blue-800 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
