"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import {
  AiOutlinePlus,
  AiOutlineFieldTime,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineClockCircle,
  AiOutlineTool,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { createTask, getTasks, deleteTask } from "@/lib/utils/appwrite";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  description?: string;
  member: string;
  deadline: string;
  status: "inProgress" | "complete" | "pending" | "overdue";
}

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const methods = useForm<Omit<Task, "id">>();
  const { handleSubmit, register, reset } = methods;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Omit<Task, "id" | "status">> = async (data) => {
    const { title, member, deadline, description } = data;

    if (!title || !member || !deadline) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTaskEntry: Task = {
      ...data,
      id: uuidv4(),
      status: "pending",
    };

    try {
      await createTask(newTaskEntry);
      setTasks((prev) => [newTaskEntry, ...prev]);

      await Swal.fire({
        icon: "success",
        title: "Task Created!",
        text: "Your task has been successfully created.",
        confirmButtonText: "OK",
      });

      reset();
    } catch (error) {
      console.error("Failed to create task:", error);
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to create the task. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));

      await Swal.fire({
        icon: "success",
        title: "Task Deleted!",
        text: "Your task has been successfully deleted.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the task. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const updateTaskStatus = () => {
    const now = new Date();

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        const taskDeadline = new Date(task.deadline);
        if (task.status === "pending" && taskDeadline < now) {
          Swal.fire({
            icon: "warning",
            title: "Task Overdue!",
            text: `The task "${task.title}" is now overdue.`,
            confirmButtonText: "OK",
          });
          return { ...task, status: "overdue" }; // Update status to overdue
        }
        return task; // Return unchanged task
      })
    );
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks as Task[]);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();

    // Set interval for periodic updates
    const intervalId = setInterval(() => {
      updateTaskStatus();
    }, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-200">
      {isSidebarOpen && <Sidebar />}
      <div className={`flex-1 ${isSidebarOpen ? "ml-0" : ""} overflow-auto`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Task Management</h1>

          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormItem>
                <FormLabel htmlFor="title">Task Title</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    {...register("title")}
                    required
                    placeholder="Enter task title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Input
                    id="description"
                    {...register("description")}
                    placeholder="Enter task description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="member">Assigned Member</FormLabel>
                <FormControl>
                  <Input
                    id="member"
                    {...register("member")}
                    required
                    placeholder="Enter member name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="deadline">Deadline</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    id="deadline"
                    {...register("deadline")}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button
                type="submit"
                className="mt-4 flex items-center bg-blue-500 hover:bg-blue-600 text-white"
              >
                <AiOutlinePlus className="mr-2" />
                Add Task
              </Button>
            </Form>
          </FormProvider>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center">
                    <AiOutlineInfoCircle className="mr-2" />{" "}
                    <span className="mr-2">Title</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <AiOutlineInfoCircle className="mr-2" />
                    <span>Description</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <AiOutlineUser className="mr-2" />
                    <span>Assigned To</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <AiOutlineFieldTime className="mr-2" />
                    <span>Deadline</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <AiOutlineCheckCircle className="mr-2" />
                    <span>Status</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <AiOutlineTool className="mr-2" />
                    <span>Actions</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description || "N/A"}</TableCell>
                  <TableCell>{task.member}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {task.status === "overdue" && (
                        <AiOutlineExclamationCircle className="mr-2 text-red-500" />
                      )}
                      {task.status === "inProgress" && (
                        <AiOutlineClockCircle className="mr-2 text-blue-500" />
                      )}
                      {task.status === "complete" && (
                        <AiOutlineCheckCircle className="mr-2 text-green-500" />
                      )}
                      <Badge variant={task.status}>
                        {task.status.charAt(0).toUpperCase() +
                          task.status.slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
