"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-white/80 hover:text-white hover:bg-white/10"
      aria-label={language === "en" ? "Switch to Hindi" : "Switch to English"}
    >
      <Globe className="h-4 w-4" />
      <span>{language === "en" ? "हिंदी" : "English"}</span>
    </Button>
  )
}
