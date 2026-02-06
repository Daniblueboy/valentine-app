import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import YesButton from "@/components/YesButton";
import RunawayButton from "@/components/RunawayButton";
import CelebrationScreen from "@/components/CelebrationScreen";

const ValentinePage = () => {
  const [searchParams] = useSearchParams();
  const formatName = (value: string) =>
    value
      .trim()
      .split(/\s+/)
      .map((word) =>
        word
          .split("-")
          .map((part) =>
            part ? part[0].toUpperCase() + part.slice(1).toLowerCase() : part
          )
          .join("-")
      )
      .join(" ");

  const recipientName = formatName(searchParams.get("name") || "");
  
  const [attempts, setAttempts] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const handleNoAttempt = () => {
    setAttempts((prev) => prev + 1);
  };

  const handleYes = () => {
    setAccepted(true);
  };

  if (accepted) {
    return <CelebrationScreen recipientName={recipientName} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />

      <motion.div
        className="candy-card p-8 md:p-12 max-w-xl w-full text-center relative z-10"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={recipientName}
            className="font-display text-[2rem] text-gradient mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {recipientName ? `Hey ${recipientName}! 💗` : "Hey You! 💗"}
          </motion.h1>
        </AnimatePresence>

        <motion.p
          className="text-xl md:text-2xl text-foreground font-medium mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          I have a very important question... 🌹
        </motion.p>

        <motion.h2
          className="font-display text-[4rem] text-candy-red mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          Will You Be My Valentine?
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 min-h-[120px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <YesButton attempts={attempts} onClick={handleYes} />
          <RunawayButton attempts={attempts} onAttempt={handleNoAttempt} />
        </motion.div>

        {attempts > 0 && (
          <motion.p
            className="mt-8 text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={attempts}
          >
            {attempts === 1 && "Come on, give it a chance! 💗🌹"}
            {attempts === 2 && "The 'Yes' button is growing... just saying 😏💞"}
            {attempts === 3 && "You know you want to click 'Yes'! 🥰✨"}
            {attempts >= 4 && "I'll keep trying! You can't escape love! 💘💖"}
          </motion.p>
        )}

      </motion.div>
    </div>
  );
};

export default ValentinePage;
