"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTasks, ProgressCompleteTaskStatus } from "@/lib/utils/appwrite";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Task interface for type safety across the app
export interface Task {
  id: string;
  title: string;
  description?: string;
  member: string;
  deadline: string;
  status: "inProgress" | "complete";
}

const statusDisplayMap = {
  inProgress: "Progressing",
  complete: "Complete",
};

// Column definitions for tasks
export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Task",
    cell: ({ row }) => (
      <div className="text-gray-200">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-gray-200">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status} className="text-gray-200">
        {statusDisplayMap[row.original.status] || row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "member",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-gray-200"
      >
        Assignee
        <ArrowUpDown className="ml-2 h-4 w-4 text-gray-200" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-gray-200">{row.getValue("member")}</div>
    ),
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => (
      <div className="text-gray-200">{row.getValue("deadline")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;
      const handleStatusChange = async (status: "inProgress" | "complete") => {
        try {
          await ProgressCompleteTaskStatus(task.id, status);
          const updatedTasks = await getTasks();
          // @ts-expect-error @typescript-eslint/ban-ts-comment
          setTasks(updatedTasks as Task[]);
        } catch (error) {
          console.error("Error updating task status:", error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-gray-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800">
            <DropdownMenuLabel className="text-gray-200">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-gray-600" />
            <DropdownMenuItem
              className="text-gray-200"
              onClick={() => handleStatusChange("inProgress")}
            >
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-gray-200"
              onClick={() => handleStatusChange("complete")}
            >
              Complete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// TaskContent component rendering the task table
const TaskContent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks as Task[]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const table = useReactTable({
    data: tasks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full bg-gray-900 text-gray-200 pt-3">
        <CardHeader>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter tasks..."
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm bg-gray-800 text-gray-200 placeholder-gray-400"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto text-gray-200 bg-gray-800 border-gray-600"
                >
                  Columns <ChevronDown className="ml-2 h-4 w-4 text-gray-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-800">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-gray-200"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-600">
            <Table className="text-gray-200">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="bg-gray-800 text-gray-200"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="bg-gray-900 hover:bg-gray-800"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-gray-200">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-gray-500"
                    >
                      No tasks available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Pagination Controls */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: Math.max(prev.pageIndex - 1, 0),
                  }))
                }
                // @ts-expect-error @typescript-eslint/ban-ts-comment
                disabled={pagination.pageIndex === 0}
              />
            </PaginationItem>
            {Array.from(
              { length: Math.ceil(tasks.length / pagination.pageSize) },
              (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={() =>
                      setPagination({ ...pagination, pageIndex: i })
                    }
                    // @ts-expect-error @typescript-eslint/ban-ts-comment
                    active={pagination.pageIndex === i}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: Math.min(
                      prev.pageIndex + 1,
                      Math.ceil(tasks.length / pagination.pageSize) - 1
                    ),
                  }))
                }
                // @ts-expect-error @typescript-eslint/ban-ts-comment
                disabled={
                  pagination.pageIndex >=
                  Math.ceil(tasks.length / pagination.pageSize) - 1
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </motion.div>
  );
};

export default TaskContent;
