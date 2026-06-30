"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 1500; // Total duration in ms
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 800); // Wait for exit animation to finish
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-zinc-950 px-8 py-16 font-sans text-white select-none"
        >
          {/* Logo or Top Header */}
          <div className="w-full max-w-6xl flex justify-between items-center text-xs tracking-[0.2em] text-zinc-500 uppercase">
            <div>T. S. Raghul</div>
            <div>Portfolio 2026</div>
          </div>

          {/* Center Text Reveal */}
          <div className="flex flex-col items-center justify-center">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-6xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 font-sans"
            >
              CONCEPT TO CODE
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-sm tracking-widest text-zinc-400 mt-4 uppercase text-center font-mono"
            >
              Loading Digital Experience
            </motion.p>
          </div>

          {/* Bottom Progress Counter */}
          <div className="w-full max-w-6xl flex justify-between items-end">
            <div className="flex flex-col text-left">
              <span className="text-xs text-zinc-500 uppercase tracking-widest mb-1 font-mono">System Status</span>
              <span className="text-xs text-blue-500 font-mono flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                Initializing Assets...
              </span>
            </div>

            <div className="text-7xl sm:text-9xl font-bold font-mono tracking-tighter text-zinc-100/90 leading-none">
              {progress}
              <span className="text-xl sm:text-3xl font-light text-zinc-500 ml-1">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
