import React from "react";

const PendingTaskSubmissions = () => {
  const submissions = [
    {
      id: 1,
      member: "Jane Smith",
      task: "Complete Event Proposal",
      document: "/path/to/report.pdf",
      submittedOn: "Oct 18, 2024",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="bg-gray-900 text-white shadow-lg p-4 rounded-lg"
        >
          <h3 className="font-semibold text-white">
            Member: {submission.member}
          </h3>
          <p className="text-gray-400">Task: {submission.task}</p>
          <p className="text-gray-400">
            Submitted On: {submission.submittedOn}
          </p>
          <a
            href={submission.document}
            className="text-blue-400 hover:underline"
          >
            Download Report
          </a>
          <div className="flex justify-end space-x-2 mt-4">
            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md">
              Approve
            </button>
            <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingTaskSubmissions;
