import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white font-bold text-xl">SSG Task Manager</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-gray-200 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tasks" className="text-gray-200 hover:text-white">
              Tasks
            </Link>
          </li>
          <li>
            <Link href="/members" className="text-gray-200 hover:text-white">
              Members
            </Link>
          </li>
          <li>
            <Link href="/reports" className="text-gray-200 hover:text-white">
              Reports
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
