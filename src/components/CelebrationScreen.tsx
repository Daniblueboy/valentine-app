import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import FloatingCelebration from "@/components/FloatingCelebration";

interface CelebrationScreenProps {
  recipientName: string;
  senderNumber?: string;
}

const CelebrationScreen = ({ recipientName, senderNumber }: CelebrationScreenProps) => {
  const hasPlayed = useRef(false);
  const selectedSong = useRef(
    [
      { id: "450p7goxZqg", title: "All of Me - John Legend" },
      { id: "2Vv-BfVoq4g", title: "Perfect - Ed Sheeran" },
      { id: "UfcAVejslrU", title: "A Thousand Years - Christina Perri" },
      { id: "lp-EO5I60KA", title: "Thinking Out Loud - Ed Sheeran" },
      { id: "nfWlot6h_JM", title: "Say You Won't Let Go - James Arthur" },
      { id: "RT8dNkD3pYU", title: "Make You Feel My Love - Adele" },
      { id: "qN4ooNx77u0", title: "Die With A Smile - Lady Gaga & Bruno Mars" },
      { id: "Mgfe5tIwOj0", title: "Marry You - Bruno Mars" },
      { id: "e_S9VvJM1PI", title: "Mirrors - Justin Timberlake" },
      { id: "fLexgOxsZu0", title: "All Of Me - John Legend (Live)" },
    ][Math.floor(Math.random() * 10)]
  );
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    // Initial burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#f43f5e", "#fb7185", "#fda4af", "#fecdd3"],
    });

    // Continuous celebration
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ec4899", "#f43f5e", "#fb7185"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ec4899", "#f43f5e", "#fb7185"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Fireworks
    const fireworkInterval = setInterval(() => {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
        colors: ["#ec4899", "#f43f5e", "#fb7185", "#fda4af", "#ff6b9d"],
      });
    }, 800);

    setTimeout(() => clearInterval(fireworkInterval), 6000);
  }, []);

  const getWhatsAppUrl = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message);
    // Use whatsapp:// protocol for better iOS/Mac compatibility
    // Falls back to wa.me for web browsers
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile
      ? `whatsapp://send?phone=${phone}&text=${encodedMessage}`
      : `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-start justify-center z-50 px-4 py-6 md:py-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-celebration" />
      <FloatingCelebration />
      
      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto pt-4 md:pt-6 celebration-fit"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.3,
        }}
      >
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 drop-shadow-lg whitespace-nowrap"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          I Knew You'd Say Yes!
        </motion.h1>
        {/*
        <motion.p
          className="text-candy-cream/90 text-lg md:text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Today is all hearts, roses, and forever vibes. 🥀✨
        </motion.p>
        */}

        <motion.div
          className="flex justify-center gap-2 mb-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="w-10 h-10 text-candy-cream fill-candy-cream animate-heartbeat"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </motion.div>

        <motion.p
          className="text-2xl md:text-3xl text-candy-cream font-body mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {recipientName ? `${recipientName}, you` : "You"} just made me the happiest person in the world! 💕🌹
        </motion.p>

        <motion.div
          className="bg-card/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/70 mt-1 md:mt-2 -translate-y-8 md:-translate-y-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-foreground/70 text-lg mb-4">
            🎵 Our love playlist is playing... 💞
          </p>
          <div className="aspect-video max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedSong.current.id}?autoplay=1&mute=0&loop=1&playlist=${selectedSong.current.id}&rel=0&playsinline=1${origin ? `&origin=${encodeURIComponent(origin)}` : ""}`}
              title={`Love Song - ${selectedSong.current.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>
          <p className="text-foreground/60 text-sm mt-3">
            If it doesn’t start, tap play. 🎶
          </p>
        </motion.div>

        {senderNumber && (
          <motion.a
            href={getWhatsAppUrl(
              senderNumber,
              "Yes, I'd be your Valentine! 💕"
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-full bg-white text-candy-red font-semibold shadow-lg hover:bg-white/90 transition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35 }}
          >
            Send Your Response 💌
          </motion.a>
        )}

        <motion.p
          className="mt-10 text-candy-cream/70 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Can't wait to celebrate with you!
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default CelebrationScreen;
