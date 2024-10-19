"use client"; // Ensure this is a client-side component

import { useRouter } from "next/navigation"; // Use next/navigation for client-side routing
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/lib/utils/appwrite"; // Import the function that gets the current logged-in user

// Higher-Order Component (HOC) for route protection
const withAuth = (WrappedComponent: React.ComponentType) => {
  return function ProtectedComponent(props: any) {
    const [loading, setLoading] = useState(true); // Loading state to prevent rendering before auth check
    const [authenticated, setAuthenticated] = useState(false); // State to track if the user is authenticated
    const router = useRouter(); // useRouter from next/navigation

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const user = await getLoggedInUser(); // Fetch the currently logged-in user

          if (user) {
            setAuthenticated(true); // If the user is authenticated, allow access
          } else {
            router.replace("/admin/login"); // Redirect to login if not authenticated
          }
        } catch (error) {
          console.error("Authentication check failed:", error);
          router.replace("/admin/login"); // Redirect to login on error or if the user is not authenticated
        } finally {
          setLoading(false); // Set loading to false after the check is done
        }
      };

      checkAuth();
    }, [router]); // Ensure router is available

    if (loading) {
      return <p>Loading...</p>; // Show a loading state until the authentication check is complete
    }

    if (authenticated) {
      return <WrappedComponent {...props} />; // Render the protected component if authenticated
    }

    return null; // Render nothing if not authenticated (prevents flashing of protected content)
  };
};

export default withAuth;
