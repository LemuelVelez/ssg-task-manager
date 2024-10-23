"use client";

import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import withAuth from "@/app/hoc/withAuth";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTasks } from "@/lib/utils/appwrite";
import { AiFillWarning } from "react-icons/ai"; // Overdue Icon
import {
  BsCheckCircleFill,
  BsFillClockFill,
  BsFillPersonFill,
} from "react-icons/bs"; // Complete, In Progress, Pending Icons

// Mapping enum status values to display-friendly text
export const statusDisplayMap: { [key: string]: string } = {
  overdue: "Overdue",
  inProgress: "In Progress",
  complete: "Complete",
  pending: "Pending",
};

const statusIcons: { [key: string]: JSX.Element } = {
  overdue: <AiFillWarning className="inline mr-1 text-red-5000" />, // Red icon for overdue
  inProgress: <BsFillClockFill className="inline mr-1 text-yellow-500" />, // Yellow icon for in progress
  complete: <BsCheckCircleFill className="inline mr-1 text-green-500" />, // Green icon for complete
  pending: <BsFillPersonFill className="inline mr-1 text-blue-500" />, // Blue icon for pending
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]); // State to hold the fetched tasks

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch tasks from Appwrite when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksFromAppwrite = await getTasks(); // Fetch tasks using the backend function
        setTasks(tasksFromAppwrite); // Set the tasks into state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to fetch tasks only once when the component mounts

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
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <CardTitle
                  key={index}
                  className="bg-gray-800 shadow-lg rounded-md p-4"
                >
                  <CardContent>
                    <h2 className="text-xl">{task.title}</h2>
                    <Badge
                      variant={
                        task.status === "overdue"
                          ? "destructive"
                          : task.status === "inProgress"
                          ? "inProgress"
                          : task.status === "complete"
                          ? "complete"
                          : task.status === "pending"
                          ? "pending"
                          : "default"
                      }
                    >
                      {statusIcons[task.status] || null}
                      {statusDisplayMap[task.status] || task.status}
                    </Badge>
                  </CardContent>
                  <CardDescription>
                    <p>Deadline: {task.deadline}</p>
                  </CardDescription>
                </CardTitle>
              ))
            ) : (
              <p>No tasks found</p>
            )}
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
