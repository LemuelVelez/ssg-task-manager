import React from "react";
import TaskOverview from "./TaskOverview";
import PendingProofApprovals from "./PendingProofApprovals";
import PendingTaskSubmissions from "./PendingTaskSubmissions";
import OverdueNotifications from "./OverdueNotifications";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Task Overview</h2>
      <TaskOverview />

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Pending Duty Proof Approvals
      </h2>
      <PendingProofApprovals />

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Pending Task Submissions
      </h2>
      <PendingTaskSubmissions />

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Overdue Notifications
      </h2>
      <OverdueNotifications />
    </div>
  );
};

export default Dashboard;
