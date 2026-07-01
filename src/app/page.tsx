"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import {
  Download,
  Mail,
  Monitor,
  HardDrive,
  Code,
  Server,
  Wrench,
  Video,
  Award,
  Layers,
  ChevronRight,
  User,
  GraduationCap,
  Trophy,
  Cpu,
  ArrowUp,
  Phone,
  Brain,
  Utensils,
  MapPin
} from "lucide-react";
import RotatingTitles from "@/components/RotatingTitles";
import Timeline from "@/components/Timeline";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import ContactForm from "@/components/ContactForm";
import TypingCodeWindow from "@/components/TypingCodeWindow";
import ThreeBackground from "@/components/ThreeBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import { SplineScene } from "@/components/ui/splite";

// Custom SVG Icons to replace missing Lucide Brand Icons
const FigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Progress Ring Helper Component
const ProgressRing = ({ progress, strokeColor = "stroke-blue-500" }: { progress: number; strokeColor?: string }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg className="w-10 h-10 transform -rotate-90 select-none">
      <circle cx="20" cy="20" r={radius} className="stroke-zinc-800" strokeWidth="2.5" fill="transparent" />
      <motion.circle
        cx="20"
        cy="20"
        r={radius}
        className={strokeColor}
        strokeWidth="2.5"
        fill="transparent"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
};

// Vector Grid Map Component for Contact background
const VectorMapGrid = () => (
  <div className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden select-none">
    <svg className="w-full h-full text-zinc-800" fill="none" stroke="currentColor" strokeWidth="0.5">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <path d="M100,200 Q250,150 400,250 T700,200 T1000,300" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1.5" strokeDasharray="6,6" />
      <path d="M150,350 Q300,450 500,300 T850,400" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1.5" strokeDasharray="4,4" />
      <circle cx="500" cy="300" r="8" fill="#3b82f6" className="animate-ping opacity-60" />
      <circle cx="500" cy="300" r="5" fill="#3b82f6" />
    </svg>
  </div>
);

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parallax Hero mouse rotate setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMoveHero = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = clientX - window.innerWidth / 2;
    const y = clientY - window.innerHeight / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeaveHero = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll Progress Indicator for Education/Timeline
  const [aboutElement, setAboutElement] = useState<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: aboutElement ? { current: aboutElement } : undefined,
    offset: ["start end", "end end"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Scroll Progress Indicator for Achievements/Timeline
  const [achievementsElement, setAchievementsElement] = useState<HTMLDivElement | null>(null);
  const { scrollYProgress: achievementsScrollY } = useScroll({
    target: achievementsElement ? { current: achievementsElement } : undefined,
    offset: ["start end", "end end"]
  });
  const achievementsLineHeight = useTransform(achievementsScrollY, [0, 1], ["0%", "100%"]);

  // Scroll-linked animations for individual achievement rows
  const [ach1Element, setAch1Element] = useState<HTMLDivElement | null>(null);
  const { scrollYProgress: ach1Scroll } = useScroll({
    target: ach1Element ? { current: ach1Element } : undefined,
    offset: ["start end", "center center"]
  });
  const ach1X = useTransform(ach1Scroll, [0, 1], [-150, 0]);
  const ach1Opacity = useTransform(ach1Scroll, [0.2, 0.8], [0, 1]);

  const [ach2Element, setAch2Element] = useState<HTMLDivElement | null>(null);
  const { scrollYProgress: ach2Scroll } = useScroll({
    target: ach2Element ? { current: ach2Element } : undefined,
    offset: ["start end", "center center"]
  });
  const ach2X = useTransform(ach2Scroll, [0, 1], [150, 0]);
  const ach2Opacity = useTransform(ach2Scroll, [0.2, 0.8], [0, 1]);

  const [ach3Element, setAch3Element] = useState<HTMLDivElement | null>(null);
  const { scrollYProgress: ach3Scroll } = useScroll({
    target: ach3Element ? { current: ach3Element } : undefined,
    offset: ["start end", "center center"]
  });
  const ach3X = useTransform(ach3Scroll, [0, 1], [-150, 0]);
  const ach3Opacity = useTransform(ach3Scroll, [0.2, 0.8], [0, 1]);

  const skillsData = [
    {
      category: "UI / UX",
      icon: <FigmaIcon className="h-5 w-5 text-violet-400" />,
      skills: [
        { name: "Figma", level: 90 },
        { name: "Auto Layout", level: 85 },
        { name: "Components", level: 88 },
        { name: "Variants", level: 85 },
        { name: "Wireframing", level: 92 },
        { name: "Responsive Design", level: 90 },
        { name: "Prototyping", level: 87 }
      ],
      glow: "group-hover:border-violet-500/30",
      stroke: "stroke-violet-500"
    },
    {
      category: "Frontend",
      icon: <Code className="h-5 w-5 text-blue-400" />,
      skills: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 88 },
        { name: "React.js", level: 85 },
        { name: "Next.js", level: 82 },
        { name: "Tailwind CSS", level: 90 }
      ],
      glow: "group-hover:border-blue-500/30",
      stroke: "stroke-blue-500"
    },
    {
      category: "Programming",
      icon: <Monitor className="h-5 w-5 text-emerald-400" />,
      skills: [
        { name: "Python", level: 85 },
        { name: "Java", level: 80 },
        { name: "C", level: 80 },
        { name: "C++", level: 75 },
        { name: "SQL", level: 82 },
        { name: "TypeScript", level: 80 },
        { name: "Django", level: 85 },
        { name: "Eclipse IDE", level: 75 }
      ],
      glow: "group-hover:border-emerald-500/30",
      stroke: "stroke-emerald-500"
    },
    {
      category: "System Administration",
      icon: <Server className="h-5 w-5 text-orange-400" />,
      skills: [
        { name: "Ubuntu", level: 80 },
        { name: "TrueNAS", level: 85 },
        { name: "RAID", level: 80 },
        { name: "NAS Deployment", level: 85 },
        { name: "User Permission", level: 90 },
        { name: "Linux", level: 82 }
      ],
      glow: "group-hover:border-orange-500/30",
      stroke: "stroke-orange-500"
    },
    {
      category: "Hardware",
      icon: <Wrench className="h-5 w-5 text-pink-400" />,
      skills: [
        { name: "PC Building", level: 95 },
        { name: "BIOS Configuration", level: 90 },
        { name: "Driver Installation", level: 92 },
        { name: "System Optimization", level: 88 },
        { name: "Hardware Integration", level: 85 }
      ],
      glow: "group-hover:border-pink-500/30",
      stroke: "stroke-pink-500"
    },
    {
      category: "Creative",
      icon: <Video className="h-5 w-5 text-rose-400" />,
      skills: [
        { name: "Premiere Pro", level: 85 },
        { name: "After Effects", level: 78 },
        { name: "CapCut", level: 90 }
      ],
      glow: "group-hover:border-rose-500/30",
      stroke: "stroke-rose-500"
    }
  ];

  const projectsData = [
    {
      title: "Lung Cancer Classification using Explainable AI",
      category: "Explainable AI (XAI)",
      description:
        "Developed a deep learning model to classify NSCLC histopathology images into Adenocarcinoma, Squamous Cell Carcinoma, and Benign categories while providing explainable AI visualizations using LIME and Grad-CAM.",
      longDescription: "This research project utilizes deep learning convolutional networks to classify histology tiles while utilizing LIME superpixel perturbations and Grad-CAM activation mapping gradients. The visual interface highlights exact cells and tissue patterns driving predictions, bringing transparent interpretability to computer-aided medical diagnostics.",
      technologies: ["Python", "PyTorch", "ResNet50", "OpenCV", "LIME", "Grad-CAM"],
      icon: <Server className="h-5 w-5" />,
      gradient: "from-blue-600 to-indigo-600",
      githubUrl: "https://github.com/tsraghul",
      demoUrl: "https://github.com/tsraghul"
    },
    {
      title: "Thought Capsule with AI Integration",
      category: "AI Web Application",
      description:
        "Built an AI-powered digital journaling platform capable of analyzing 10+ emotions with AI-powered summarization and sentiment detection.",
      longDescription: "Thought Capsule is a highly responsive AI-assisted journaling application. Built with security and user experience in mind, it provides sentiment analysis across ten distinct emotion classes. Features include automatic journaling summaries, emotion charts, secure user session management, and granular search filters.",
      technologies: ["Django", "SQLite", "JavaScript", "HTML", "CSS"],
      icon: <Brain className="h-5 w-5" />,
      gradient: "from-purple-600 to-indigo-600",
      githubUrl: "https://github.com/tsraghul",
      demoUrl: "https://github.com/tsraghul"
    },
    {
      title: "Simplicook",
      category: "Full Stack Web",
      description:
        "Built a recipe management platform supporting 30+ recipes with nutritional information, preparation time, serving size, and advanced multi-criteria filtering.",
      longDescription: "Simplicook is a full-featured recipe directory and culinary manager. It includes nutritional breakdown, serving size adjusters, and complex search functionality to filter recipes by ingredients, prep time, and difficulty. Utilizes a Django REST Framework backend coupled with React for real-time reactivity.",
      technologies: ["React", "Tailwind CSS", "Django REST Framework", "SQLite"],
      icon: <Utensils className="h-5 w-5" />,
      gradient: "from-rose-600 to-red-600",
      githubUrl: "https://github.com/tsraghul",
      demoUrl: "https://github.com/tsraghul"
    }
  ];

  const certifications = [
    { title: "Python", issuer: "GUVI with HCL & Google" },
    { title: "Problem Solving", issuer: "HackerRank" },
    { title: "Front-End Forensics", issuer: "INTECHO" },
    { title: "Firmware Frenzy", issuer: "INTECHO" },
    { title: "Figma Fest", issuer: "Design Fest" },
    { title: "DEFUSION", issuer: "Defusion" },
    { title: "SOLIDWORKS", issuer: "Dassault Systèmes" },
    { title: "160 Days DSA", issuer: "GeeksforGeeks" }
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-blue-500/30 selection:text-white">
      
      {/* 3D Particle background and glows */}
      <ThreeBackground />

      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/75 backdrop-blur-md border-b border-zinc-900/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#home" className="text-white font-mono font-bold tracking-widest text-sm cursor-pointer">
            T.S.RAGHUL<span className="text-blue-500">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            <a href="#about" className="hover:text-white transition-colors cursor-pointer">About</a>
            <a href="#skills" className="hover:text-white transition-colors cursor-pointer">Skills</a>
            <a href="#contributions" className="hover:text-white transition-colors cursor-pointer">Engagements</a>
            <a href="#projects" className="hover:text-white transition-colors cursor-pointer">Projects</a>
            <a href="#achievements" className="hover:text-white transition-colors cursor-pointer">Achievements</a>
            <a href="#certifications" className="hover:text-white transition-colors cursor-pointer">Certifications</a>
            <a href="#contact" className="hover:text-white transition-colors cursor-pointer">Contact</a>
          </nav>
          <a
            href="#contact"
            className="px-4 py-2 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer"
          >
            Get In Touch
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        onMouseMove={handleMouseMoveHero}
        onMouseLeave={handleMouseLeaveHero}
        style={{ perspective: "1000px" }}
        className="relative min-h-screen flex items-center pt-24 px-6 z-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/30 text-xs font-mono tracking-widest uppercase text-zinc-400"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Open for Engagements
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="space-y-2"
            >
              <span className="text-zinc-450 font-mono tracking-wider text-sm sm:text-base">Hi, I'm</span>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white font-heading">
                T. S. Raghul
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <RotatingTitles />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg font-mono text-zinc-400 tracking-wide uppercase max-w-md pt-2"
            >
              From Concept to Code — I Make It Happen
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-6"
            >
              <a
                href="#projects"
                className="px-8 py-4 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold transition-all shadow-lg shadow-white/5 cursor-pointer text-center text-sm"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold transition-all cursor-pointer text-center text-sm"
              >
                Contact Me
              </a>
              <a
                href="/resume.pdf"
                download="T_S_Raghul_Resume.pdf"
                className="flex items-center gap-2 px-6 py-4 rounded-full border border-zinc-800/80 hover:bg-zinc-900/40 text-zinc-400 hover:text-white transition-colors text-sm cursor-pointer"
              >
                <span>Resume</span>
                <Download className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Spline Scene */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="lg:col-span-6 w-full h-[350px] sm:h-[450px] lg:h-[500px] relative rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950/20 backdrop-blur-md flex items-center justify-center"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              onLoad={(splineApp) => {
                console.log("Spline loaded successfully!");
                try {
                  const leftArm = splineApp.findObjectByName("LEFT");
                  const forearm = splineApp.findObjectByName("forearm");
                  
                  if (leftArm && forearm) {
                    const initArmRot = { x: leftArm.rotation.x, y: leftArm.rotation.y, z: leftArm.rotation.z };
                    const initForearmRot = { x: forearm.rotation.x, y: forearm.rotation.y, z: forearm.rotation.z };
                    
                    let startTime: number | null = null;
                    const duration = 2800; // 2.8 seconds wave animation
                    
                    const animateWave = (timestamp: number) => {
                      if (!startTime) startTime = timestamp;
                      const elapsed = timestamp - startTime;
                      
                      if (elapsed < duration) {
                        if (elapsed < 600) {
                          // Phase 1: Lift arm (0ms to 600ms)
                          const progress = elapsed / 600;
                          leftArm.rotation.z = initArmRot.z + progress * (-1.0);
                          leftArm.rotation.x = initArmRot.x + progress * 0.2;
                        } else if (elapsed < 2200) {
                          // Phase 2: Wave forearm back and forth (600ms to 2200ms)
                          leftArm.rotation.z = initArmRot.z - 1.0;
                          leftArm.rotation.x = initArmRot.x + 0.2;
                          
                          const waveTime = (elapsed - 600) / 1000 * Math.PI * 4; // 2 full waves
                          forearm.rotation.y = initForearmRot.y + Math.sin(waveTime) * 0.5;
                        } else {
                          // Phase 3: Lower arm back (2200ms to 2800ms)
                          const progress = (elapsed - 2200) / 600;
                          leftArm.rotation.z = initArmRot.z - (1.0 - progress * 1.0);
                          leftArm.rotation.x = initArmRot.x + (0.2 - progress * 0.2);
                          forearm.rotation.y = initForearmRot.y + (forearm.rotation.y - initForearmRot.y) * (1 - progress);
                        }
                        requestAnimationFrame(animateWave);
                      } else {
                        // Reset to exact initial values
                        leftArm.rotation.x = initArmRot.x;
                        leftArm.rotation.y = initArmRot.y;
                        leftArm.rotation.z = initArmRot.z;
                        forearm.rotation.x = initForearmRot.x;
                        forearm.rotation.y = initForearmRot.y;
                        forearm.rotation.z = initForearmRot.z;
                      }
                    };
                    
                    // Trigger wave animation after a 1.2s delay to let the initial page entry load settle
                    setTimeout(() => {
                      requestAnimationFrame(animateWave);
                    }, 1200);
                  }
                } catch (err) {
                  console.log("Error running wave animation:", err);
                }
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" ref={setAboutElement} className="py-32 px-6 border-t border-zinc-900/40 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Col: Text summary & metrics counters */}
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-500 block">
                Biography
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading">
                About Me
              </h2>
              <div className="h-1 w-12 bg-blue-500 rounded" />
            </div>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-light">
              I am a <strong className="text-white font-semibold">Computer Science Engineering</strong> student passionate about designing beautiful digital experiences and developing modern applications. I hold a strong interest in UI/UX, Frontend Development, DevOps, Cloud, AI, and Hardware Architecture.
            </p>

            {/* Metric Counters Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md">
                <span className="text-3xl sm:text-4xl font-extrabold text-white block">
                  <AnimatedCounter value={5} suffix="+" />
                </span>
                <span className="text-xs uppercase tracking-widest font-mono text-zinc-500 mt-2 block">
                  Projects Completed
                </span>
              </div>
              <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md">
                <span className="text-3xl sm:text-4xl font-extrabold text-white block">
                  <AnimatedCounter value={3} suffix="+" />
                </span>
                <span className="text-xs uppercase tracking-widest font-mono text-zinc-500 mt-2 block">
                  Competition Awards
                </span>
              </div>
              <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md">
                <span className="text-3xl sm:text-4xl font-extrabold text-white block">
                  <AnimatedCounter value={30} suffix="+" />
                </span>
                <span className="text-xs uppercase tracking-widest font-mono text-zinc-500 mt-2 block">
                  Skills Gained
                </span>
              </div>
              <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block uppercase tracking-wider font-heading">
                  Fresher
                </span>
                <span className="text-xs uppercase tracking-widest font-mono text-zinc-500 mt-3 block">
                  Years Experience
                </span>
              </div>
            </div>
          </div>

          {/* Right Col: Timeline & Education (Scroll reveal line) */}
          <div className="lg:col-span-6 relative pl-8 md:pl-12">
            
            {/* Timeline progress line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-zinc-800" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-0 top-0 w-0.5 bg-blue-500 origin-top"
            />

            <div className="space-y-12">
              <div className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[38px] md:-left-[54px] top-1.5 w-4 h-4 rounded-full border border-blue-500 bg-zinc-950 z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>

                <div className="p-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                    Education Timeline
                  </span>
                  <h3 className="text-xl font-bold text-zinc-200 mt-2 font-heading leading-snug">
                    Bachelor of Engineering (CSE)
                  </h3>
                  <h4 className="text-sm font-semibold text-zinc-400 mt-1 uppercase tracking-wider font-mono">
                    SRM Valliammai Engineering College
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">2023 - Expected 2027</p>

                  <div className="flex justify-between items-center border-t border-zinc-900 pt-4 mt-6">
                    <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active Candidate
                    </span>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-500 block">CGPA</span>
                      <span className="text-lg font-bold text-white font-mono">8.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Code window Typing animation */}
            <div className="mt-12">
              <TypingCodeWindow />
            </div>

          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 border-t border-zinc-900/40 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-violet-400 block">
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading">
            Technical Skillset
          </h2>
          <div className="h-1 w-16 bg-violet-500 rounded" />
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.category}
              className={`group p-8 rounded-3xl border border-zinc-850 bg-zinc-900/20 backdrop-blur-md hover:bg-zinc-900/40 transition-all duration-300 ${category.glow}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-zinc-200 group-hover:text-white transition-colors duration-200 font-heading">
                  {category.category}
                </h3>
                <div className="p-2.5 rounded-xl bg-zinc-850/80 border border-zinc-800/60">
                  {category.icon}
                </div>
              </div>

              {/* List of skills with level rings */}
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex justify-between items-center p-2 rounded-xl bg-zinc-950/40 border border-zinc-900/50 hover:border-zinc-800 transition-colors"
                  >
                    <span className="text-xs font-mono text-zinc-400 pl-1">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-500">{skill.level}%</span>
                      <ProgressRing progress={skill.level} strokeColor={category.stroke} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Contributions Section */}
      <section id="contributions" className="py-32 px-6 border-t border-zinc-900/40 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
            Practice & Execution
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading">
            Professional Engagements
          </h2>
          <div className="h-1 w-16 bg-emerald-500 rounded" />
        </div>

        {/* Contributions Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md hover:border-zinc-700/60 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest">
                  Systems Architecture
                </span>
                <Monitor className="h-6 w-6 text-blue-400 animate-pulse" />
              </div>
              
              <h3 className="text-2xl font-bold text-zinc-150 group-hover:text-white transition-colors duration-200 font-heading">
                Infrastructure Engineering
              </h3>
              
              <p className="text-sm text-zinc-400 leading-relaxed pt-2">
                Designed and optimized a professional workstation for architectural rendering and intensive multi-threaded computational workflows.
              </p>

              <div className="space-y-2 pt-4">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Core Responsibilities</h4>
                <ul className="text-xs space-y-1.5 font-mono text-zinc-450 pl-3 list-disc">
                  <li>Hardware Assembly & Layout optimization</li>
                  <li>Firmware & BIOS level tuning</li>
                  <li>Device driver validation and conflict mitigation</li>
                  <li>Performance benchmarking and stress analysis</li>
                  <li>Operating System deployment & automation scripting</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-8 border-t border-zinc-900/70 mt-8">
              {["Hardware Assembly", "BIOS Config", "Driver Install", "System Optimization", "Benchmark"].map((tag) => (
                <span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-950/60 text-zinc-550 border border-zinc-900">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md hover:border-zinc-700/60 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest">
                  Network Storage
                </span>
                <HardDrive className="h-6 w-6 text-violet-400 animate-pulse" />
              </div>
              
              <h3 className="text-2xl font-bold text-zinc-150 group-hover:text-white transition-colors duration-200 font-heading">
                Cloud Infrastructure & Storage
              </h3>
              
              <p className="text-sm text-zinc-400 leading-relaxed pt-2">
                Designed and deployed highly resilient enterprise storage servers using TrueNAS to consolidate local data and backups securely.
              </p>

              <div className="space-y-2 pt-4">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Core Responsibilities</h4>
                <ul className="text-xs space-y-1.5 font-mono text-zinc-450 pl-3 list-disc">
                  <li>Centralized Storage pool design</li>
                  <li>RAID configuration for fault-tolerance</li>
                  <li>Granular User Permission mappings</li>
                  <li>Secure WireGuard Remote Access tunneling</li>
                  <li>Automated snapshot tasks & replication</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-8 border-t border-zinc-900/70 mt-8">
              {["TrueNAS", "RAID Config", "User Permission", "Remote Access", "Network Storage", "Consolidation"].map((tag) => (
                <span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-950/60 text-zinc-550 border border-zinc-900">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 border-t border-zinc-900/40 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-500 block">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading">
            Featured Projects
          </h2>
          <div className="h-1 w-16 bg-blue-500 rounded" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-32 px-6 border-t border-zinc-900/40 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-yellow-400 block">
            Milestones
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading">
            Key Achievements
          </h2>
          <div className="h-1 w-16 bg-yellow-500 rounded mx-auto" />
        </div>

        {/* Vertical Timeline Achievements */}
        <div ref={setAchievementsElement} className="relative max-w-4xl mx-auto py-12 px-4">
          {/* Track Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 -translate-x-1/2" />
          {/* Scroll-linked Animated Progress Line with Gradient */}
          <motion.div
            style={{ height: achievementsLineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-yellow-400 via-violet-500 to-blue-500 origin-top"
            initial={{ height: 0 }}
          />
          
          <div className="space-y-16">
            
            {/* Ach 1 */}
            <div ref={setAch1Element} className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
              <motion.div
                initial={{ scale: 0, opacity: 0, x: "-50%" }}
                whileInView={{ scale: 1, opacity: 1, x: "-50%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="absolute left-8 md:left-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-yellow-500/40 bg-zinc-900 shadow-md"
              >
                <Trophy className="h-5 w-5 text-yellow-400 animate-pulse" />
              </motion.div>
              <motion.div
                style={{ x: ach1X, opacity: ach1Opacity }}
                className="w-full md:w-[45%] pl-16 md:pl-0 md:text-right md:ml-0 md:mr-auto"
              >
                <motion.div 
                  style={{ borderColor: "rgba(39, 39, 42, 0.8)" }}
                  whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(234, 179, 8, 0.4)", boxShadow: "0 15px 30px -10px rgba(234, 179, 8, 0.15)" }}
                  className="p-6 rounded-3xl border bg-zinc-900/20 backdrop-blur-md transition-colors duration-300"
                >
                  <span className="inline-block px-3 py-0.5 rounded-full text-[9px] font-mono bg-zinc-800 text-zinc-350 border border-zinc-700/50">2025</span>
                  <h3 className="text-lg font-bold text-white font-heading mt-2">Firmware Frenzy Winner</h3>
                  <h4 className="text-xs font-semibold text-blue-400 mt-1 uppercase tracking-wider font-mono">INTECHO'25 — MIT Campus, Anna University</h4>
                  <p className="text-xs text-zinc-450 mt-3">Took 1st place in the national firmware engineering competition hosted at Anna University MIT.</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Ach 2 */}
            <div ref={setAch2Element} className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
              <motion.div
                initial={{ scale: 0, opacity: 0, x: "-50%" }}
                whileInView={{ scale: 1, opacity: 1, x: "-50%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="absolute left-8 md:left-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-violet-500/40 bg-zinc-900 shadow-md"
              >
                <Trophy className="h-5 w-5 text-violet-400 animate-pulse" />
              </motion.div>
              <motion.div
                style={{ x: ach2X, opacity: ach2Opacity }}
                className="w-full md:w-[45%] pl-16 md:pl-0 md:ml-auto md:mr-0 md:text-left"
              >
                <motion.div 
                  style={{ borderColor: "rgba(39, 39, 42, 0.8)" }}
                  whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(139, 92, 246, 0.4)", boxShadow: "0 15px 30px -10px rgba(139, 92, 246, 0.15)" }}
                  className="p-6 rounded-3xl border bg-zinc-900/20 backdrop-blur-md transition-colors duration-300"
                >
                  <span className="inline-block px-3 py-0.5 rounded-full text-[9px] font-mono bg-zinc-800 text-zinc-350 border border-zinc-700/50">2024</span>
                  <h3 className="text-lg font-bold text-white font-heading mt-2">Figma Fest Winner</h3>
                  <h4 className="text-xs font-semibold text-violet-400 mt-1 uppercase tracking-wider font-mono">UI/UX Prototyping Challenge</h4>
                  <p className="text-xs text-zinc-450 mt-3">Awarded 1st place for delivering intuitive responsive mobile layouts and complex interactive components under tight deadlines.</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Ach 3 */}
            <div ref={setAch3Element} className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
              <motion.div
                initial={{ scale: 0, opacity: 0, x: "-50%" }}
                whileInView={{ scale: 1, opacity: 1, x: "-50%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="absolute left-8 md:left-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-blue-500/40 bg-zinc-900 shadow-md"
              >
                <Trophy className="h-5 w-5 text-blue-400 animate-pulse" />
              </motion.div>
              <motion.div
                style={{ x: ach3X, opacity: ach3Opacity }}
                className="w-full md:w-[45%] pl-16 md:pl-0 md:text-right md:ml-0 md:mr-auto"
              >
                <motion.div 
                  style={{ borderColor: "rgba(39, 39, 42, 0.8)" }}
                  whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59, 130, 246, 0.4)", boxShadow: "0 15px 30px -10px rgba(59, 130, 246, 0.15)" }}
                  className="p-6 rounded-3xl border bg-zinc-900/20 backdrop-blur-md transition-colors duration-300"
                >
                  <span className="inline-block px-3 py-0.5 rounded-full text-[9px] font-mono bg-zinc-800 text-zinc-350 border border-zinc-700/50">2024</span>
                  <h3 className="text-lg font-bold text-white font-heading mt-2">DEFUSION Winner</h3>
                  <h4 className="text-xs font-semibold text-blue-400 mt-1 uppercase tracking-wider font-mono">System Hackathon Challenge</h4>
                  <p className="text-xs text-zinc-450 mt-3">Won top place for creating a custom integration dashboard linking software inputs with hardware control variables.</p>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-32 px-6 border-t border-zinc-900/40 relative z-10 max-w-7xl mx-auto overflow-hidden">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-pink-400 block">
            Certifications
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading">
            Certifications
          </h2>
          <div className="h-1 w-16 bg-pink-500 rounded" />
          <p className="text-zinc-500 text-xs font-mono pt-2">← Drag horizontally to navigate →</p>
        </div>

        {/* Draggable Certifications Carousel */}
        <motion.div className="flex gap-4 cursor-grab active:cursor-grabbing w-max pr-12" drag="x" dragConstraints={{ left: -800, right: 0 }}>
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl border border-zinc-900 bg-zinc-900/30 backdrop-blur-md hover:border-pink-500/30 hover:bg-zinc-900/40 transition-all duration-300 w-64 shrink-0 flex flex-col justify-between select-none"
            >
              <Award className="h-8 w-8 text-pink-400 shrink-0" />
              <div className="mt-12">
                <h4 className="text-base font-bold text-zinc-100 font-heading">
                  {cert.title}
                </h4>
                <p className="text-[10px] font-mono text-zinc-500 mt-1.5 uppercase tracking-widest">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Resume Section */}
      <section className="py-32 px-6 border-t border-zinc-900/40 relative z-10 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400 block">
              Curriculum Vitae
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Ready for Download
            </h3>
            <p className="text-zinc-400 text-sm max-w-sm">
              Review my detailed academic achievements, projects, systems training and qualifications.
            </p>
          </div>
          
          <a
            href="/resume.pdf"
            download="T_S_Raghul_Resume.pdf"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold transition-all shadow-lg shadow-white/5 cursor-pointer text-sm"
          >
            <Download className="h-5 w-5" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-zinc-900/40 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative overflow-hidden rounded-3xl p-8 border border-zinc-900 bg-zinc-950/40 backdrop-blur-md">
          
          {/* Custom vector map overlay background */}
          <VectorMapGrid />

          {/* Left Details */}
          <div className="lg:col-span-5 space-y-8 z-10">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-500 block">
                Connectivity
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading">
                Let's Work Together
              </h2>
              <div className="h-1 w-12 bg-blue-500 rounded" />
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              I am open to internships, systems consultation, and collaborative web engineering workflows. Get in touch to discuss details.
            </p>

            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>Chennai, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:raghulsridaran1804@gmail.com" className="hover:text-white transition-colors">
                  raghulsridaran1804@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <a href="tel:+918754501002" className="hover:text-white transition-colors">
                  +91 87545 01002
                </a>
              </div>
              <div className="flex items-center gap-3">
                <LinkedinIcon className="h-4 w-4 text-blue-400" />
                <a href="https://linkedin.com/in/raghulsridaran" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  linkedin.com/in/raghulsridaran
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/tsraghul"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 text-zinc-450 hover:text-white transition-colors"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/raghulsridaran"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 text-zinc-450 hover:text-white transition-colors"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 z-10">
            <ContactForm />
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900/60 py-16 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            © 2026 T. S. Raghul. All rights reserved.
          </p>

          <a
            href="#home"
            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer uppercase tracking-widest"
          >
            <span>Back To Top</span>
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </footer>

      {/* Project details modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />

    </div>
  );
}
