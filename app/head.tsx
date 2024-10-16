// app/head.tsx
import type { Metadata } from "next";

// Metadata for the application
export const metadata: Metadata = {
  title: "SSG Task Management",
  description: "Manage SSG tasks efficiently and track attendance seamlessly.",
};

export default function Head() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </>
  );
}
