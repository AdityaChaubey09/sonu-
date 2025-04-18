"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export default function MessagePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("message.back")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">{t("message.title")}</h1>

              <div className="prose prose-invert max-w-none">
                <p className="text-white/90 text-lg leading-relaxed mb-6">{t("message.dear")}</p>

                <p className="text-white/90 text-lg leading-relaxed mb-6">{t("message.para1")}</p>

                <p className="text-white/90 text-lg leading-relaxed mb-6">{t("message.para2")}</p>

                <p className="text-white/90 text-lg leading-relaxed mb-6">{t("message.para3")}</p>

                <p className="text-white/90 text-lg leading-relaxed mb-6">{t("message.para4")}</p>

                <p className="text-white/90 text-lg leading-relaxed mb-6">{t("message.para5")}</p>

                <p className="text-white/90 text-lg leading-relaxed mb-6">{t("message.para6")}</p>

                <p className="text-white/90 text-lg leading-relaxed mb-6">{t("message.para7")}</p>

                <p className="text-white/90 text-lg leading-relaxed mb-6">{t("message.with_love")}</p>

                <div className="flex flex-col items-end mt-8">
                  <p className="text-white/90 text-lg italic">{t("message.nephew")}</p>
                </div>

                <div className="mt-16 pt-8 border-t border-white/20 text-center">
                  <p className="text-white/60 text-sm">{t("message.made_by")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-center mt-12">
          <Button asChild className="bg-rose-600 hover:bg-rose-700">
            <Link href="/">{t("message.return")}</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
