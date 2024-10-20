"use client";

import React from "react";
import Progress from "@/components/ui/progress"; // Assuming default export
import Button from "@/components/ui/Button"; // Assuming named export
import { Check, XCircle } from "lucide-react"; // Lucide icons

const DashboardContent = () => {
  const tasks = [
    {
      id: 1,
      title: "Prepare Meeting Agenda",
      status: "In Progress",
      progress: 60,
    },
    {
      id: 2,
      title: "Submit Financial Report",
      status: "Completed",
      progress: 100,
    },
    { id: 3, title: "Office Attendance", status: "Pending", progress: 0 },
  ];

  return (
    <div>
      <section>
        <h2 className="text-xl font-semibold mb-4">Task Overview</h2>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 bg-gray-50 rounded-md shadow-md">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p>Status: {task.status}</p>
              <Progress value={task.progress} className="my-2" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Pending Duty Proof Approvals
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-md">
            <p>Member 1 - Office Attendance (Selfie)</p>
            <div className="flex space-x-2">
              <Button variant="success" className="flex items-center">
                <Check size={18} className="mr-2" />
                Approve
              </Button>
              <Button variant="destructive" className="flex items-center">
                <XCircle size={18} className="mr-2" />
                Reject
              </Button>
            </div>
          </div>
          {/* Add more pending approvals here */}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Pending Task Submissions</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-md">
            <p>Member 2 - Financial Report (Document)</p>
            <div className="flex space-x-2">
              <Button variant="success" className="flex items-center">
                <Check size={18} className="mr-2" />
                Approve
              </Button>
              <Button variant="destructive" className="flex items-center">
                <XCircle size={18} className="mr-2" />
                Reject
              </Button>
            </div>
          </div>
          {/* Add more pending task submissions here */}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Overdue Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-md">
            <p>Member 3 - Task Overdue: Office Attendance</p>
            <Button variant="default">Send Reminder</Button>
          </div>
          {/* Add more overdue notifications here */}
        </div>
      </section>
    </div>
  );
};

export default DashboardContent;
