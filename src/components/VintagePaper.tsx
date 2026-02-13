import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface VintagePaperProps {
  children: ReactNode;
  className?: string;
}

const VintagePaper = ({ children, className }: VintagePaperProps) => {
  return (
    <div className="relative inline-block w-full max-w-2xl mx-auto">
      {/* Paper with torn edges */}
      <div
        className={cn(
          "vintage-paper relative rounded-sm px-8 py-12 md:px-14 md:py-16",
          "rotate-[1.5deg] md:rotate-[2deg]",
          "shadow-[0_10px_40px_rgba(0,0,0,0.4)]",
          className
        )}
        style={{
          clipPath: "polygon(0% 2%, 3% 0%, 7% 1.5%, 12% 0.5%, 18% 2%, 24% 0%, 30% 1%, 37% 0.5%, 43% 2%, 50% 0%, 57% 1.5%, 63% 0%, 70% 2%, 76% 0.5%, 82% 1%, 88% 0%, 93% 2%, 97% 0.5%, 100% 1.5%, 99% 5%, 100% 12%, 99.5% 20%, 100% 30%, 99% 40%, 100% 50%, 99.5% 60%, 100% 70%, 99% 80%, 100% 88%, 99% 95%, 100% 98%, 97% 100%, 93% 99%, 88% 100%, 82% 99%, 76% 100%, 70% 99.5%, 63% 100%, 57% 99%, 50% 100%, 43% 99.5%, 37% 100%, 30% 99%, 24% 100%, 18% 99%, 12% 100%, 7% 99.5%, 3% 100%, 0% 99%, 0.5% 93%, 0% 85%, 0.5% 77%, 0% 68%, 0.5% 58%, 0% 50%, 0.5% 40%, 0% 32%, 0.5% 22%, 0% 13%, 0.5% 7%)",
        }}
      >
        <div className="-rotate-[0.5deg] md:-rotate-[1deg]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default VintagePaper;
