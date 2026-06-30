"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function TypingCodeWindow() {
  const codeLines = [
    `// Initializing systems engineering workspace`,
    `import { Workstation, TrueNAS } from "raghul-systems";`,
    ``,
    `const workstation = new Workstation({`,
    `  cpu: "AMD Ryzen",`,
    `  gpu: "NVIDIA RTX",`,
    `  os: "Ubuntu Linux",`,
    `  optimization: "BIOS tuned"`,
    `});`,
    ``,
    `// Designing centralized storage solutions`,
    `const storageServer = new TrueNAS({`,
    `  array: "RAID-Z2",`,
    `  encryption: "AES-256-GCM",`,
    `  permissions: "Secure ACL",`,
    `  remoteAccess: "WireGuard"`,
    `});`,
    ``,
    `await storageServer.deploy();`,
    `console.log("System integration offline ➡️ ONLINE.");`
  ];

  const [typedText, setTypedText] = useState<string[]>(Array(codeLines.length).fill(""));
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    if (currentLineIdx < codeLines.length) {
      const currentLineText = codeLines[currentLineIdx];
      if (currentCharIdx < currentLineText.length) {
        const timer = setTimeout(() => {
          setTypedText((prev) => {
            const next = [...prev];
            next[currentLineIdx] = currentLineText.slice(0, currentCharIdx + 1);
            return next;
          });
          setCurrentCharIdx((prev) => prev + 1);
        }, 15 + Math.random() * 20); // Dynamic typing speeds to mimic human keystrokes
        return () => clearTimeout(timer);
      } else {
        // Move to next line
        const timer = setTimeout(() => {
          setCurrentLineIdx((prev) => prev + 1);
          setCurrentCharIdx(0);
        }, 120); // Pause briefly between lines
        return () => clearTimeout(timer);
      }
    }
  }, [isInView, currentLineIdx, currentCharIdx]);

  // Syntax highlighting parser
  const renderHighlightedLine = (lineText: string, isCurrentTyping: boolean) => {
    if (!lineText) return <span className="inline-block h-4" />;
    
    // Comments
    if (lineText.trim().startsWith("//")) {
      return <span className="text-zinc-500 font-mono italic">{lineText}</span>;
    }

    // Split and highlight keywords, types, strings
    const parts: React.JSX.Element[] = [];
    let currentWord = "";
    let insideString = false;
    let stringChar = "";

    for (let i = 0; i < lineText.length; i++) {
      const char = lineText[i];

      // Handle strings
      if ((char === '"' || char === "'") && (i === 0 || lineText[i - 1] !== "\\")) {
        if (insideString && char === stringChar) {
          // End of string
          parts.push(
            <span key={`str-${i}`} className="text-emerald-400 font-mono">
              {stringChar + currentWord + stringChar}
            </span>
          );
          currentWord = "";
          insideString = false;
        } else if (!insideString) {
          // Start of string
          if (currentWord) {
            parts.push(parseCodeTokens(currentWord, i));
            currentWord = "";
          }
          insideString = true;
          stringChar = char;
        }
        continue;
      }

      if (insideString) {
        currentWord += char;
      } else {
        // Handle token delimiters
        if ([" ", "(", ")", "{", "}", "[", "]", ";", ",", "=", "+", "-", "*", "/", ":"].includes(char)) {
          if (currentWord) {
            parts.push(parseCodeTokens(currentWord, i));
            currentWord = "";
          }
          parts.push(
            <span key={`del-${i}`} className="text-zinc-450 font-mono">
              {char}
            </span>
          );
        } else {
          currentWord += char;
        }
      }
    }

    if (currentWord) {
      if (insideString) {
        parts.push(
          <span key="str-end" className="text-emerald-400 font-mono">
            {stringChar + currentWord}
          </span>
        );
      } else {
        parts.push(parseCodeTokens(currentWord, lineText.length));
      }
    }

    return (
      <span className="font-mono text-zinc-300">
        {parts}
        {isCurrentTyping && (
          <span className="inline-block w-2 h-4 ml-0.5 bg-blue-500 animate-pulse align-middle" />
        )}
      </span>
    );
  };

  const parseCodeTokens = (token: string, keyIdx: number) => {
    const keywords = ["const", "let", "var", "import", "from", "new", "await", "return", "class", "function", "export", "default"];
    const builtins = ["console", "log", "window", "document"];
    const types = ["Workstation", "TrueNAS"];

    if (keywords.includes(token)) {
      return <span key={`key-${keyIdx}`} className="text-pink-400 font-bold font-mono">{token}</span>;
    }
    if (builtins.includes(token)) {
      return <span key={`built-${keyIdx}`} className="text-cyan-400 font-mono">{token}</span>;
    }
    if (types.includes(token)) {
      return <span key={`type-${keyIdx}`} className="text-blue-400 font-semibold font-mono">{token}</span>;
    }
    if (!isNaN(Number(token))) {
      return <span key={`num-${keyIdx}`} className="text-amber-400 font-mono">{token}</span>;
    }
    return <span key={`word-${keyIdx}`} className="text-zinc-200 font-mono">{token}</span>;
  };

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm select-none"
    >
      {/* Window Controls Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-850">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/70" />
          <div className="w-3 h-3 rounded-full bg-amber-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-[10px] tracking-wider text-zinc-500 font-mono">
          systems-integration.ts
        </span>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Editor Content Area */}
      <div className="p-4 sm:p-6 overflow-x-auto min-h-[360px] bg-zinc-950 flex flex-col justify-start">
        {codeLines.map((line, idx) => {
          const isCurrentTyping = idx === currentLineIdx;
          const isPastTyped = idx < currentLineIdx;
          const currentText = isPastTyped ? line : isCurrentTyping ? typedText[idx] : "";

          return (
            <div key={idx} className="flex items-start gap-4 py-0.5 group">
              <span className="w-5 text-right text-[11px] text-zinc-600 select-none font-mono font-medium">
                {idx + 1}
              </span>
              <div className="flex-1 font-mono">
                {renderHighlightedLine(currentText, isCurrentTyping)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
