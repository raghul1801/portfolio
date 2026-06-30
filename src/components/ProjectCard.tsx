"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Layers, ShieldCheck, Heart } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  gradient: string;
  longDescription?: string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

export default function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate rotation (-10 to 10 degrees)
    const multiplier = 10;
    const rotateX = -((y - height / 2) / (height / 2)) * multiplier;
    const rotateY = ((x - width / 2) / (width / 2)) * multiplier;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: "1000px",
      }}
      className="w-full cursor-pointer"
    >
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative group h-[380px] w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/60 backdrop-blur-lg flex flex-col justify-between p-8 hover:border-blue-500/50 shadow-2xl transition-all duration-300"
      >
        {/* Animated background gradient spot */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${project.gradient} blur-3xl`}
        />

        {/* Top Header */}
        <div className="flex justify-between items-start z-10">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
              {project.category}
            </span>
            <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors duration-200 font-sans mt-1">
              {project.title}
            </h3>
          </div>
          <div className="p-3 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-300">
            {project.icon}
          </div>
        </div>

        {/* Project Description */}
        <p className="text-zinc-400 text-sm leading-relaxed z-10 mt-4 grow">
          {project.description}
        </p>

        {/* Bottom Metadata & Badges */}
        <div className="flex flex-col gap-4 mt-6 z-10">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-850 text-zinc-300 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-zinc-800/85 pt-4">
            <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Completed
            </span>

            <button className="flex items-center gap-1.5 text-xs text-blue-400 font-mono font-medium group/btn cursor-pointer">
              Explore
              <ExternalLink className="h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
