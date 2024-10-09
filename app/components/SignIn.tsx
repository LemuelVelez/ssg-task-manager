"use client"; // Client component

import React, { useState } from "react";
import { Account } from "appwrite";
import { client } from "../lib/appwrite"; // Ensure this imports your Appwrite client
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const account = new Account(client);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createSession(email, password);
      alert("Successfully signed in!");
      router.push("/task-manager"); // Redirect to the task manager page
    } catch (error) {
      console.error("Failed to sign in:", error);
      alert("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <h2>Sign In</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign In</button>
      <p>
        Don't have an account? <Link href="/sign-up">Sign Up</Link>
      </p>
    </form>
  );
};

export default SignIn;
