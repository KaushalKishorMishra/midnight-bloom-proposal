import { useCallback } from "react";

const useConfetti = () => {
  const fire = useCallback(async () => {
    const confetti = (await import("canvas-confetti")).default;
    
    const colors = ["#F472B6", "#FB7185", "#FBBF24", "#F9A8D4", "#FCA5A5"];
    
    // Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });
    }, 200);
  }, []);

  return { fire };
};

export default useConfetti;
