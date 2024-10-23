"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Importing uuid for unique IDs
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"; // Adjust the path as necessary
import { Input } from "../../../components/ui/input"; // Adjust the path as necessary
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Adjust the path as necessary
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"; // Import useForm, FormProvider, and SubmitHandler

interface Task {
  id: string;
  title: string;
  description: string;
  member: string;
  deadline: string;
  status: string;
}

const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Organize school event",
    member: "John Doe",
    deadline: "2024-10-25",
    status: "In Progress",
    description: "",
  },
  {
    id: uuidv4(),
    title: "Prepare financial report",
    member: "Jane Smith",
    deadline: "2024-10-30",
    status: "Pending",
    description: "",
  },
];

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Set up react-hook-form
  const methods = useForm<Omit<Task, "id" | "status">>(); // Specify the type
  const { handleSubmit, register } = methods; // Destructure the methods

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Omit<Task, "id" | "status">> = (data) => {
    // Explicitly type onSubmit
    const { title, member, deadline } = data;

    if (!title || !member || !deadline) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTaskEntry: Task = {
      ...data,
      id: uuidv4(),
      status: "Pending",
    };

    setTasks((prev) => [...prev, newTaskEntry]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-200">
      {isSidebarOpen && <Sidebar />}

      <div className={`flex-1 ${isSidebarOpen ? "ml-0" : ""} overflow-auto`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Task Management</h1>

          {/* Task Creation Form */}
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormItem>
                <FormLabel htmlFor="title">Task Title</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    {...register("title")} // Register the input
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Input id="description" {...register("description")} />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="member">Assigned Member</FormLabel>
                <FormControl>
                  <Input
                    id="member"
                    {...register("member")} // Register the input
                    required
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
                    {...register("deadline")} // Register the input
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button type="submit" className="mt-4">
                Add Task
              </Button>
            </Form>
          </FormProvider>

          {/* Task Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.member}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
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
