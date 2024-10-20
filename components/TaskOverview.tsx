import React from "react";

const TaskOverview = () => {
  const tasks = [
    {
      id: 1,
      title: "Complete Event Proposal",
      status: "In Progress",
      deadline: "Oct 20, 2024",
    },
    {
      id: 2,
      title: "Prepare Financial Report",
      status: "Pending",
      deadline: "Oct 25, 2024",
    },
    {
      id: 3,
      title: "Volunteer for Outreach",
      status: "Completed",
      deadline: "Oct 15, 2024",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-gradient-to-r from-purple-400 to-blue-500 text-white shadow-lg p-4 rounded-lg"
        >
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-gray-300">Status: {task.status}</p>
          <p className="text-gray-400">Deadline: {task.deadline}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskOverview;
