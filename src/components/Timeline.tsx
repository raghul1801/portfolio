"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Star } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  year: string;
}

export default function Timeline() {
  const achievements: TimelineItem[] = [
    {
      id: 1,
      title: "Firmware Frenzy Winner",
      subtitle: "INTECHO'25 — MIT Campus, Anna University",
      description: "Secured 1st place in the prestigious national-level firmware development and debugging hackathon hosted at Anna University MIT Campus.",
      icon: <Trophy className="h-5 w-5 text-yellow-400" />,
      year: "2025",
    },
    {
      id: 2,
      title: "Figma Fest Winner",
      subtitle: "UI/UX Design Competition",
      description: "Won first prize for designing a highly functional and pixel-perfect responsive digital interface within restricted time constraints, emphasizing complex layouts and reusable design systems.",
      icon: <Award className="h-5 w-5 text-violet-400" />,
      year: "2024",
    },
    {
      id: 3,
      title: "DEFUSION Winner",
      subtitle: "Hackathon & Prototyping Challenge",
      description: "Pioneered a system integration product, winning the top prize for creating a working prototype that bridged custom software controls with custom computer hardware config.",
      icon: <Star className="h-5 w-5 text-blue-400" />,
      year: "2024",
    },
  ];

  return (
    <div className="relative max-w-4xl mx-auto py-12 px-4">
      {/* Center connector line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 -translate-x-1/2" />

      <div className="space-y-16">
        {achievements.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              {/* Timeline dot / icon */}
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 bg-zinc-900 shadow-md">
                {item.icon}
              </div>

              {/* Content box */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                  isEven ? "md:text-right md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0 md:text-left"
                }`}
              >
                <div className="relative p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md hover:border-zinc-750 transition-colors duration-300 shadow-xl group">
                  {/* Floating Year badge */}
                  <span className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50 ${
                    isEven ? "md:float-right" : "md:float-left"
                  }`}>
                    {item.year}
                  </span>
                  
                  <div className="clear-both" />

                  <h3 className="text-xl font-bold text-zinc-150 group-hover:text-white transition-colors duration-200 font-sans">
                    {item.title}
                  </h3>
                  
                  <h4 className="text-sm font-semibold text-blue-400 mt-1 uppercase tracking-wider font-mono">
                    {item.subtitle}
                  </h4>
                  
                  <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
