import React from "react";

const OverdueNotifications = () => {
  const overdueTasks = [
    {
      id: 1,
      member: "John Doe",
      task: "Prepare Financial Report",
      dueDate: "Oct 15, 2024",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {overdueTasks.map((task) => (
        <div
          key={task.id}
          className="bg-gray-900 text-white shadow-lg p-4 rounded-lg"
        >
          <h3 className="font-semibold text-white">Member: {task.member}</h3>
          <p className="text-gray-400">Task: {task.task}</p>
          <p className="text-gray-400">Due Date: {task.dueDate}</p>
          <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md mt-4">
            Send Reminder
          </button>
        </div>
      ))}
    </div>
  );
};

export default OverdueNotifications;
