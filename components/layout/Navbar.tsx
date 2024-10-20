import React from "react";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <h1 className="text-xl font-semibold">SSG Admin Dashboard</h1>
      <button className="lg:hidden">
        <FiMenu className="text-2xl" />
      </button>
    </header>
  );
};

export default Navbar;
