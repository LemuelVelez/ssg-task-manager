import "./globals.css"; // Import global styles
import { ReactNode } from "react";
import NavBar from "./components/NavBar"; // Import NavBar

export const metadata = {
  title: "SSG Task Manager",
  description: "Manage tasks and members of the SSG.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-200">
        {/* Navigation Section */}
        <NavBar />

        {/* Header Section */}
        <header className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center rounded-b-lg shadow-lg">
          <h1 className="text-36-bold">SSG Task Management Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-6">{children}</main>

        {/* Footer Section */}
        <footer className="p-4 bg-gray-800 text-white text-center">
          <p>SSG Task Manager © 2024</p>
        </footer>
      </body>
    </html>
  );
}
