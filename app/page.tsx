"use client"; // Client component

import React from "react";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Page = () => {
  return (
    <div>
      <LandingPage />
      {/* Add conditional rendering for SignIn and SignUp based on route */}
    </div>
  );
};

export default Page;
