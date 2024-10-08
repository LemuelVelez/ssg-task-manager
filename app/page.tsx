import TaskList from "@/app/components/TaskList"; // Ensure this path is correct
import Image from "next/image";
import Link from "next/link";

// Define the SearchParamProps type
interface SearchParamProps {
  searchParams: {
    admin: string;
  };
}

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="SSG Task Management"
            className="mb-12 h-10 w-fit"
          />

          {/* Adding the TaskList component */}
          {isAdmin && (
            <div className="mt-8">
              <h2 className="text-xl font-bold">Task Management</h2>
              <TaskList /> {/* Render the TaskList only for admin */}
            </div>
          )}

          <Link href="/?admin=true" className="text-green-500">
            Admin
          </Link>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="onboarding"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
