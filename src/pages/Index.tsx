import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import FloatingBlobs from "@/components/FloatingBlobs";
import GlassCard from "@/components/GlassCard";
import GradientButton from "@/components/GradientButton";
import AnimatedSection from "@/components/AnimatedSection";
import useConfetti from "@/components/Confetti";
import MusicToggle from "@/components/MusicToggle";
import { Link } from "react-router-dom";

import heroData from "@/content/hero.json";
import proposalData from "@/content/proposal.json";
import timelineData from "@/content/timeline.json";
import peopleData from "@/content/people.json";

type ProposalState = "idle" | "asking" | "answered_yes" | "answered_no";

const Index = () => {
  const [state, setState] = useState<ProposalState>("idle");
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const { fire: fireConfetti } = useConfetti();

  const handleYes = useCallback(() => {
    setState("answered_yes");
    fireConfetti();
  }, [fireConfetti]);

  const handleNoHover = useCallback(() => {
    setNoButtonOffset({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100,
    });
  }, []);

  const scrollToProposal = () => {
    setState("asking");
    document.getElementById("proposal")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen ambient-bg overflow-hidden">
      <FloatingBlobs />
      <MusicToggle />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-muted-foreground font-sans text-sm tracking-[0.3em] uppercase mb-6"
          >
            A message for {peopleData.her.shortName}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight mb-6 max-w-4xl"
          >
            {heroData.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-muted-foreground font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {heroData.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <GradientButton onClick={scrollToProposal}>
              {heroData.buttonLabel}
            </GradientButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-primary/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Proposal Section */}
      <section id="proposal" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <AnimatedSection className="w-full max-w-lg">
          <GlassCard className="text-center">
            <p className="text-5xl mb-6">💕</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {proposalData.question}
            </h2>

            {(state === "idle" || state === "asking") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mt-8 items-center justify-center"
              >
                <GradientButton onClick={handleYes}>
                  {proposalData.yesLabel}
                </GradientButton>
                <div className="relative">
                  <motion.div
                    animate={{ x: noButtonOffset.x, y: noButtonOffset.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <GradientButton
                      variant="secondary"
                      onMouseEnter={handleNoHover}
                      onTouchStart={handleNoHover}
                      onClick={() => setState("answered_no")}
                    >
                      {proposalData.noLabel}
                    </GradientButton>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {state === "answered_yes" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <p className="text-6xl mb-4">🎉</p>
                <p className="text-foreground text-lg font-sans leading-relaxed">
                  {proposalData.yesResponse}
                </p>
              </motion.div>
            )}

            {state === "answered_no" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mt-8"
              >
                <p className="text-4xl mb-4">🥺</p>
                <p className="text-muted-foreground text-lg font-sans leading-relaxed">
                  {proposalData.noResponse}
                </p>
                <GradientButton onClick={handleYes} className="mt-6">
                  Changed your mind? 💕
                </GradientButton>
              </motion.div>
            )}
          </GlassCard>
        </AnimatedSection>
      </section>

      {/* Journey Timeline */}
      <section className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold gradient-text mb-4">
            Our Journey
          </h2>
          <p className="text-muted-foreground font-sans">
            Every chapter of us, written in the stars
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-bloom-pink/50 via-bloom-coral/30 to-transparent" />

          {timelineData.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.15} className="relative mb-12">
              <div className={`flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-bloom-pink -translate-x-1/2 mt-8 glow-pink z-10" />

                {/* Content */}
                <div className={`ml-14 md:ml-0 ${i % 2 === 0 ? "md:w-1/2 md:pr-12 md:text-right" : "md:w-1/2 md:pl-12 md:ml-auto"}`}>
                  <GlassCard>
                    <span className="text-3xl mb-3 block">{item.emoji}</span>
                    <p className="text-primary font-sans text-sm tracking-wider uppercase mb-1">
                      {item.date}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </GlassCard>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-16 px-6">
        <AnimatedSection>
          <div className="flex gap-6 justify-center mb-8">
            <Link to="/letter" className="text-muted-foreground hover:text-primary transition-colors font-sans text-sm tracking-wider">
              Read My Letter →
            </Link>
          </div>
          <p className="text-muted-foreground/40 font-sans text-xs">
            Made with 💕 for {peopleData.her.shortName}
          </p>
        </AnimatedSection>
      </footer>
    </div>
  );
};

export default Index;
