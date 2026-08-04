import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/data/content";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noopener"
      title="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 1, ease: "backOut" }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-[150] w-[58px] h-[58px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.45)]"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" strokeWidth={0} />
    </motion.a>
  );
}
