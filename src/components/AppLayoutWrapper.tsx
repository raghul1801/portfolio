"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import CustomCursor from "./CustomCursor";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      <div
        className={`${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-opacity duration-1000 ease-in-out min-h-screen flex flex-col`}
      >
        {children}
      </div>
    </>
  );
}
