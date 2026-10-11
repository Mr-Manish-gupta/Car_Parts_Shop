import React from "react";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full px-3.5 py-2.5 bg-[#12151D] border rounded-xl text-sm text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-1",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
              : "border-[#222734] focus:border-red-600 focus:ring-red-600/30",
            className
          )}
          {...props}
        />

        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
        {helperText && !error && <p className="text-xs text-gray-400">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";