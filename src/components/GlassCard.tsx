import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_hsl(330_80%_65%/0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
