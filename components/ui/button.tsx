import React, { ButtonHTMLAttributes, ForwardedRef, ReactNode } from "react";

// Extend the props to include the standard button attributes and any custom props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // Specify that children is required
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        {...props} // Spread props to ensure all are passed down
        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button"; // Setting display name for debugging
export default Button;
