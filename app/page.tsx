"use client"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { useLanguage } from "@/contexts/language-context"
import confetti from "canvas-confetti"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const confettiIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate loading and initialize animations
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Set a timeout to simulate loading and ensure all resources are ready
      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      // Start animations after loading
      const confettiTimer = setTimeout(() => {
        setShowConfetti(true)
        try {
          launchConfetti()
        } catch (error) {
          console.error("Error launching confetti:", error)
        }
      }, 1500)

      const fireworksTimer = setTimeout(() => {
        setShowFireworks(true)
      }, 2500)

      return () => {
        clearTimeout(loadingTimer)
        clearTimeout(confettiTimer)
        clearTimeout(fireworksTimer)
        if (confettiIntervalRef.current) {
          clearInterval(confettiIntervalRef.current)
        }
      }
    }
  }, [])

  // Fix the confetti function to handle errors gracefully
  const launchConfetti = () => {
    try {
      const duration = 5 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      confettiIntervalRef.current = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          if (confettiIntervalRef.current) {
            clearInterval(confettiIntervalRef.current)
            confettiIntervalRef.current = null
          }
          return
        }

        const particleCount = 50 * (timeLeft / duration)

        // Since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          }),
        )
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          }),
        )
      }, 250)
    } catch (error) {
      console.error("Error launching confetti:", error)
      // Continue without confetti if there's an error
    }
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">{t("loading.title") || "Loading..."}</h2>
            <p className="text-white/70">{t("loading.message") || "Preparing birthday celebration"}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      <Navbar />

      {/* Improve mobile layout */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
        {/* Animated Birthday Cake - hide on very small screens */}
        <div className="absolute w-full h-full pointer-events-none hidden sm:block">
          <AnimatedCake />
        </div>

        {/* Fireworks - reduce on mobile */}
        {showFireworks && (
          <div className="absolute inset-0 pointer-events-none">
            <Fireworks />
          </div>
        )}

        {/* Balloons - reduce on mobile */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Balloons />
        </div>

        {/* Main Content - ensure it's visible on all devices */}
        <div className="relative z-10 text-center mb-12 px-4">
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-yellow-500 mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t("home.happy_birthday")}
            </motion.h1>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {t("home.sonu_mama")}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-yellow-400 to-rose-400 opacity-75 blur"></div>
              <div className="relative px-4 sm:px-6 py-6 sm:py-8 bg-black/30 backdrop-blur-sm rounded-lg">
                <div className="flex justify-center space-x-4 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-yellow-400"
                      initial={{ y: 0 }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90">{t("home.celebration")}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
        >
          <Button
            onClick={() => router.push("/memories")}
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full"
          >
            {t("home.explore_memories")}
          </Button>
          <Button
            onClick={() => router.push("/message")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full"
          >
            {t("home.birthday_message")}
          </Button>
        </motion.div>

        {/* Gift boxes - hide on very small screens */}
        <div className="absolute bottom-10 left-10 md:left-20 hidden sm:block">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <GiftBox color="#FF5252" size={60} />
          </motion.div>
        </div>

        <div className="absolute bottom-20 right-10 md:right-20 hidden sm:block">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <GiftBox color="#4CAF50" size={80} />
          </motion.div>
        </div>
      </main>

      <footer className="py-6 text-center text-white/60 relative z-10">
        <p>{t("home.made_with_love")}</p>
      </footer>
    </div>
  )
}

// Animated Birthday Cake Component
function AnimatedCake() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
        className="relative"
      >
        {/* Cake base */}
        <div className="relative w-64 h-48 mx-auto">
          {/* Bottom layer */}
          <motion.div
            className="absolute bottom-0 w-64 h-20 bg-pink-400 rounded-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />

          {/* Middle layer */}
          <motion.div
            className="absolute bottom-16 left-6 w-52 h-16 bg-pink-300 rounded-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />

          {/* Top layer */}
          <motion.div
            className="absolute bottom-28 left-12 w-40 h-14 bg-pink-200 rounded-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />

          {/* Candles */}
          <motion.div
            className="absolute bottom-42 left-20 flex space-x-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Candle color="#FF5252" />
            <Candle color="#FFC107" />
            <Candle color="#4CAF50" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// Candle Component
function Candle({ color }: { color: string }) {
  return (
    <div className="relative">
      <div className={`w-2 h-12 rounded-sm`} style={{ backgroundColor: color }}></div>
      <motion.div
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-yellow-400 rounded-full blur-sm"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}

// Optimize fireworks for better performance
function Fireworks() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <FireworkBurst
          key={i}
          x={`${20 + i * 30}%`}
          y={`${15 + (i % 3) * 25}%`}
          size={30 + (i % 3) * 10}
          color={i % 2 === 0 ? "#FF5252" : i % 3 === 0 ? "#FFC107" : "#4CAF50"}
          delay={i * 0.5}
        />
      ))}
    </>
  )
}

// Individual Firework Burst
function FireworkBurst({
  x,
  y,
  size,
  color,
  delay,
}: {
  x: string
  y: string
  size: number
  color: string
  delay: number
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ delay, duration: 1.5, times: [0, 0.1, 1] }}
    >
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const distance = size

        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              left: 0,
              top: 0,
              boxShadow: `0 0 6px 2px ${color}`,
            }}
            initial={{ x: 0, y: 0, scale: 0 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0, 1, 0],
            }}
            transition={{
              delay: delay + 0.1,
              duration: 1.2,
              times: [0, 0.2, 1],
            }}
          />
        )
      })}
    </motion.div>
  )
}

// Optimize animations for better performance
// Reduce the number of balloons for better performance
function Balloons() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <Balloon
          key={i}
          x={`${5 + i * 15}%`}
          delay={i * 0.3}
          color={
            i % 5 === 0
              ? "#FF5252"
              : i % 5 === 1
                ? "#FFC107"
                : i % 5 === 2
                  ? "#4CAF50"
                  : i % 5 === 3
                    ? "#2196F3"
                    : "#9C27B0"
          }
        />
      ))}
    </>
  )
}

// Individual Balloon
function Balloon({ x, delay, color }: { x: string; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left: x }}
      initial={{ y: 0 }}
      animate={{ y: [0, -20, -40, -60, -80, -100, -120, -140, -160, -180, -200, -220, -240, -260, -280, -300] }}
      transition={{
        delay,
        duration: 15,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.93, 0.95, 0.97, 0.99, 1],
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 5 + 5,
      }}
    >
      <div className="relative">
        <div className="w-10 h-12 rounded-full" style={{ backgroundColor: color }} />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gray-300" />
      </div>
    </motion.div>
  )
}

// Gift Box Component
function GiftBox({ color, size }: { color: string; size: number }) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Box base */}
      <div className="w-full h-3/4 rounded-md absolute bottom-0" style={{ backgroundColor: color }} />

      {/* Box lid */}
      <div className="w-full h-1/4 rounded-t-md absolute top-0" style={{ backgroundColor: `${color}dd` }} />

      {/* Ribbon vertical */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/6 h-full rounded-sm"
        style={{ backgroundColor: "#FFD700" }}
      />

      {/* Ribbon horizontal */}
      <div className="absolute top-1/3 left-0 w-full h-1/6 rounded-sm" style={{ backgroundColor: "#FFD700" }} />

      {/* Bow */}
      <div className="absolute -top-1/4 left-1/2 transform -translate-x-1/2">
        <div className="relative w-full h-full">
          <div
            className="absolute w-1/2 h-1/2 rounded-full transform -rotate-45"
            style={{ backgroundColor: "#FFD700", left: -size / 8, top: size / 16 }}
          />
          <div
            className="absolute w-1/2 h-1/2 rounded-full transform rotate-45"
            style={{ backgroundColor: "#FFD700", right: -size / 8, top: size / 16 }}
          />
          <div
            className="absolute w-1/4 h-1/4 rounded-full"
            style={{ backgroundColor: "#FFA000", left: "38%", top: size / 8 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
