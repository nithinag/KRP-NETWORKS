import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import WhatsAppButton from "../ui/WhatsAppButton";
import ChatBot from "../ui/ChatBot";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="w-full pb-20 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
      <MobileNav />
    </div>
  );
};

export default Layout;
