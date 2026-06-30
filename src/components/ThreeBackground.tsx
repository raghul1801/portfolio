"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const coords = new Float32Array(3000); // 1000 points (x, y, z)
    for (let i = 0; i < 3000; i += 3) {
      // Create points in a spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.2 + Math.random() * 0.8; // radius between 1.2 and 2.0
      
      coords[i] = r * Math.sin(phi) * Math.cos(theta);
      coords[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      coords[i + 2] = r * Math.cos(phi);
    }
    return coords;
  });

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -0.5 and 0.5
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = -(e.clientY / window.innerHeight) + 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Auto rotate
      ref.current.rotation.x += delta * 0.05;
      ref.current.rotation.y += delta * 0.08;
      
      // Interpolate rotation towards mouse position for parallax
      ref.current.rotation.x += (mouse.current.y * 0.3 - ref.current.rotation.x) * 0.1;
      ref.current.rotation.y += (mouse.current.x * 0.3 - ref.current.rotation.y) * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-950">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 z-0 bg-noise opacity-[0.03]" />
      
      <Canvas
        camera={{ position: [0, 0, 1.5] }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>

      {/* Aurora Radial Glow Spotlights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[130px] animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-violet-600/10 blur-[150px] animate-pulse duration-[15000ms]" />
      </div>
    </div>
  );
}
