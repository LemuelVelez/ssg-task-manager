import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/forms/AdminSignInForm";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { loginWithOAuth, checkAdminRole } from "@/lib/auth"; // Ensure proper role checks
import { OAuthProvider } from "appwrite";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
}

const AdminSignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({
    email,
    password,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = await loginWithOAuth(email, password); // Use custom authentication logic

      // Check if the user has admin privileges
      const isAdmin = await checkAdminRole(user.id);
      if (!isAdmin) {
        setErrorMessage("Access Denied: You are not an admin.");
        setIsLoading(false);
        return;
      }

      router.push(`/admin-dashboard`); // Redirect to admin dashboard
    } catch (error) {
      console.log(error);
      setErrorMessage("Sign-in failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Admin Portal 👋</h1>
          <p className="text-dark-700">
            Sign in to manage events and attendance.
          </p>
        </section>

        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Admin Email"
          placeholder="admin@example.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Password"
          placeholder="********"
          type="password"
          iconSrc="/assets/icons/lock.svg"
          iconAlt="password"
        />

        <SubmitButton isLoading={isLoading}>Sign In</SubmitButton>

        <div className="flex items-center justify-center my-4">
          <span className="text-gray-500">or</span>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={() => loginWithOAuth("google" as OAuthProvider)}
          >
            <img
              src="/assets/icons/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="flex justify-center my-4">
          <p className="text-gray-700 text-lg">
            Forgot your password?{" "}
            <button
              type="button"
              className="text-blue-600 underline font-semibold hover:text-blue-800 transition duration-200"
              onClick={() => router.push("/forgot-password")}
            >
              Reset Password
            </button>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default AdminSignInForm;
