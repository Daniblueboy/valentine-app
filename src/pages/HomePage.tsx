import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Send, Sparkles } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";

const HomePage = () => {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

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

  const generatedLink = useMemo(() => {
    const formattedName = formatName(name);
    if (!formattedName) return "";
    const params = `?name=${encodeURIComponent(formattedName)}`;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/valentine${params}`;
  }, [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedName = formatName(name);
    const params = formattedName ? `?name=${encodeURIComponent(formattedName)}` : "";
    navigate(`/valentine${params}`);
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="h-[100dvh] w-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      
      <motion.div
        className="candy-card p-8 md:p-12 max-w-lg w-full text-center relative z-10"
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
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="flex justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-candy-coral" />
            <Heart className="w-12 h-12 text-candy-pink animate-heartbeat" fill="currentColor" />
            <Sparkles className="w-8 h-8 text-candy-coral" />
          </div>
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-5xl text-gradient mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Be My Valentine?
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Create a special message for someone you love 💕
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative">
            <Heart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-candy-pink" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter their name... 💌"
              className="w-full pl-12 pr-4 py-4 rounded-full bg-secondary border-2 border-candy-blush focus:border-candy-pink focus:outline-none focus:ring-4 focus:ring-candy-pink/20 text-foreground text-lg font-medium placeholder:text-muted-foreground/60 transition-all"
            />
          </div>

          <motion.button
            type="submit"
            className="candy-button w-full py-4 text-primary-foreground text-xl font-bold flex items-center justify-center gap-3"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Create My Valentine</span>
            <Send className="w-5 h-5" />
          </motion.button>
        </motion.form>

        {generatedLink && (
          <motion.div
            className="mt-6 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm text-muted-foreground">Share this link</div>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="flex-1 px-4 py-3 rounded-full bg-secondary border-2 border-candy-blush text-foreground text-sm"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="candy-button px-5 py-3 text-primary-foreground font-semibold"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </motion.div>
        )}

        <motion.p
          className="mt-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Share the link and watch the magic happen ✨💞
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HomePage;
