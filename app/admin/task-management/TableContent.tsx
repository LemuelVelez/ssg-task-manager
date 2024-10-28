"use client";

import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import {
  AiOutlineDelete,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineExclamationCircle,
  AiOutlineFieldTime,
  AiOutlineInfoCircle,
  AiOutlineTool,
  AiOutlineUser,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import { BsFillPersonFill } from "react-icons/bs";
import { Card, CardContent } from "@/components/ui/card"; // Import the Card component

interface Task {
  id: string;
  title: string;
  description?: string;
  member: string;
  deadline: string;
  status: "inProgress" | "complete" | "pending" | "overdue";
}

interface TableContentProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
}

const TableContent: React.FC<TableContentProps> = ({ tasks, onDeleteTask }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(tasks.length / rowsPerPage);

  // Get the tasks for the current page
  const currentTasks = tasks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Define Framer Motion variants
  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }, // Subtle scaling down on exit
  };

  return (
    <Card>
      <CardContent className="bg-gray-900">
        <Table className="bg-gray-900 text-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center">
                  <AiOutlineInfoCircle className="mr-2 text-gray-200" />
                  <span className="mr-2 text-gray-200">Title</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <AiOutlineInfoCircle className="mr-2 text-gray-200" />
                  <span className="text-gray-200">Description</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <AiOutlineUser className="mr-2 text-gray-200" />
                  <span className="text-gray-200">Assignee</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <AiOutlineFieldTime className="mr-2 text-gray-200" />
                  <span className="text-gray-200">Deadline</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <AiOutlineCheckCircle className="mr-2 text-gray-200" />
                  <span className="text-gray-200">Status</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <AiOutlineTool className="mr-2 text-gray-200" />
                  <span className="text-gray-200">Actions</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTasks.map((task) => (
              <motion.tr
                key={task.id}
                variants={variants} // Apply the variants
                initial="hidden"
                animate="visible"
                exit="exit" // Animate exit
                className="text-gray-200"
              >
                <TableCell className="text-gray-200">{task.title}</TableCell>
                <TableCell className="text-gray-200">
                  {task.description || "N/A"}
                </TableCell>
                <TableCell className="text-gray-200">{task.member}</TableCell>
                <TableCell className="text-gray-200">{task.deadline}</TableCell>
                <TableCell className="text-gray-200">
                  <div className="flex items-center">
                    {task.status === "pending" && (
                      <BsFillPersonFill className="mr-1 text-yellow-500" />
                    )}
                    {task.status === "overdue" && (
                      <AiOutlineExclamationCircle className="mr-2 text-red-500" />
                    )}
                    {task.status === "inProgress" && (
                      <AiOutlineClockCircle className="mr-2 text-blue-500" />
                    )}
                    {task.status === "complete" && (
                      <AiOutlineCheckCircle className="mr-2 text-green-500" />
                    )}
                    <Badge variant={task.status} className="text-gray-200">
                      {task.status.charAt(0).toUpperCase() +
                        task.status.slice(1)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-gray-200">
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    <AiOutlineDelete />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-4 text-gray-200">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AiOutlineLeft className="mr-2" />
            Previous
          </Button>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg font-normal">
            {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <AiOutlineRight className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TableContent;
