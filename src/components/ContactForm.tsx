"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFocus = (fieldName: string) => setActiveField(fieldName);
  const handleBlur = (fieldName: string) => {
    if (!formData[fieldName as keyof typeof formData]) {
      setActiveField(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://formsubmit.co/ajax/raghulsridaran1804@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`
        })
      });

      const data = await response.json();

      if (response.ok && data.success === "true") {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("An error occurred. Please check your connection and try again.");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md relative overflow-hidden shadow-2xl">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
          <CheckCircle2 className="h-16 w-16 text-emerald-400 animate-bounce" />
          <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
          <p className="text-zinc-400 text-sm max-w-xs">
            Thank you for reaching out. I will get back to you as soon as possible.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm font-mono transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-zinc-100 font-sans">Send a Message</h3>
            <p className="text-zinc-400 text-xs font-mono">I usually reply within 24 hours.</p>
          </div>

          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              onChange={handleChange}
              className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-200 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all font-sans text-sm"
              placeholder="Name"
            />
            <label
              htmlFor="name"
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm pointer-events-none transition-all duration-200 ${
                activeField === "name" || formData.name
                  ? "top-2 text-[10px] text-blue-400 font-mono translate-y-0"
                  : ""
              }`}
            >
              Your Name
            </label>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              onChange={handleChange}
              className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-200 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all font-sans text-sm"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm pointer-events-none transition-all duration-200 ${
                activeField === "email" || formData.email
                  ? "top-2 text-[10px] text-blue-400 font-mono translate-y-0"
                  : ""
              }`}
            >
              Your Email
            </label>
          </div>

          {/* Message Field */}
          <div className="relative">
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onFocus={() => handleFocus("message")}
              onBlur={() => handleBlur("message")}
              onChange={handleChange}
              className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-200 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all font-sans text-sm resize-none"
              placeholder="Message"
            />
            <label
              htmlFor="message"
              className={`absolute left-4 top-6 -translate-y-1/2 text-zinc-500 text-sm pointer-events-none transition-all duration-200 ${
                activeField === "message" || formData.message
                  ? "top-2 text-[10px] text-blue-400 font-mono translate-y-0"
                  : ""
              }`}
            >
              Your Message
            </label>
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-xs text-rose-400 font-mono bg-rose-950/20 border border-rose-900/30 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
