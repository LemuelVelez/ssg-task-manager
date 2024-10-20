import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a classNames utility

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "success" | "destructive";
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const baseStyles = "px-4 py-2 font-semibold rounded-md focus:outline-none";

  const variantStyles = {
    default: "bg-gray-200 hover:bg-gray-300 text-black",
    success: "bg-green-500 hover:bg-green-600 text-white",
    destructive: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
