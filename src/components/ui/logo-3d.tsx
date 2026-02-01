"use client";

import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function Model(props: any) {
  // Load the GLB file. Ensure NavSwap.glb is in the public folder.
  const { scene } = useGLTF("/NavSwap.glb");
  const meshRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const lastTheme = useRef(theme);
  const spinVelocity = useRef(0);

  useEffect(() => {
    if (theme !== lastTheme.current) {
      spinVelocity.current = 20; // High initial velocity for quick spin
      lastTheme.current = theme;
    }
  }, [theme]);

  // Add slow continuous rotation + fast spin on theme change
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Decay the spin velocity
      spinVelocity.current = THREE.MathUtils.lerp(spinVelocity.current, 0, delta * 2);
      
      // Base speed (0.5) + spin velocity
      meshRef.current.rotation.y += delta * (0.5 + spinVelocity.current);
    }
  });

  return (
    <group ref={meshRef} {...props} dispose={null}>
      {/* Adjust scale and position as needed based on the model's native size */}
      <primitive object={scene} scale={2} position={[0, -0.5, 0]} />
    </group>
  );
}

interface Logo3DProps {
  className?: string;
  onClick?: () => void;
}

export default function Logo3D({ className, onClick }: Logo3DProps) {
  return (
    <div className={className} onClick={onClick}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Model />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/NavSwap.glb");
