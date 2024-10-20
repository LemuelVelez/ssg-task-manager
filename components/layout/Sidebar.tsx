import React from "react";
import { FiHome, FiCheckSquare, FiUserCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar = () => {
  return (
    <motion.aside
      className="w-64 bg-blue-900 text-white h-screen p-4"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav>
        <ul>
          <li className="mb-6">
            <FiHome className="inline-block mr-2" /> Dashboard
          </li>
          <li className="mb-6">
            <FiCheckSquare className="inline-block mr-2" /> Tasks
          </li>
          <li>
            <FiUserCheck className="inline-block mr-2" /> Approvals
          </li>
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
