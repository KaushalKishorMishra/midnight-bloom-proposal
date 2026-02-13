import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

const GradientButton = ({ children, className, variant = "primary", ...props }: GradientButtonProps) => {
  if (variant === "secondary") {
    return (
      <button
        className={cn(
          "relative px-8 py-4 rounded-full font-sans font-medium text-base",
          "bg-transparent border border-[hsl(var(--bloom-pink)/0.3)]",
          "text-[hsl(var(--bloom-pink))]",
          "hover:bg-[hsl(var(--bloom-pink)/0.1)] hover:border-[hsl(var(--bloom-pink)/0.5)]",
          "active:scale-[0.98] transition-all duration-300",
          "min-h-[44px] min-w-[44px]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn(
        "relative px-8 py-4 rounded-full font-sans font-semibold text-base",
        "bg-gradient-to-r from-bloom-pink to-bloom-coral",
        "text-primary-foreground",
        "shadow-[0_0_20px_hsl(var(--bloom-pink)/0.3)]",
        "hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--bloom-pink)/0.5)]",
        "active:scale-[0.98] transition-all duration-300",
        "min-h-[44px] w-full md:w-auto",
        "animate-pulse-glow",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default GradientButton;
