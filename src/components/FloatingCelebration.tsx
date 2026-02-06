import { motion } from "framer-motion";

interface FloatingPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  emoji: string;
}

const EMOJIS = ["🎈", "🎉", "🌹", "💖", "💞", "✨", "🌸", "💮", "🩷", "💝"];

const FloatingCelebration = () => {
  const pieces: FloatingPiece[] = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 10 + Math.random() * 8,
    size: 18 + Math.random() * 28,
    opacity: 0.2 + Math.random() * 0.5,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            opacity: piece.opacity,
            fontSize: piece.size,
          }}
          initial={{ y: "110vh", rotate: 0 }}
          animate={{
            y: "-120vh",
            rotate: [0, 15, -15, 10, -10, 0],
            x: [0, 20, -20, 15, -15, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden="true"
        >
          {piece.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCelebration;
