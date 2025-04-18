"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Heart, Send, Gift, Trash2, AlertCircle, Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getWishes, addWish, deleteWish, type Wish } from "@/app/actions/wishes"
import confetti from "canvas-confetti"
import { useToast } from "@/components/ui/use-toast"

export default function WishesPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState("")
  const [relation, setRelation] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch wishes from the database
  useEffect(() => {
    async function fetchWishes() {
      setIsLoading(true)
      try {
        const fetchedWishes = await getWishes()
        setWishes(fetchedWishes)
      } catch (error) {
        console.error("Error fetching wishes:", error)
        toast({
          title: "Error",
          description: "Failed to load wishes. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishes()

    // Set up polling to refresh wishes every 30 seconds
    const intervalId = setInterval(fetchWishes, 30000)

    return () => clearInterval(intervalId)
  }, [toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create new wish
      const newWish = {
        name,
        relation,
        message,
        timestamp: new Date().toLocaleString(),
      }

      // Add wish to database
      const result = await addWish(newWish)

      if (result.success) {
        // Optimistically update UI
        setWishes([{ ...newWish, id: Date.now() }, ...wishes])
        setName("")
        setRelation("")
        setMessage("")
        setSubmitted(true)

        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })

        // Refresh wishes from server
        const updatedWishes = await getWishes()
        setWishes(updatedWishes)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add wish. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting wish:", error)
      toast({
        title: "Error",
        description: "Failed to add wish. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)

      // Reset submitted state after a delay
      if (submitted) {
        setTimeout(() => {
          setSubmitted(false)
        }, 3000)
      }
    }
  }

  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (deleteId !== null) {
      setIsDeleting(true)

      try {
        // Optimistically update UI
        setWishes(wishes.filter((wish) => wish.id !== deleteId))
        setIsDeleteDialogOpen(false)

        // Delete from database
        const result = await deleteWish(deleteId)

        if (!result.success) {
          // If deletion failed, refresh wishes from server
          toast({
            title: "Error",
            description: result.error || "Failed to delete wish. Please try again.",
            variant: "destructive",
          })
          const updatedWishes = await getWishes()
          setWishes(updatedWishes)
        }
      } catch (error) {
        console.error("Error deleting wish:", error)
        toast({
          title: "Error",
          description: "Failed to delete wish. Please try again.",
          variant: "destructive",
        })
        // Refresh wishes from server
        const updatedWishes = await getWishes()
        setWishes(updatedWishes)
      } finally {
        setIsDeleting(false)
        setDeleteId(null)
      }
    }
  }

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false)
    setDeleteId(null)
  }

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
          {t("wishes.title")}
        </motion.h1>
        <motion.p
          className="text-xl text-white/80 text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("wishes.subtitle")}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Wishes Form */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">{t("wishes.add_wish")}</h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{t("wishes.thank_you")}</h3>
                    <p className="text-white/70 mb-6">{t("wishes.success")}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        {t("wishes.your_name")}
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder={t("wishes.your_name")}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="relation" className="text-white">
                        {t("wishes.relation")}
                      </Label>
                      <Input
                        id="relation"
                        value={relation}
                        onChange={(e) => setRelation(e.target.value)}
                        placeholder={t("wishes.relation_placeholder")}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">
                        {t("wishes.message")}
                      </Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder={t("wishes.message_placeholder")}
                        rows={5}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {t("wishes.submitting") || "Submitting..."}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t("wishes.submit")}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Wishes Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Loader2 className="h-8 w-8 text-white animate-spin mb-4" />
                <p className="text-white/70">{t("wishes.loading") || "Loading wishes..."}</p>
              </div>
            ) : wishes.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">{t("wishes.heartfelt")}</h2>
                <AnimatePresence>
                  {wishes.map((wish) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-4 relative group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-white">{wish.name}</h3>
                          {wish.relation && <p className="text-white/60 text-sm">{wish.relation}</p>}
                        </div>
                        <div className="text-white/60 text-xs">{wish.timestamp}</div>
                      </div>
                      <p className="text-white/80 italic mb-4">"{wish.message}"</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-rose-400">
                          <Heart className="h-4 w-4" fill="#f43f5e" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(wish.id)}
                          className="text-white/40 hover:text-white hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={t("wishes.delete") || "Delete wish"}
                          disabled={isDeleting && deleteId === wish.id}
                        >
                          {isDeleting && deleteId === wish.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                <Gift className="h-16 w-16 text-rose-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{t("wishes.no_wishes")}</h3>
                <p className="text-white/70 mb-6 max-w-md">{t("wishes.be_first")}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {["Family", "Friends", "Colleagues", "Relatives"].map((group) => (
                    <span
                      key={group}
                      className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-sm border border-white/10"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-rose-500" />
              {t("wishes.delete_title") || "Delete Wish"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              {t("wishes.delete_description") ||
                "Are you sure you want to delete this wish? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
              disabled={isDeleting}
            >
              {t("wishes.cancel") || "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white border-none"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("wishes.deleting") || "Deleting..."}
                </>
              ) : (
                t("wishes.confirm_delete") || "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
