import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl } from "../../services/whatsappService";

const WhatsAppButton = () => {
  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.93 }}
      aria-label="Chat on WhatsApp"
      className="fixed z-[999] flex items-center justify-center rounded-full cursor-pointer
                 bottom-[75px] right-[15px] w-[50px] h-[50px]
                 md:bottom-5  md:right-5  md:w-[58px] md:h-[58px]"
      style={{
        background: "#25D366",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
      }}
    >
      <FaWhatsapp style={{ width: 22, height: 22, color: "#fff" }} />

      {/* Notification dot */}
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 animate-ping opacity-75" />
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500" />
    </motion.a>
  );
};

export default WhatsAppButton;

