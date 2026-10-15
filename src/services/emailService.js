import emailjs from "@emailjs/browser";

// ============================================================
// EmailJS Configuration
// Replace these with your actual EmailJS credentials:
// 1. Create a free account at https://www.emailjs.com/
// 2. Add an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Copy your Service ID, Template ID, and Public Key below
// ============================================================
const SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
const TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";

export const sendEmail = async (formData) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
      },
      PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
};
