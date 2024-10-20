import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded bg-gray-200",
          className
        )}
        {...props}
      >
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export default Progress;
