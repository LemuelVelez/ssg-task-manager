import type { Metadata } from "next";

// Metadata for the application
export const metadata: Metadata = {
  title: "SSG Task Management",
  description: "Manage SSG tasks efficiently and track attendance seamlessly.",
};

export default function Head() {
  return (
    <>
      <title>{String(metadata.title) ?? "Default Title"}</title>
      <meta name="description" content={String(metadata.description) ?? "Default description"} />
    </>
  );
}
