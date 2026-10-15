import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const AnimatedPrice = ({ value, className = "" }) => {
  const spring = useSpring(value, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });
  const display = useTransform(spring, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    spring.set(value);
    prevValue.current = value;
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      setDisplayValue(v);
    });
    return unsubscribe;
  }, [display]);

  return (
    <motion.span
      className={className}
      key="price"
    >
      ₹{displayValue}
    </motion.span>
  );
};

export default AnimatedPrice;
