"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Navbar } from "@/components/navbar"

// Timeline events
const timelineEvents = [
  {
    year: "Early Years",
    title: "Childhood Memories",
    description: "The foundation years that shaped Sonu Mama's character and values.",
    image: "/images/photo6.jpg",
  },
  {
    year: "Growing Up",
    title: "School & College Days",
    description: "Educational journey and formative experiences that built knowledge and friendships.",
    image: "/images/friends.jpg",
  },
  {
    year: "Family Life",
    title: "Building Relationships",
    description: "Creating strong bonds with family members that last a lifetime.",
    image: "/images/family-photo.jpg",
  },
  {
    year: "Career Path",
    title: "Professional Journey",
    description: "Achievements and milestones in Sonu Mama's professional life.",
    image: "/images/photo4.jpg",
  },
  {
    year: "Special Moments",
    title: "Celebrations & Gatherings",
    description: "Festivals, birthdays, and special occasions that brought joy and togetherness.",
    image: "/images/celebration.jpg",
  },
  {
    year: "Recent Times",
    title: "Creating New Memories",
    description: "Recent adventures and moments that continue to enrich life's journey.",
    image: "/images/photo2.jpg",
  },
]

function TimelineEvent({ event, index }: { event: (typeof timelineEvents)[0]; index: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -50 : 50, 0])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className={`flex flex-col md:flex-row items-center gap-8 mb-24 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="w-full md:w-1/2">
        <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      </div>

      <div className="w-full md:w-1/2 text-white">
        <div className="inline-block px-4 py-1 rounded-full bg-rose-600/20 text-rose-400 mb-2">{event.year}</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3">{event.title}</h3>
        <p className="text-white/70 text-lg">{event.description}</p>
      </div>
    </motion.div>
  )
}

export default function TimelinePage() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Life Timeline
        </motion.h1>
        <motion.p
          className="text-xl text-white/80 text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A journey through the chapters of Sonu Mama's life
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-rose-600 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Timeline Content */}
        <div className="max-w-5xl mx-auto">
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={event.title} event={event} index={index} />
          ))}
        </div>
      </main>
    </div>
  )
}
