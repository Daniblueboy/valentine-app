import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface YesButtonProps {
  attempts: number;
  onClick: () => void;
}

const YesButton = ({ attempts, onClick }: YesButtonProps) => {
  // Scale grows with each "No" attempt
  const scale = 1 + attempts * 0.15;
  const fontSize = 18 + attempts * 3;

  return (
    <motion.button
      className="candy-button px-10 py-5 text-primary-foreground flex items-center gap-3"
      onClick={onClick}
      animate={{
        scale: scale,
      }}
      whileHover={{ 
        scale: scale * 1.08,
        rotate: [0, -2, 2, -2, 0],
      }}
      whileTap={{ scale: scale * 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{ fontSize: `${fontSize}px` }}
    >
      <Heart className="animate-heartbeat" fill="currentColor" />
      <span className="font-bold">Yes!</span>
      <Heart className="animate-heartbeat" fill="currentColor" />
    </motion.button>
  );
};

export default YesButton;
