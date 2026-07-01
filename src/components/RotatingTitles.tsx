"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RotatingTitles() {
  const roles = [
    "Computer Science Engineer",
    "UI/UX Designer",
    "Frontend Web Developer",
    "React Developer",
    "Django Developer",
    "System Integration Engineer",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <div className="h-8 sm:h-12 overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-lg sm:text-2xl md:text-3xl font-mono text-blue-400 font-semibold tracking-wider text-center"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
