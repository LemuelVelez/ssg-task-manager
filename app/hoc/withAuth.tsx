"use client"; // Ensure this is a client-side component

import { useRouter } from "next/navigation"; // Use next/navigation for client-side routing
import { useEffect, useState, Suspense } from "react";
import { getLoggedInUser } from "@/lib/utils/appwrite"; // Import the function that gets the current logged-in user
import { Canvas } from "@react-three/fiber"; // Canvas for 3D rendering
import { OrbitControls, Html } from "@react-three/drei"; // OrbitControls and Html helper
import { MeshDistortMaterial, Sphere } from "@react-three/drei"; // Distorted material for a dynamic effect

// 3D Loading Component
const LoadingSpinner = () => (
  <div className="loading-container">
    {" "}
    {/* Use the new CSS class */}
    <Canvas className="h-full w-full">
      {" "}
      {/* Ensure Canvas covers the full area of the parent */}
      <Suspense
        fallback={
          <Html center>
            <p className="text-gray-200">Loading 3D Spinner...</p>
          </Html>
        }
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <OrbitControls enableZoom={false} />
        <Sphere args={[1, 100, 200]} scale={1.5}>
          <MeshDistortMaterial
            color="#8352FD"
            attach="material"
            distort={0.5}
            speed={2}
          />
        </Sphere>
      </Suspense>
    </Canvas>
  </div>
);

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
          setTimeout(() => setLoading(false), 1500); // Simulated delay for loading state
        }
      };

      checkAuth();
    }, [router]); // Ensure router is available

    if (loading) {
      return <LoadingSpinner />; // Render the 3D loading spinner while loading
    }

    if (authenticated) {
      return <WrappedComponent {...props} />; // Render the protected component if authenticated
    }

    return null; // Render nothing if not authenticated (prevents flashing of protected content)
  };
};

export default withAuth;
