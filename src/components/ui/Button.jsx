import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-accent-500 hover:bg-accent-400 text-white shadow-lg shadow-accent-500/25 hover:shadow-accent-400/40",
  secondary:
    "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm",
  outline:
    "bg-transparent hover:bg-primary-500 text-primary-500 hover:text-white border-2 border-primary-500",
  whatsapp:
    "bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-500/25",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base",
  lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  className = "",
  ...props
}) => {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={baseClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
