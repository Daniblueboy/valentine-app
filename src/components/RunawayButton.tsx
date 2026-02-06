import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface RunawayButtonProps {
  attempts: number;
  onAttempt: () => void;
}

const noTexts = [
  "No",
  "Are you sure?",
  "Think again...",
  "Wait, I think you misclicked",
  "The 'Yes' button is right there!",
  "Okay, now you're just being mean 😢",
  "Please? 🥺",
  "I'll be sad forever 💔",
];

const RunawayButton = ({ attempts, onAttempt }: RunawayButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const prefersHover =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(hover: hover)").matches;

  const runAway = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    onAttempt();
    
    // Calculate random position within viewport bounds (keep button visible)
    const paddingX = 48;
    const paddingY = 64;
    const maxX = Math.max(0, window.innerWidth / 2 - paddingX);
    const maxY = Math.max(0, window.innerHeight / 2 - paddingY);

    const newX = (Math.random() * 2 - 1) * maxX;
    const newY = (Math.random() * 2 - 1) * maxY;
    
    setPosition({ x: newX, y: newY });
    
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, onAttempt]);

  const runAwaySequence = useCallback(() => {
    runAway();
    if (prefersHover) return;
    // On touch devices, nudge a few extra times for a "dancing" effect
    setTimeout(runAway, 250);
    setTimeout(runAway, 500);
  }, [prefersHover, runAway]);

  const buttonText = noTexts[Math.min(attempts, noTexts.length - 1)];
  
  // Shrink button as attempts increase
  const scale = Math.max(0.5, 1 - attempts * 0.08);

  return (
    <motion.button
      className="px-8 py-4 rounded-full bg-muted text-muted-foreground font-semibold text-lg shadow-lg transition-colors hover:bg-muted/80"
      animate={{
        x: position.x,
        y: position.y,
        scale: scale,
      }}
      whileHover={{ scale: scale * 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      onMouseEnter={runAway}
      onClick={runAwaySequence}
      onTouchStart={runAwaySequence}
    >
      {buttonText}
    </motion.button>
  );
};

export default RunawayButton;
