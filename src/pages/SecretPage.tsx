import FloatingBlobs from "@/components/FloatingBlobs";
import AnimatedSection from "@/components/AnimatedSection";
import GlassCard from "@/components/GlassCard";
import MusicToggle from "@/components/MusicToggle";
import { Link } from "react-router-dom";

import secretData from "@/content/secret.json";

const SecretPage = () => {
  return (
    <div className="relative min-h-screen ambient-bg overflow-hidden">
      <FloatingBlobs />
      <MusicToggle />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
        <AnimatedSection className="text-center mb-16">
          <p className="text-5xl mb-4">🤫</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold gradient-text mb-3">
            {secretData.title}
          </h1>
          <p className="text-muted-foreground font-sans text-sm">
            You found the secret page…
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {secretData.messages.map((msg, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <GlassCard>
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{msg.emoji}</span>
                  <p className="text-foreground font-sans leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.8} className="text-center mt-12">
          <Link
            to="/"
            className="text-muted-foreground hover:text-primary transition-colors font-sans text-sm tracking-wider"
          >
            ← Back to the Proposal
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SecretPage;
