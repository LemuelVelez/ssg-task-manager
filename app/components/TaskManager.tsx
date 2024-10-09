"use client";

import React, { useState, useEffect } from "react";
import { createTask, fetchTasks, deleteTask } from "../lib/taskService";
import { Models } from "appwrite";

// Define the Task type (based on Appwrite's Document type)
type Task = Models.Document & {
  title: string;
  description: string;
  deadline: string;
  assigned_to: string;
  status: string;
};

const TaskManager = () => {
  // Initialize tasks with an empty array to avoid undefined
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const loadTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks as Task[]); // Ensure fetchedTasks is of Task[] type
    } catch (error) {
      console.error("Error loading tasks:", error);
      setTasks([]); // Fallback to empty array in case of error
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Omit<Task, "$id" | "$createdAt" | "$updatedAt"> = {
      title,
      description,
      assigned_to: "member_id", // Replace with actual member ID
      status: "pending",
      deadline,
    };
    await createTask(newTask);
    setTitle("");
    setDescription("");
    setDeadline("");
    loadTasks();
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    loadTasks();
  };

  return (
    <div className="task-manager">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Create Task</button>
      </form>

      <h2>Tasks:</h2>
      <ul>
        {tasks === undefined ? ( // If tasks is still undefined, show loading state
          <li>Loading tasks...</li>
        ) : tasks.length === 0 ? ( // Safely check if tasks array is empty
          <li>No tasks available.</li>
        ) : (
          tasks.map((task) => (
            <li key={task.$id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Deadline: {task.deadline}</p>
              <button onClick={() => handleDelete(task.$id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskManager;
