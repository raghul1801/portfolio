"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  
  const trailRef = useRef<HTMLDivElement>(null);
  const delay = 0.15; // Delay multiplier for lagging trail
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Listen to all hover targets
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .clickable, [data-hover]'
      );
      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => setHovered(true));
        target.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Add hover listeners and set up mutation observer to bind to dynamic elements
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop for smooth lag
    let animationFrameId: number;
    const animateTrail = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      
      currentPos.current.x += dx * delay;
      currentPos.current.y += dy * delay;

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animateTrail();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Outer Lagging Trail (Neon/Glow Ring) */}
      <div
        ref={trailRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block rounded-full border border-blue-500/40 bg-blue-500/5 mix-blend-screen transition-[width,height,background-color,border-color] duration-300 ease-out ${
          hovered
            ? "h-16 w-16 border-violet-500/80 bg-violet-500/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            : isClicking
            ? "h-6 w-6 border-blue-400 bg-blue-400/20"
            : "h-10 w-10 shadow-[0_0_10px_rgba(59,130,246,0.15)]"
        }`}
        style={{
          transform: `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Inner Dot (Direct Cursor) */}
      <div
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[width,height,background-color] duration-150 ease-out ${
          hovered ? "h-2 w-2 bg-violet-400" : isClicking ? "h-1 w-1 bg-blue-300" : "h-2 w-2"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
