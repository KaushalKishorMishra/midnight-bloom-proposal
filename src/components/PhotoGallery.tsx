import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import GlassCard from "@/components/GlassCard";
import galleryData from "@/content/gallery.json";

const PhotoGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
      <AnimatedSection className="text-center mb-16">
        <h2 className="font-serif text-3xl md:text-4xl font-bold gradient-text mb-4">
          Our Moments
        </h2>
        <p className="text-muted-foreground font-sans">
          Snapshots of the memories we've made together
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {galleryData.map((item, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedIndex(i)}
              className="cursor-pointer"
            >
              <GlassCard className="p-0 overflow-hidden group">
                <div className="aspect-square bg-gradient-to-br from-[hsl(var(--bloom-pink)/0.15)] via-[hsl(var(--bloom-coral)/0.1)] to-[hsl(var(--bloom-rose)/0.15)] flex flex-col items-center justify-center gap-3 transition-all duration-500 group-hover:from-[hsl(var(--bloom-pink)/0.25)] group-hover:via-[hsl(var(--bloom-coral)/0.2)] group-hover:to-[hsl(var(--bloom-rose)/0.25)]">
                  <span className="text-4xl md:text-5xl">{item.emoji}</span>
                  <p className="text-muted-foreground font-sans text-xs md:text-sm tracking-wider uppercase px-4 text-center">
                    {item.caption}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-6"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <GlassCard className="text-center">
                <div className="aspect-[4/3] bg-gradient-to-br from-[hsl(var(--bloom-pink)/0.15)] via-[hsl(var(--bloom-coral)/0.1)] to-[hsl(var(--bloom-rose)/0.15)] rounded-xl flex flex-col items-center justify-center gap-4 mb-4">
                  <span className="text-6xl md:text-7xl">{galleryData[selectedIndex].emoji}</span>
                  <p className="text-muted-foreground font-sans text-sm">
                    Replace with your photo
                  </p>
                </div>
                <p className="font-serif text-xl text-foreground">
                  {galleryData[selectedIndex].caption}
                </p>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="mt-4 text-muted-foreground hover:text-primary transition-colors text-sm font-sans"
                >
                  Close ✕
                </button>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
