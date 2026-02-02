"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Decal, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function AvatarMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(THREE.TextureLoader, "/images/avatar.png");

    useFrame((state) => {
        if (!meshRef.current) return;
        // Gentle floating and mouse following logic
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            (state.mouse.x * Math.PI) / 6,
            0.05
        );
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            Math.PI / 2 + (state.mouse.y * Math.PI) / 8, // Base rotation + mouse movement
            0.05
        );
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
                {/* The disc geometry - top/bottom radius, height, segments */}
                <cylinderGeometry args={[2.4, 2.4, 0.2, 64]} />
                <meshStandardMaterial
                    color="#111111"
                    metalness={0.9}
                    roughness={0.1}
                />

                {/* Projecting the avatar onto the circular surface */}
                {/* In a cylinder rotated 90deg on X, the 'top' face is towards the camera */}
                <Decal
                    position={[0, 0.11, 0]} // Offset along the local Y axis (which is now facing Z)
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[4.5, 4.5, 1]}
                    map={texture}
                />

                {/* Outer glowing ring */}
                <mesh position={[0, 0, 0]}>
                    <torusGeometry args={[2.45, 0.05, 16, 100]} />
                    <meshStandardMaterial
                        color="#bc8cf2"
                        emissive="#bc8cf2"
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                </mesh>
            </mesh>
        </Float>
    );
}

export default function AvatarCanvas() {
    return (
        <div className="w-full h-[280px] lg:h-[450px] cursor-grab active:cursor-grabbing">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 35 }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                <pointLight position={[-10, 10, 5]} intensity={2} color="#bc8cf2" />
                <pointLight position={[0, -5, 5]} intensity={1} color="#ff79c6" />

                <React.Suspense fallback={null}>
                    <AvatarMesh />
                </React.Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}
