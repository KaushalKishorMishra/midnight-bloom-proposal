import FloatingBlobs from "@/components/FloatingBlobs";
import AnimatedSection from "@/components/AnimatedSection";
import VintagePaper from "@/components/VintagePaper";
import { Link } from "react-router-dom";

import letterData from "@/content/letter.json";

const LetterPage = () => {
  return (
    <div className="relative min-h-screen ambient-bg overflow-hidden">
      <FloatingBlobs />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        <AnimatedSection>
          <VintagePaper>
            <div className="space-y-6">
              {letterData.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`font-serif text-sm md:text-base leading-relaxed ${
                    i === 0
                      ? "text-lg md:text-xl font-bold text-amber-900"
                      : "text-amber-950/80"
                  }`}
                >
                  {p}
                </p>
              ))}

              <div className="pt-6 border-t border-amber-900/10">
                <p className="font-serif text-amber-900 font-bold italic text-right">
                  {letterData.signoff}
                </p>
                <p className="font-sans text-xs text-amber-800/50 text-right mt-2">
                  {letterData.date}
                </p>
              </div>
            </div>
          </VintagePaper>

          <div className="text-center mt-12">
            <Link
              to="/"
              className="text-muted-foreground hover:text-primary transition-colors font-sans text-sm tracking-wider"
            >
              ← Back to the Proposal
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default LetterPage;
