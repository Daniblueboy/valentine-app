import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send, Sparkles } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";

const HomePage = () => {
  const [name, setName] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [recipientWhatsApp, setRecipientWhatsApp] = useState("");
  const [showRecipientShare, setShowRecipientShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkReady, setLinkReady] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

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

  const sanitizePhone = (value: string) => value.replace(/[^\d]/g, "");

  const encodePayload = (payload: { name: string; sender: string }) => {
    const json = JSON.stringify(payload);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  };

  const generatedLink = useMemo(() => {
    const formattedName = formatName(name);
    const sanitizedNumber = sanitizePhone(whatsAppNumber);
    if (!formattedName || !sanitizedNumber) return "";
    const token = encodePayload({ name: formattedName, sender: sanitizedNumber });
    const params = `?t=${encodeURIComponent(token)}`;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/valentine${params}`;
  }, [name, whatsAppNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (name.trim()) setStep(2);
      return;
    }
    if (!generatedLink) return;
    setLinkReady(true);
    setStep(3);
    setShowRecipientShare(false);
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

  const getWhatsAppUrl = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message);
    // Use whatsapp:// protocol for better iOS/Mac compatibility
    // Falls back to wa.me for web browsers
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile
      ? `whatsapp://send?phone=${phone}&text=${encodedMessage}`
      : `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  const handleShareToRecipient = () => {
    if (!generatedLink) return;
    const recipientNumber = sanitizePhone(recipientWhatsApp);
    if (!recipientNumber) return;
    const message = `I made something special for you 💌 ${generatedLink}`;
    window.open(getWhatsAppUrl(recipientNumber, message), "_blank", "noreferrer");
  };

  return (
    <div className="h-[100dvh] w-screen flex items-center justify-center p-4 relative overflow-hidden small-screen-scroll">
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
          className="font-display text-4xl md:text-5xl text-gradient mb-4 home-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Be My Valentine?
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg mb-8 home-subtitle"
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
          {step === 1 && (
            <>
              <div className="relative">
                <Heart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-candy-pink" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setLinkReady(false);
                    setShowRecipientShare(false);
                    setRecipientWhatsApp("");
                  }}
                  placeholder="Enter their name... 💌"
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-secondary border-2 border-candy-blush focus:border-candy-pink focus:outline-none focus:ring-4 focus:ring-candy-pink/20 text-foreground text-lg font-medium placeholder:text-muted-foreground/60 transition-all"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Enter your partner’s name so the message feels personal.
              </p>
              <motion.button
                type="button"
                onClick={() => name.trim() && setStep(2)}
                className="candy-button w-full py-4 text-primary-foreground text-xl font-bold flex items-center justify-center gap-3"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Next</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="relative">
                <input
                  type="tel"
                  value={whatsAppNumber}
                  onChange={(e) => {
                    setWhatsAppNumber(e.target.value);
                    setLinkReady(false);
                    setShowRecipientShare(false);
                    setRecipientWhatsApp("");
                  }}
                  placeholder="Your WhatsApp number (e.g., +2348012345678)"
                  className="w-full px-4 py-4 rounded-full bg-secondary border-2 border-candy-blush focus:border-candy-pink focus:outline-none focus:ring-4 focus:ring-candy-pink/20 text-foreground text-lg font-medium placeholder:text-muted-foreground/60 placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base transition-all"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Important:</span> Include your country code (e.g., +234 for Nigeria) so their sweet "yes" can find its way back to you. 💞
              </p>
              <motion.button
                type="submit"
                onClick={() => {
                  if (!generatedLink) return;
                  setLinkReady(true);
                  setStep(3);
                }}
                className="candy-button w-full py-4 text-primary-foreground text-xl font-bold flex items-center justify-center gap-3"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Create My Valentine</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </>
          )}
        </motion.form>

        {step === 3 && linkReady && generatedLink && (
          <motion.div
            className="mt-6 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm text-muted-foreground">Share this link</div>
            {!showRecipientShare && (
              <div className="space-y-3">
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
                <button
                  type="button"
                  onClick={() => setShowRecipientShare(true)}
                  className="candy-button w-full px-5 py-3 text-primary-foreground font-semibold"
                >
                  Share to Recipient
                </button>
              </div>
            )}
            {showRecipientShare && (
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="tel"
                  value={recipientWhatsApp}
                  onChange={(e) => setRecipientWhatsApp(e.target.value)}
                  placeholder="Recipient WhatsApp (e.g., +2348012345678)"
                  className="flex-1 px-4 py-3 rounded-full bg-secondary border-2 border-candy-blush text-foreground text-sm placeholder:text-muted-foreground/60 placeholder:text-xs sm:placeholder:text-sm"
                />
                <button
                  type="button"
                  onClick={handleShareToRecipient}
                  className="candy-button px-5 py-3 text-primary-foreground font-semibold"
                >
                  Send Link
                </button>
              </div>
            )}
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
