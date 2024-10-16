// components/ui/button.tsx

import React, { ButtonHTMLAttributes, ForwardedRef, ReactNode } from "react";

// Extend the props to include the standard button attributes and any custom props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // Specify that children is required
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        {...props} // Spread props to ensure all are passed down
        className={`px-4 py-2 text-white bg-gradient-to-r from-blue-600 via-purple-600 to-gray-600 rounded-lg hover:from-blue-500 hover:via-purple-500 hover:to-gray-500 transition flex items-center justify-center gap-2 ${className}`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button"; // Setting display name for debugging
export default Button;
