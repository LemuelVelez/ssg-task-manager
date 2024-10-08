"use client"; // Marking the component as a Client Component

import { useEffect, useState } from "react";
import { getTasks, addTask, deleteTask } from "../services/taskService";
import { Task } from "../models/task";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [taskProof, setTaskProof] = useState<File | undefined>(undefined); // Change to File | undefined

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
    };

    await addTask(newTask, taskProof); // Pass the proof file to addTask
    setNewTaskTitle("");
    setTaskProof(undefined); // Clear the proof after adding

    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h3 className="text-xl font-bold mb-4">Task List</h3>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New Task Title"
          className="border rounded-l-md p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="file"
          accept="image/*" // Limit to images (modify as needed)
          onChange={(e) => {
            if (e.target.files) {
              setTaskProof(e.target.files[0]); // Set the proof file
            } else {
              setTaskProof(undefined); // Handle case where no file is selected
            }
          }}
          className="border p-2 ml-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white rounded-r-md px-4 hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>{task.title}</span>
            {task.proofUrl && (
              <img src={task.proofUrl} alt="Proof" className="h-10 w-10" />
            )}{" "}
            {/* Display proof */}
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
