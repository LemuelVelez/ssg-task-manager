import React from "react";
import SignupForm from "../components/Forms/SignupForm";
import { account } from "../lib/appwrite";

const SignupPage: React.FC = () => {
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    username: string,
    email: string,
    password: string
  ) => {
    event.preventDefault();

    try {
      const response = await account.create(
        "unique()",
        email,
        password,
        username
      );
      console.log("User signed up:", response);
      // Redirect or show success message here
    } catch (error) {
      console.error("Sign up error:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex gap-8 max-md:flex-col">
        <section className="flex flex-col w-full max-w-md">
          <SignupForm onSubmit={handleSubmit} />
        </section>
        <section className="flex flex-col w-full max-w-lg">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/59f46d860416a3c18702f63ca490ec73d7b100c8affb3b665d7e1e733b3ab1d2?placeholderIfAbsent=true&apiKey=85a35ccdbd134d45818947b96e3fa249"
            alt="Signup illustration"
            className="object-contain w-full rounded-lg shadow-lg"
          />
        </section>
      </div>
    </main>
  );
};

export default SignupPage;
