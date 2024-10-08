// app/components/TaskList.tsx
"use client"; // Marking the component as a Client Component

import { useEffect, useState } from "react";
import { getTasks, addTask, deleteTask } from "./services/taskService"; // Corrected path
import { Task } from "./models/task"; // Corrected path

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  useEffect(() => {
    // Fetch tasks when the component mounts
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === "") return; // Prevent adding empty tasks

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      dueDate: new Date().toISOString(), // Add a due date here
    };

    await addTask(newTask);
    setNewTaskTitle(""); // Clear input after adding the task

    // Fetch updated tasks
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);

    // Fetch updated tasks
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h3 className="text-xl font-bold mb-4">Task List</h3>

      {/* Task Input */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New Task Title"
          className="border rounded-l-md p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white rounded-r-md px-4 hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>{task.title}</span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-600 hover:text-red-800 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
