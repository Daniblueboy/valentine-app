import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FloatingItem {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  kind: "heart" | "rose" | "love";
}

const FloatingHearts = () => {
  const hearts: FloatingItem[] = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6,
    size: 16 + Math.random() * 32,
    opacity: 0.2 + Math.random() * 0.4,
    kind: Math.random() > 0.45 ? "heart" : Math.random() > 0.5 ? "rose" : "love",
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={`absolute ${
            heart.kind === "rose" ? "text-rose-500" : heart.kind === "love" ? "text-candy-rose" : "text-candy-pink"
          }`}
          style={{
            left: `${heart.x}%`,
            opacity: heart.opacity,
          }}
          initial={{ y: "100vh", rotate: 0 }}
          animate={{
            y: "-100vh",
            rotate: [0, 15, -15, 10, -10, 0],
            x: [0, 30, -30, 20, -20, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {heart.kind === "heart" ? (
            <Heart
              size={heart.size}
              fill="currentColor"
              className="drop-shadow-lg"
            />
          ) : heart.kind === "rose" ? (
            <span
              className="drop-shadow-lg"
              style={{ fontSize: heart.size }}
              aria-hidden="true"
            >
              🌹
            </span>
          ) : (
            <span
              className="drop-shadow-lg"
              style={{ fontSize: heart.size }}
              aria-hidden="true"
            >
              💖
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
