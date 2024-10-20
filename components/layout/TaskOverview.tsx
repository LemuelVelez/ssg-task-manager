import React from "react";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const tasks = [
  { id: 1, title: "Organize SSG Meeting", status: "Completed", deadline: "2024-10-15" },
  { id: 2, title: "Event Planning", status: "In Progress", deadline: "2024-10-20" },
  { id: 3, title: "Budget Report", status: "Pending", deadline: "2024-10-22" },
];

const TaskOverview = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Task Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">{task.title}</h3>
              <p className="text-gray-600">Deadline: {task.deadline}</p>
            </div>
            <div>
              {task.status === "Completed" ? (
                <FiCheckCircle className="text-green-500 text-2xl" />
              ) : task.status === "In Progress" ? (
                <FiClock className="text-yellow-500 text-2xl" />
              ) : (
                <FiXCircle className="text-red-500 text-2xl" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskOverview;
