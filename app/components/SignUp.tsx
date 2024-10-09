"use client"; // Client component

import React, { useState } from "react";
import { Account } from "appwrite";
import { client } from "../lib/appwrite"; // Ensure this imports your Appwrite client
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const account = new Account(client);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.create(email, password); // Create user in Appwrite
      alert("Successfully signed up! You can now sign in.");
      router.push("/sign-in"); // Redirect to the sign-in page
    } catch (error) {
      console.error("Failed to sign up:", error);
      alert("Failed to sign up. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
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
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <Link href="/sign-in">Sign In</Link>
      </p>
    </form>
  );
};

export default SignUp;
