// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "SSG Task Manager",
  description: "Manage tasks and members of the SSG.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <header className="p-4 bg-blue-600 text-white text-center">
          <h1 className="text-2xl font-bold">SSG Task Management Dashboard</h1>
        </header>
        <main className="flex-grow p-6">{children}</main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          <p className="text-sm">
            &copy; 2024 SSG Task Manager. All rights reserved.
          </p>
          <p className="text-xs">
            Empowering student governance through effective task management.
          </p>
        </footer>
      </body>
    </html>
  );
}
