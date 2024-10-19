import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      {/* Sidebar Header */}
      <h2 className="text-2xl font-bold text-center">Admin Menu</h2>

      {/* Sidebar Links */}
      <nav>
        <ul>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#">Task Overview</a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#">Pending Duty Proofs</a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#">Pending Task Submissions</a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#">Overdue Notifications</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
