"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import withAuth from "@/app/hoc/withAuth";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 3D Background Component (Rendering Target.glb model)
  const Target3D = () => {
    const { scene } = useGLTF("/models/Target.glb"); // Path to your GLB file
    return <primitive object={scene} scale={5} position={[0, -1, 0]} />;
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-900 text-gray-200">
      {isSidebarOpen && <Sidebar />}
      <div className={`flex-1 ${isSidebarOpen ? "ml-0" : ""} overflow-auto`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-6 relative z-0">
          <h1 className="text-3xl font-bold mb-4">Task Overview</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Task 1", status: "Pending", deadline: "Oct 30" },
              { title: "Task 2", status: "In Progress", deadline: "Nov 15" },
              { title: "Task 3", status: "Overdue", deadline: "Oct 10" },
              { title: "Task 4", status: "Complete", deadline: "Oct 5" },
            ].map((task, index) => (
              <CardTitle
                key={index}
                className="bg-gray-800 shadow-lg rounded-md p-4"
              >
                <CardContent>
                  <h2 className="text-xl">{task.title}</h2>
                  <Badge
                    variant={
                      task.status === "Overdue"
                        ? "destructive"
                        : task.status === "In Progress"
                        ? "inProgress"
                        : task.status === "Complete"
                        ? "complete"
                        : "default"
                    }
                  >
                    {task.status}
                  </Badge>
                </CardContent>
                <CardDescription>
                  <p>Deadline: {task.deadline}</p>
                </CardDescription>
              </CardTitle>
            ))}
          </div>
        </div>
        {/* 3D Target Model Background */}
        <Canvas className="absolute inset-0 z-0">
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls enableZoom={false} />
          <Target3D />
        </Canvas>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
