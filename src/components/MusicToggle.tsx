import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const createAmbientAudio = (audioCtx: AudioContext) => {
  // Create a warm ambient pad using oscillators
  const master = audioCtx.createGain();
  master.gain.value = 0;
  master.connect(audioCtx.destination);

  const nodes: OscillatorNode[] = [];

  // Warm pad chords (Cmaj7 voicing)
  const frequencies = [130.81, 164.81, 196.0, 246.94, 329.63];

  frequencies.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    // Slight detune for warmth
    osc.detune.value = (i - 2) * 4;

    const oscGain = audioCtx.createGain();
    oscGain.gain.value = 0.08 / frequencies.length;

    // Add slow LFO for gentle movement
    const lfo = audioCtx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.05 + i * 0.02;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain);
    lfoGain.connect(oscGain.gain);
    lfo.start();

    osc.connect(oscGain);
    oscGain.connect(master);
    osc.start();

    nodes.push(osc, lfo);
  });

  // Add a sub-bass hum
  const sub = audioCtx.createOscillator();
  sub.type = "sine";
  sub.frequency.value = 65.41;
  const subGain = audioCtx.createGain();
  subGain.gain.value = 0.04;
  sub.connect(subGain);
  subGain.connect(master);
  sub.start();
  nodes.push(sub);

  return { master, nodes };
};

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);

  const toggle = useCallback(() => {
    if (!playing) {
      // Start
      const ctx = new AudioContext();
      const { master, nodes } = createAmbientAudio(ctx);
      audioCtxRef.current = ctx;
      masterRef.current = master;
      nodesRef.current = nodes;

      // Fade in
      master.gain.setTargetAtTime(1, ctx.currentTime, 1.5);
      setPlaying(true);
    } else {
      // Fade out and stop
      const ctx = audioCtxRef.current;
      const master = masterRef.current;
      if (ctx && master) {
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
        setTimeout(() => {
          nodesRef.current.forEach((n) => {
            try { n.stop(); } catch {}
          });
          ctx.close();
          audioCtxRef.current = null;
          masterRef.current = null;
          nodesRef.current = [];
        }, 2000);
      }
      setPlaying(false);
    }
  }, [playing]);

  useEffect(() => {
    return () => {
      nodesRef.current.forEach((n) => {
        try { n.stop(); } catch {}
      });
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50 glass rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform"
      aria-label={playing ? "Pause music" : "Play music"}
      title={playing ? "Pause ambient music" : "Play ambient music"}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-end gap-[3px] h-4"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-primary"
                animate={{ height: ["6px", "16px", "6px"] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.span
            key="paused"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-primary text-lg"
          >
            ♪
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MusicToggle;
