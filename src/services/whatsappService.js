const WHATSAPP_NUMBER = "919632790919";
const DEFAULT_MESSAGE =
  "Hi, I'm interested in KRP Networks plans. Please share details.";

export const getWhatsAppUrl = (message = DEFAULT_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const openWhatsApp = (message) => {
  window.open(getWhatsAppUrl(message), "_blank");
};
