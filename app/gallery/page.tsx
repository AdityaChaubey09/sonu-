"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Grid3X3,
  LayoutGrid,
  LayoutList,
  Search,
  Calendar,
  Users,
} from "lucide-react"

// Photo categories
const categories = [
  { id: "all", name: "All Photos" },
  { id: "family", name: "Family" },
  { id: "celebrations", name: "Celebrations" },
  { id: "travel", name: "Travel" },
  { id: "friends", name: "Friends" },
  { id: "selfies", name: "Selfies" },
  { id: "gatherings", name: "Gatherings" },
  { id: "memories", name: "Memories" },
]

// Gallery images with the new photos added
const galleryImages = [
  {
    id: 1,
    src: "/images/photo1.jpg",
    alt: "Birthday celebration",
    caption: "Birthday celebration with cake and joy",
    category: ["celebrations"],
    year: "2021",
  },
  {
    id: 2,
    src: "/images/photo2.jpg",
    alt: "Family portrait",
    caption: "Standing tall against the vibrant backdrop",
    category: ["family"],
    year: "2020",
  },
  {
    id: 3,
    src: "/images/photo3.jpg",
    alt: "Friends together",
    caption: "Quiet moments of connection",
    category: ["friends"],
    year: "2019",
  },
  {
    id: 4,
    src: "/images/photo4.jpg",
    alt: "Side by side",
    caption: "Side by side, always supporting each other",
    category: ["family"],
    year: "2021",
  },
  {
    id: 5,
    src: "/images/photo5.jpg",
    alt: "Three generations",
    caption: "Three generations together",
    category: ["family"],
    year: "2020",
  },
  {
    id: 6,
    src: "/images/photo6.jpg",
    alt: "With children",
    caption: "Adventures with the little ones",
    category: ["family"],
    year: "2022",
  },
  {
    id: 7,
    src: "/images/family-photo.jpg",
    alt: "Family gathering",
    caption: "Family gathering with smiles all around",
    category: ["family"],
    year: "2021",
  },
  {
    id: 8,
    src: "/images/celebration.jpg",
    alt: "Celebration",
    caption: "Festive celebration with loved ones",
    category: ["celebrations"],
    year: "2022",
  },
  {
    id: 9,
    src: "/images/friends.jpg",
    alt: "Friends",
    caption: "Evening with friends - memories that last forever",
    category: ["friends"],
    year: "2020",
  },
  {
    id: 10,
    src: "/images/children.jpg",
    alt: "With children",
    caption: "Sharing joy with the next generation",
    category: ["family"],
    year: "2021",
  },
  // Previously added images
  {
    id: 11,
    src: "/images/sonu-family-cave.jpg",
    alt: "Family visit to historical site",
    caption: "Exploring heritage sites with family",
    category: ["family", "travel"],
    year: "2021",
  },
  {
    id: 12,
    src: "/images/sonu-yellow-family.jpg",
    alt: "Family portrait at home",
    caption: "Precious moments with loved ones at home",
    category: ["family"],
    year: "2021",
  },
  {
    id: 13,
    src: "/images/sonu-couple.jpg",
    alt: "Couple portrait",
    caption: "A beautiful moment captured together",
    category: ["family"],
    year: "2021",
  },
  {
    id: 14,
    src: "/images/sonu-kitchen.jpg",
    alt: "Kitchen memories",
    caption: "Joyful moments in the heart of the home",
    category: ["family"],
    year: "2021",
  },
  {
    id: 15,
    src: "/images/sonu-daughter.jpg",
    alt: "Father and daughter",
    caption: "The special bond between father and daughter",
    category: ["family"],
    year: "2021",
  },
  {
    id: 16,
    src: "/images/sonu-family-couch.jpg",
    alt: "Family gathering",
    caption: "Family reunion filled with love and laughter",
    category: ["family", "gatherings"],
    year: "2022",
  },
  {
    id: 17,
    src: "/images/sonu-family-yellow.jpg",
    alt: "Family outing",
    caption: "Creating memories together on a family outing",
    category: ["family", "travel"],
    year: "2021",
  },
  {
    id: 18,
    src: "/images/sonu-temple.jpg",
    alt: "Temple visit",
    caption: "Spiritual moments with family at the temple",
    category: ["family", "travel"],
    year: "2021",
  },
  // New images added
  {
    id: 19,
    src: "/images/sonu-outdoor-selfie.jpg",
    alt: "Outdoor selfie",
    caption: "Beautiful day outdoors with loved ones",
    category: ["family", "selfies"],
    year: "2023",
  },
  {
    id: 20,
    src: "/images/sonu-son-field.jpg",
    alt: "Father and son in field",
    caption: "Quality time with the younger generation",
    category: ["family", "selfies"],
    year: "2022",
  },
  {
    id: 21,
    src: "/images/sonu-family-couch-red.jpg",
    alt: "Family on the couch",
    caption: "Relaxing family time at home",
    category: ["family", "gatherings"],
    year: "2022",
  },
  {
    id: 22,
    src: "/images/sonu-formal-event.jpg",
    alt: "Formal event gathering",
    caption: "Dressed up for a special celebration",
    category: ["celebrations", "family"],
    year: "2023",
  },
  {
    id: 23,
    src: "/images/sonu-extended-family.jpg",
    alt: "Extended family gathering",
    caption: "The joy of having everyone together",
    category: ["family", "gatherings"],
    year: "2023",
  },
  {
    id: 24,
    src: "/images/sonu-friend-scarf.jpg",
    alt: "Friends with scarves",
    caption: "Winter memories with close friends",
    category: ["friends"],
    year: "2022",
  },
  {
    id: 25,
    src: "/images/sonu-night-group1.jpg",
    alt: "Evening gathering",
    caption: "Night out with family and friends",
    category: ["family", "gatherings"],
    year: "2023",
  },
  {
    id: 26,
    src: "/images/sonu-night-group2.jpg",
    alt: "Night gathering with family",
    caption: "Creating memories under the stars",
    category: ["family", "gatherings"],
    year: "2023",
  },
  {
    id: 27,
    src: "/images/sonu-trio-night.jpg",
    alt: "Trio night out",
    caption: "Special evening with close family",
    category: ["family", "gatherings"],
    year: "2023",
  },
  {
    id: 28,
    src: "/images/sonu-with-mother.jpg",
    alt: "With mother",
    caption: "Cherished moments with mother",
    category: ["family"],
    year: "",
  },
  {
    id: 29,
    src: "/images/sonu-traditional-family.jpg",
    alt: "Traditional celebration",
    caption: "Festive celebration with family in traditional attire",
    category: ["family", "celebrations"],
    year: "",
  },
  {
    id: 30,
    src: "/images/sonu-traditional-duo.jpg",
    alt: "Traditional duo",
    caption: "Special occasion in traditional clothes",
    category: ["family", "celebrations"],
    year: "",
  },
  {
    id: 31,
    src: "/images/sonu-traditional-trio.jpg",
    alt: "Traditional trio",
    caption: "Celebrating traditions with family",
    category: ["family", "celebrations"],
    year: "",
  },
  {
    id: 32,
    src: "/images/sonu-young-with-baby.jpg",
    alt: "Young days with baby",
    caption: "Precious memories from younger days with baby and pet",
    category: ["family", "memories"],
    year: "",
  },
  {
    id: 33,
    src: "/images/sonu-young-eating.jpg",
    alt: "Childhood memories",
    caption: "Joyful moments from childhood",
    category: ["family", "memories"],
    year: "",
  },
  {
    id: 34,
    src: "/images/sonu-outdoor-traditional.jpg",
    alt: "Traditional outdoor portrait",
    caption: "Traditional attire at a special location",
    category: ["family", "celebrations"],
    year: "",
  },
  {
    id: 35,
    src: "/images/sonu-family-couch-pink.jpg",
    alt: "Family gathering",
    caption: "Beautiful family gathering at home",
    category: ["family", "gatherings"],
    year: "",
  },
  {
    id: 36,
    src: "/images/sonu-couple-green.jpg",
    alt: "Couple portrait",
    caption: "Elegant couple portrait in traditional attire",
    category: ["family"],
    year: "",
  },
  {
    id: 37,
    src: "/images/sonu-couple-kitchen.jpg",
    alt: "Kitchen memories",
    caption: "Warm moments together in the kitchen",
    category: ["family"],
    year: "",
  },
]

// Layout options
const layouts = [
  { id: "grid", icon: Grid3X3, name: "Grid" },
  { id: "masonry", icon: LayoutGrid, name: "Masonry" },
  { id: "timeline", icon: LayoutList, name: "Timeline" },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeLayout, setActiveLayout] = useState("masonry")
  const [searchQuery, setSearchQuery] = useState("")

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Filter images based on active filters
  const filteredImages = galleryImages.filter((image) => {
    // Category filter
    const passesCategory = activeCategory === "all" || image.category.includes(activeCategory)

    // Search filter
    const passesSearch =
      searchQuery === "" ||
      image.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.caption.toLowerCase().includes(searchQuery.toLowerCase())

    return passesCategory && passesSearch
  })

  const openLightbox = (index: number) => {
    // Find the index in the filtered images array
    const imageId = filteredImages[index].id
    const originalIndex = galleryImages.findIndex((img) => img.id === imageId)
    setSelectedImage(originalIndex)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToNext = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage + 1) % galleryImages.length)
  }

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const imageId = filteredImages[index].id
    setLikedImages((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(imageId)) {
        newLiked.delete(imageId)
      } else {
        newLiked.add(imageId)
      }
      return newLiked
    })
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "Escape") closeLightbox()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

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
          Photo Gallery
        </motion.h1>
        <motion.p
          className="text-xl text-white/80 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A visual journey through Sonu Mama's life and relationships
        </motion.p>

        {/* Search and Layout Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              placeholder="Search photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>

          <div className="flex rounded-md overflow-hidden border border-white/20">
            {layouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => setActiveLayout(layout.id)}
                className={`p-2 ${activeLayout === layout.id ? "bg-rose-600 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
                title={layout.name}
              >
                <layout.icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-8 hide-scrollbar">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-rose-600 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* No Results Message */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/70">
              <p className="text-xl mb-2">No photos match your search</p>
              <p>Try adjusting your search or category to see more results.</p>
            </motion.div>
          </div>
        )}

        {/* Gallery Layout */}
        <div ref={containerRef} className="relative">
          {activeLayout === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <GridItem
                  key={image.id}
                  image={image}
                  index={index}
                  openLightbox={openLightbox}
                  toggleLike={toggleLike}
                  isLiked={likedImages.has(image.id)}
                />
              ))}
            </div>
          )}

          {activeLayout === "masonry" && (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filteredImages.map((image, index) => (
                <MasonryItem
                  key={image.id}
                  image={image}
                  index={index}
                  openLightbox={openLightbox}
                  toggleLike={toggleLike}
                  isLiked={likedImages.has(image.id)}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
          )}

          {activeLayout === "timeline" && (
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-rose-500/30 to-transparent"></div>

              {filteredImages.map((image, index) => (
                <TimelineItem
                  key={image.id}
                  image={image}
                  index={index}
                  openLightbox={openLightbox}
                  toggleLike={toggleLike}
                  isLiked={likedImages.has(image.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-6xl bg-black/95 border-gray-800 p-0">
          {selectedImage !== null && (
            <div className="relative">
              <button className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full" onClick={closeLightbox}>
                <X className="h-6 w-6 text-white" />
              </button>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              <div className="relative h-[80vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Image
                      src={galleryImages[selectedImage].src || "/placeholder.svg"}
                      alt={galleryImages[selectedImage].alt}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="p-4 text-center">
                <h3 className="text-white text-xl font-medium mb-1">{galleryImages[selectedImage].alt}</h3>
                <p className="text-white/80 text-base mb-2">{galleryImages[selectedImage].caption}</p>
                <div className="flex justify-center items-center gap-4">
                  <p className="text-white/60 text-sm">
                    {selectedImage + 1} of {galleryImages.length}
                  </p>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full">
                    <Calendar className="h-3 w-3 text-white/60" />
                    <span className="text-white/60 text-xs">{galleryImages[selectedImage].year}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full">
                    <Users className="h-3 w-3 text-white/60" />
                    <span className="text-white/60 text-xs">{galleryImages[selectedImage].category.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Grid Item Component
function GridItem({
  image,
  index,
  openLightbox,
  toggleLike,
  isLiked,
}: {
  image: (typeof galleryImages)[0]
  index: number
  openLightbox: (index: number) => void
  toggleLike: (index: number, e: React.MouseEvent) => void
  isLiked: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative cursor-pointer overflow-hidden rounded-lg"
      onClick={() => openLightbox(index)}
    >
      <div className="aspect-square relative">
        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <h3 className="text-white font-medium truncate">{image.alt}</h3>
            <p className="text-white/80 text-sm line-clamp-2">{image.caption}</p>
          </div>
        </div>

        {/* Like button */}
        <button
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${
            isLiked ? "bg-rose-600/90" : "bg-black/50 opacity-0 group-hover:opacity-100"
          }`}
          onClick={(e) => toggleLike(index, e)}
        >
          <Heart
            className={`h-4 w-4 ${isLiked ? "text-white" : "text-white/80"}`}
            fill={isLiked ? "#ec4899" : "none"}
          />
        </button>

        {/* Year badge */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-xs text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {image.year}
        </div>
      </div>
    </motion.div>
  )
}

// Masonry Item Component
function MasonryItem({
  image,
  index,
  openLightbox,
  toggleLike,
  isLiked,
  scrollProgress,
}: {
  image: (typeof galleryImages)[0]
  index: number
  openLightbox: (index: number) => void
  toggleLike: (index: number, e: React.MouseEvent) => void
  isLiked: boolean
  scrollProgress: any
}) {
  // Calculate random rotation for each item
  const rotation = index % 2 === 0 ? Math.random() * 2 - 1 : Math.random() * -2 + 1

  // Calculate parallax effect
  const y = useTransform(scrollProgress, [0, 1], [0, index % 3 === 0 ? 100 : index % 3 === 1 ? 50 : 25])

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="mb-4 break-inside-avoid"
    >
      <div
        className={`
          relative overflow-hidden cursor-pointer group
          transform hover:scale-[1.02] transition-transform duration-300
          ${index % 2 === 0 ? "rounded-lg" : "rounded-xl"}
        `}
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={() => openLightbox(index)}
      >
        {/* Decorative frame */}
        <div className="absolute inset-0 border-4 border-white/20 rounded-lg z-10 pointer-events-none"></div>

        {/* Image */}
        <div
          className={`relative ${index % 5 === 0 ? "aspect-square" : index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white text-lg font-medium">{image.alt}</h3>
            <p className="text-white/80 text-sm">{image.caption}</p>
          </div>

          {/* Like button */}
          <button
            className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 ${
              isLiked ? "bg-rose-600/90" : "bg-black/50 opacity-0 group-hover:opacity-100"
            }`}
            onClick={(e) => toggleLike(index, e)}
          >
            <Heart
              className={`h-4 w-4 ${isLiked ? "text-white" : "text-white/80"}`}
              fill={isLiked ? "#ec4899" : "none"}
            />
          </button>

          {/* Year badge */}
          <div className="absolute bottom-3 right-3 bg-black/50 text-xs text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {image.year}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Timeline Item Component
function TimelineItem({
  image,
  index,
  openLightbox,
  toggleLike,
  isLiked,
}: {
  image: (typeof galleryImages)[0]
  index: number
  openLightbox: (index: number) => void
  toggleLike: (index: number, e: React.MouseEvent) => void
  isLiked: boolean
}) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex items-center mb-16 ${isEven ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className="w-5/12 md:w-5/12"></div>

      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-rose-500 border-4 border-white z-10 flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-20"></span>
        <span className="text-white text-xs font-bold">{image.year}</span>
      </div>

      <div
        className="w-5/12 md:w-5/12 bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-lg cursor-pointer group"
        onClick={() => openLightbox(index)}
      >
        <div className="relative h-48 md:h-64">
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Like button */}
          <button
            className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${
              isLiked ? "bg-rose-600/90" : "bg-black/50 opacity-0 group-hover:opacity-100"
            }`}
            onClick={(e) => toggleLike(index, e)}
          >
            <Heart
              className={`h-4 w-4 ${isLiked ? "text-white" : "text-white/80"}`}
              fill={isLiked ? "#ec4899" : "none"}
            />
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-medium">{image.alt}</h3>
            <div className="bg-black/30 text-xs text-white/80 px-2 py-1 rounded-full">{image.year}</div>
          </div>
          <p className="text-white/70 text-sm">{image.caption}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {image.category.map((cat) => (
              <span key={cat} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
