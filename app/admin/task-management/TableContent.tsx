"use client";

import React, { useState } from "react";
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

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center">
                <AiOutlineInfoCircle className="mr-2" />
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
          {currentTasks.map((task) => (
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
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <AiOutlineDelete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <AiOutlineLeft className="mr-2" />
          Previous
        </Button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <AiOutlineRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default TableContent;
