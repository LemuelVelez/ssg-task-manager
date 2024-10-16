"use client"; // This ensures the component runs on the client side

import localFont from "next/font/local";
import { motion } from "framer-motion"; // Import motion directly from framer-motion
import "./globals.css";

// Local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Create a client component for animations
const ClientAnimationWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Final state after animation
      exit={{ opacity: 0, y: 50 }} // Animation on exit
      transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth transition duration and easing
    >
      {children}
    </motion.div>
  );
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Use the client animation wrapper for the page content */}
        <ClientAnimationWrapper>{children}</ClientAnimationWrapper>
      </body>
    </html>
  );
}
