// app/components/TaskManager.tsx
"use client"; // Add this line at the top

import React, { useState, useEffect } from "react";
import { Account } from "appwrite";
import { createTask, fetchTasks, deleteTask } from "../lib/taskService";
import SignIn from "./SignIn"; // Import the SignIn component
import SignUp from "./SignUp"; // Import the SignUp component
import { client } from "../lib/appwrite"; // Ensure this imports your Appwrite client
import { Task } from "../lib/types"; // Import the Task type

const account = new Account(client);

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false); // Track if the user wants to sign up

  const checkSession = async () => {
    try {
      await account.getSession("current");
      setIsSignedIn(true);
      loadTasks(); // Load tasks if the user is signed in
    } catch (error) {
      setIsSignedIn(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await account.deleteSession("current"); // Deletes the current session
      setIsSignedIn(false); // Update state
      alert("Successfully signed out!");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  // Load tasks function
  const loadTasks = async () => {
    const fetchedDocuments = await fetchTasks();
    setTasks(fetchedDocuments || []); // Handle the fetched tasks
  };

  if (!isSignedIn) {
    return (
      <div>
        {isSigningUp ? <SignUp /> : <SignIn />}
        <button onClick={() => setIsSigningUp(!isSigningUp)}>
          {isSigningUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks available.</li>
        ) : (
          tasks.map((task) => (
            <li key={task.$id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Deadline: {task.deadline}</p>
              <button onClick={() => deleteTask(task.$id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskManager;
