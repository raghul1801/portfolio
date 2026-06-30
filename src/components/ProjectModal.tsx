"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  gradient: string;
  longDescription?: string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
          
          {/* Glass backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header image banner */}
            <div className={`w-full h-48 sm:h-64 relative bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              <Cpu className="h-20 w-20 text-white/20 animate-pulse" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content area (scrollable) */}
            <div className="p-6 sm:p-8 overflow-y-auto grow space-y-6">
              
              {/* Title & Category */}
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono text-blue-400 tracking-widest">
                  {project.category}
                </span>
                <h3 className="text-3xl font-extrabold text-white font-heading">
                  {project.title}
                </h3>
              </div>

              {/* Descriptions */}
              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p className="font-medium text-zinc-200">
                  {project.description}
                </p>
                <p className="text-zinc-400 text-sm">
                  {project.longDescription || 
                    "This digital implementation incorporates system architecture best practices, clean modular logic, and responsive layouts. Built with state-of-the-art frameworks to deliver smooth interactive workflows and maximum optimization."}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-mono text-zinc-500 tracking-wider">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-900">
                <a
                  href={project.githubUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-zinc-800 hover:bg-zinc-900/60 text-zinc-200 font-semibold text-sm transition-colors cursor-pointer"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub Repository</span>
                </a>
                
                <a
                  href={project.demoUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-lg hover:shadow-blue-500/10"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Preview</span>
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
