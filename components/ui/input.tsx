import * as React from "react";
import { cn } from "@/lib/utils"; // Utility for conditional classes

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-400 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:file:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input"; // For React dev tools

// Input component export
export { Input };

// InputFile Component using Input

import { Label } from "@/components/ui/label";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop type
}

export function InputFile({ onChange, ...props }: InputFileProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="file"></Label>
      <Input
        id="file"
        type="file"
        className="bg-gray-700 text-gray-200"
        onChange={onChange} // Pass onChange here
        {...props} // Spread the rest of the props
      />
    </div>
  );
}
