"use client";

import { useState } from "react";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    // Example tasks
    {
      title: "Organize School Event",
      member: "Jane Doe",
      deadline: "2024-10-25",
      status: "Pending",
    },
  ]);

  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-purple-900 to-gray-900 p-6 text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Task List</h2>
        <table className="w-full table-auto bg-gray-700 bg-opacity-60 text-gray-200">
          <thead>
            <tr>
              <th>Title</th>
              <th>Member</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>{task.member}</td>
                <td>{task.deadline}</td>
                <td>{task.status}</td>
                <td>
                  <button className="bg-blue-400 text-gray-900 p-2 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-400 text-gray-900 p-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Create New Task</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newTask = {
              title: e.target.title.value,
              member: e.target.member.value,
              deadline: e.target.deadline.value,
              status: "Pending",
            };
            createTask(newTask);
          }}
          className="bg-gray-700 bg-opacity-60 p-4 rounded-lg"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">
              Task Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full p-2 rounded bg-gray-600 text-gray-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="member" className="block mb-2">
              Assigned Member
            </label>
            <input
              id="member"
              type="text"
              className="w-full p-2 rounded bg-gray-600 text-gray-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block mb-2">
              Deadline
            </label>
            <input
              id="deadline"
              type="date"
              className="w-full p-2 rounded bg-gray-600 text-gray-200"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-400 text-gray-900 p-2 rounded"
          >
            Create Task
          </button>
        </form>
      </section>
    </div>
  );
};

export default TaskManagement;
