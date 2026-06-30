import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import AppLayoutWrapper from "@/components/AppLayoutWrapper";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "T. S. Raghul | Portfolio",
  description:
    "From Concept to Code — I Make It Happen. Portfolio of T. S. Raghul, Computer Science Engineering Student, UI/UX Designer, Frontend Developer, and Systems Engineer.",
  keywords: [
    "T. S. Raghul",
    "Raghul",
    "Portfolio",
    "UI/UX Design",
    "Frontend Developer",
    "DevOps",
    "Systems Engineer",
    "Computer Science",
    "TrueNAS",
    "Figma",
  ],
  authors: [{ name: "T. S. Raghul" }],
  openGraph: {
    title: "T. S. Raghul | Portfolio",
    description:
      "From Concept to Code — I Make It Happen. Systems integration, modern UI/UX design, and frontend engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-zinc-950 text-zinc-150 bg-noise selection:bg-blue-500/30 selection:text-white">
        <SmoothScrollProvider>
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
