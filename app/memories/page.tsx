"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Memory categories and their images
const categories = [
  {
    id: "family",
    title: "Family Moments",
    description: "Cherished times with loved ones",
    images: [
      {
        src: "/images/family-photo.jpg",
        alt: "Family gathering",
        caption: "Family gathering with smiles all around",
      },
      {
        src: "/images/photo5.jpg",
        alt: "Three generations",
        caption: "Three generations together - a legacy of love",
      },
    ],
  },
  {
    id: "friends",
    title: "Friendships",
    description: "Bonds that last a lifetime",
    images: [
      {
        src: "/images/friends.jpg",
        alt: "Friends together",
        caption: "Evening with friends - memories that last forever",
      },
      {
        src: "/images/photo3.jpg",
        alt: "Quiet moments",
        caption: "Quiet moments of connection and friendship",
      },
    ],
  },
  {
    id: "celebrations",
    title: "Celebrations",
    description: "Special occasions and festivities",
    images: [
      {
        src: "/images/celebration.jpg",
        alt: "Birthday celebration",
        caption: "Birthday celebration with cake and joy",
      },
      {
        src: "/images/photo1.jpg",
        alt: "Festive gathering",
        caption: "Festive gathering with family and friends",
      },
    ],
  },
  {
    id: "children",
    title: "With Children",
    description: "Moments with the little ones",
    images: [
      {
        src: "/images/children.jpg",
        alt: "With children",
        caption: "Sharing joy with the next generation",
      },
      {
        src: "/images/photo6.jpg",
        alt: "Outdoor with kids",
        caption: "Adventures with the little ones in nature",
      },
    ],
  },
]

export default function MemoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [openImage, setOpenImage] = useState<null | { src: string; alt: string; caption: string }>(null)

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
          Memories
        </motion.h1>
        <motion.p
          className="text-xl text-white/80 text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A collection of cherished moments with Sonu Mama
        </motion.p>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory.id === category.id ? "default" : "outline"}
              className={`rounded-full px-6 ${
                selectedCategory.id === category.id
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "bg-transparent text-white border-white/30 hover:bg-white/10"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.title}
            </Button>
          ))}
        </div>

        {/* Selected Category Content */}
        <motion.div
          key={selectedCategory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-2">{selectedCategory.title}</h2>
          <p className="text-white/70 mb-8">{selectedCategory.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedCategory.images.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-2xl"
              >
                <div className="relative aspect-[4/3] cursor-pointer" onClick={() => setOpenImage(image)}>
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <p className="text-white text-lg">{image.caption}</p>
                    </div>
                  </div>
                  <button
                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenImage(image)
                    }}
                  >
                    <Maximize2 className="h-5 w-5 text-white" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Image Lightbox */}
      <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
        <DialogContent className="max-w-5xl bg-black/95 border-gray-800">
          {openImage && (
            <div className="relative">
              <div className="relative h-[70vh]">
                <Image src={openImage.src || "/placeholder.svg"} alt={openImage.alt} fill className="object-contain" />
              </div>
              <div className="p-4 text-center">
                <p className="text-white text-lg">{openImage.caption}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
