"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Environment, Float } from "@react-three/drei"
import { useLanguage } from "@/contexts/language-context"

// Simple Birthday Cake Component
function Cake() {
  return (
    <group position={[0, 0, 0]}>
      {/* Cake base (bottom layer) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.5, 32]} />
        <meshStandardMaterial color="#F8BBD0" /> {/* Light pink */}
      </mesh>

      {/* Cake middle layer */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1, 1, 0.5, 32]} />
        <meshStandardMaterial color="#F48FB1" /> {/* Medium pink */}
      </mesh>

      {/* Cake top layer */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
        <meshStandardMaterial color="#EC407A" /> {/* Darker pink */}
      </mesh>

      {/* Cake frosting (top) */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.01, 32]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Candles */}
      <Candle position={[0, 1.25, 0]} color="#FF5252" />
      <Candle position={[0.3, 1.25, 0.3]} color="#7C4DFF" />
      <Candle position={[-0.3, 1.25, 0.3]} color="#FFEB3B" />
      <Candle position={[0.3, 1.25, -0.3]} color="#4CAF50" />
      <Candle position={[-0.3, 1.25, -0.3]} color="#2196F3" />
    </group>
  )
}

// Simple Candle Component
function Candle({ position = [0, 0, 0], color = "#FF5252" }) {
  return (
    <group position={position}>
      {/* Candle body */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Candle wick */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Flame */}
      <mesh position={[0, 0.95, 0]}>
        <coneGeometry args={[0.05, 0.15, 8]} />
        <meshBasicMaterial color="#FFA000" />
      </mesh>
      <pointLight color="#FFA000" intensity={1.5} distance={1} decay={2} position={[0, 0.95, 0]} />
    </group>
  )
}

// Birthday text that floats around the cake
function BirthdayText({ text }: { text: string }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.4}
        color="#FFD700"
        font="/fonts/Geist_Bold.json"
        textAlign="center"
        maxWidth={5}
      >
        {text}
      </Text>
    </Float>
  )
}

// Main scene component
function Scene() {
  const { t } = useLanguage()
  const birthdayText = `${t("home.happy_birthday")} ${t("home.sonu_mama")}!`

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <BirthdayText text={birthdayText} />
      <Cake />
    </>
  )
}

export default function BirthdayAnimation() {
  const [error, setError] = useState(false)

  // Error boundary for 3D content
  useEffect(() => {
    const handleError = () => {
      setError(true)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (error) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎂</div>
          <p className="text-white/80">Birthday Cake Animation</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[60vh] relative">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
