"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import Swal from "sweetalert2";
import {
  createTask,
  deleteTask,
  getTasks,
  updateOverdueTasks,
} from "@/lib/utils/appwrite"; // Ensure you have these utility functions
import TableContent from "../task-management/TableContent"; // Import TableContent component

// Task interface remains the same
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

  const methods = useForm<Omit<Task, "id" | "status">>();
  const { handleSubmit, register, reset } = methods;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Fetch tasks when the component mounts
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
      updateOverdueTasks();
    }, 3000); // Check 3 every minutes

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

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
                    placeholder="Assign a member"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="deadline">Deadline</FormLabel>
                <FormControl>
                  <Input
                    id="deadline"
                    type="date"
                    {...register("deadline")}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <Button
                type="submit"
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                <AiOutlinePlus className="mr-2" /> Create Task
              </Button>
            </Form>
          </FormProvider>

          <TableContent tasks={tasks} onDeleteTask={handleDeleteTask} />
        </div>
      </div>
    </div>
  );
};

export default Page;
