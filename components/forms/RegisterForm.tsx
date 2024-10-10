import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, getUserByEmail } from "@/lib/actions/user.actions";
import { loginWithOAuth } from "@/lib/auth"; // Ensure this is imported correctly
import { OAuthProvider } from "appwrite"; // Import the OAuthProvider type from Appwrite

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit({
    name,
    email,
    password,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    setErrorMessage(""); // Reset error message

    try {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        setErrorMessage(
          "An account with this email already exists. Please sign in."
        );
        setIsLoading(false);
        return;
      }

      const userData = {
        name,
        email,
        password,
      };
      await createUser(userData);

      router.push(`/task-management`);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "An error occurred during registration. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome to SSG Task Manager 👋</h1>
          <p className="text-dark-700">Create your account to get started.</p>
        </section>

        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email address"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <div className="relative">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            label="Password"
            placeholder="********"
            type={passwordVisible ? "text" : "password"} // Use password visibility state
            iconSrc="/assets/icons/lock.svg"
            iconAlt="password"
          />
          <button
            type="button"
            className="absolute right-3 top-3 w-5 h-5 flex items-center justify-center"
            onClick={togglePasswordVisibility} // Toggle password visibility
          >
            {passwordVisible ? (
              <img
                src="/assets/icons/eye-off.svg"
                alt="Hide Password"
                className="w-full h-full"
              />
            ) : (
              <img
                src="/assets/icons/eye.svg"
                alt="Show Password"
                className="w-full h-full"
              />
            )}
          </button>
        </div>

        <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>

        <div className="flex items-center justify-center my-4">
          <span className="text-gray-500">or</span>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={() => loginWithOAuth("google" as OAuthProvider)} // Use OAuthProvider type assertion
          >
            <img
              src="/assets/icons/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span>Sign up with Google</span>
          </button>
        </div>

        <div className="flex justify-center my-4">
          <p className="text-gray-700 text-lg">
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-600 underline font-semibold hover:text-blue-800 transition duration-200"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
