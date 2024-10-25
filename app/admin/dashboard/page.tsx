"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import withAuth from "@/app/hoc/withAuth";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTasks } from "@/lib/utils/appwrite";
import { AiFillWarning } from "react-icons/ai";
import {
  BsCheckCircleFill,
  BsFillClockFill,
  BsFillPersonFill,
} from "react-icons/bs";

// Importing the statusDisplayMap and Task interface from types.ts
import { statusDisplayMap, Task } from "@/lib/utils/types";

const statusIcons: { [key: string]: JSX.Element } = {
  overdue: <AiFillWarning className="inline mr-1 text-red-5000" />,
  inProgress: <BsFillClockFill className="inline mr-1 text-yellow-500" />,
  complete: <BsCheckCircleFill className="inline mr-1 text-green-5000" />,
  pending: <BsFillPersonFill className="inline mr-1 text-blue-500" />,
};

// Define motion variants for different elements
const sidebarVariants = {
  open: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  closed: { x: -250, opacity: 0, transition: { duration: 0.3 } },
};

const taskVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksFromAppwrite = await getTasks();
        setTasks(tasksFromAppwrite);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const Target3D = () => {
    const { scene } = useGLTF("/models/Target.glb");
    return <primitive object={scene} scale={5} position={[0, -1, 0]} />;
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-900 text-gray-200">
      <motion.div
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        initial="closed"
        className="z-10"
      >
        {isSidebarOpen && <Sidebar />}
      </motion.div>
      <div className={`flex-1 ${isSidebarOpen ? "ml-0" : ""} overflow-auto`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <motion.div
          className="p-6 relative z-0"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <h1 className="text-3xl font-bold mb-4">Task Overview</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={taskVariants}
                >
                  <CardTitle className="bg-gray-800 shadow-lg rounded-md p-4">
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
                </motion.div>
              ))
            ) : (
              <p>No tasks found</p>
            )}
          </div>
        </motion.div>
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
