import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define badge variants with different styles for each status
const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gray-900 text-gray-50 shadow hover:bg-gray-900/80 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/80", // Pending
        secondary:
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80", // General use
        destructive:
          "border-transparent bg-red-500 text-gray-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/80", // Overdue
        outline: "text-gray-950 dark:text-gray-50", // Outline variant
        inProgress:
          "border-transparent bg-blue-500 text-gray-50 shadow hover:bg-blue-500/80 dark:bg-blue-900 dark:text-gray-50 dark:hover:bg-blue-900/80", // In Progress
        complete:
          "border-transparent bg-green-500 text-gray-50 shadow hover:bg-green-500/80 dark:bg-green-900 dark:text-gray-50 dark:hover:bg-green-900/80", // Complete
        pending:
          "border-transparent bg-yellow-500 text-gray-50 shadow hover:bg-yellow-500/80 dark:bg-yellow-900 dark:text-gray-50 dark:hover:bg-yellow-900/80", // Pending explicitly defined
      },
    },
    defaultVariants: {
      variant: "default", // Default variant is "Pending"
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Badge component rendering with the class name based on variant
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
