import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const overdueTasks = [
  { id: 1, title: "Event Planning", overdueBy: "2 days" },
  { id: 2, title: "Budget Report", overdueBy: "1 day" },
];

const OverdueNotifications = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Overdue Notifications</h2>
      <div className="grid grid-cols-1 gap-4">
        {overdueTasks.map((task) => (
          <div key={task.id} className="bg-red-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{task.title}</h3>
                <p className="text-gray-600">Overdue by: {task.overdueBy}</p>
              </div>
              <FiAlertTriangle className="text-red-500 text-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverdueNotifications;
