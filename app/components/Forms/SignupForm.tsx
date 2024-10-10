import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import SocialSignIn from "./SocialSignIn";

interface SignupFormProps {
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (termsAccepted) {
      await onSubmit(event, name, email, password);
    } else {
      console.error("You must accept the terms and policy.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Get Started Now</h2>
      <InputField
        label="Name"
        placeholder="Enter your name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="Email address"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center mt-5 text-sm text-gray-700">
        <input
          type="checkbox"
          id="terms"
          className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
        />
        <label htmlFor="terms" className="ml-2">
          I agree to the <span className="underline cursor-pointer">terms & policy</span>
        </label>
      </div>
      <Button type="submit" className="mt-6 bg-green-600 text-white hover:bg-green-700 transition duration-200">
        Sign Up
      </Button>
      <div className="text-center my-4 text-gray-500">Or</div>
      <SocialSignIn />
      <p className="text-sm font-medium text-gray-600 text-center mt-6">
        Have an account? <span className="text-blue-600 cursor-pointer">Sign In</span>
      </p>
    </form>
  );
};

export default SignupForm;
