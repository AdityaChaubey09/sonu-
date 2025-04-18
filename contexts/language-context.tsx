"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "hi"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.memories": "Memories",
    "nav.timeline": "Timeline",
    "nav.wishes": "Wishes",
    "nav.gallery": "Gallery",
    "nav.message": "Message",

    // Loading
    "loading.title": "Loading...",
    "loading.message": "Preparing birthday celebration",

    // Home Page
    "home.happy_birthday": "Happy Birthday",
    "home.sonu_mama": "Sonu Mama",
    "home.celebration": "A celebration of life, memories, and cherished moments",
    "home.explore_memories": "Explore Memories",
    "home.birthday_message": "Birthday Message",
    "home.made_with_love": "Made with ❤️ by Aditya Chaubey for Sonu Mama's Birthday",

    // Memories Page
    "memories.title": "Memories",
    "memories.subtitle": "A collection of cherished moments with Sonu Mama",
    "memories.family_moments": "Family Moments",
    "memories.family_description": "Cherished times with loved ones",
    "memories.friendships": "Friendships",
    "memories.friendships_description": "Bonds that last a lifetime",
    "memories.celebrations": "Celebrations",
    "memories.celebrations_description": "Special occasions and festivities",
    "memories.with_children": "With Children",
    "memories.with_children_description": "Moments with the little ones",

    // Timeline Page
    "timeline.title": "Life Timeline",
    "timeline.subtitle": "A journey through the chapters of Sonu Mama's life",
    "timeline.early_years": "Early Years",
    "timeline.childhood": "Childhood Memories",
    "timeline.childhood_desc": "The foundation years that shaped Sonu Mama's character and values.",
    "timeline.growing_up": "Growing Up",
    "timeline.school_days": "School & College Days",
    "timeline.school_desc": "Educational journey and formative experiences that built knowledge and friendships.",
    "timeline.family_life": "Family Life",
    "timeline.relationships": "Building Relationships",
    "timeline.relationships_desc": "Creating strong bonds with family members that last a lifetime.",
    "timeline.career": "Career Path",
    "timeline.professional": "Professional Journey",
    "timeline.professional_desc": "Achievements and milestones in Sonu Mama's professional life.",
    "timeline.special": "Special Moments",
    "timeline.gatherings": "Celebrations & Gatherings",
    "timeline.gatherings_desc": "Festivals, birthdays, and special occasions that brought joy and togetherness.",
    "timeline.recent": "Recent Times",
    "timeline.new_memories": "Creating New Memories",
    "timeline.new_memories_desc": "Recent adventures and moments that continue to enrich life's journey.",

    // Wishes Page
    "wishes.title": "Birthday Wishes",
    "wishes.subtitle": "Share your heartfelt wishes for Sonu Mama's special day",
    "wishes.add_wish": "Add Your Wish",
    "wishes.your_name": "Your Name",
    "wishes.relation": "Relation to Sonu Mama",
    "wishes.relation_placeholder": "E.g., Nephew, Friend, Colleague",
    "wishes.message": "Your Birthday Wish",
    "wishes.message_placeholder": "Write your birthday message here...",
    "wishes.submit": "Submit Your Wish",
    "wishes.thank_you": "Thank You!",
    "wishes.success": "Your birthday wish has been added successfully.",
    "wishes.heartfelt": "Heartfelt Wishes",
    "wishes.no_wishes": "No Wishes Yet",
    "wishes.be_first":
      "Be the first to add a birthday wish for Sonu Mama! Share your message using the form and it will appear here.",
    "wishes.delete": "Delete wish",
    "wishes.delete_title": "Delete Wish",
    "wishes.delete_description": "Are you sure you want to delete this wish? This action cannot be undone.",
    "wishes.cancel": "Cancel",
    "wishes.confirm_delete": "Delete",

    // Gallery Page
    "gallery.title": "Photo Gallery",
    "gallery.subtitle": "A visual journey through Sonu Mama's life and relationships",
    "gallery.search": "Search photos...",
    "gallery.all_photos": "All Photos",
    "gallery.family": "Family",
    "gallery.celebrations": "Celebrations",
    "gallery.travel": "Travel",
    "gallery.friends": "Friends",
    "gallery.selfies": "Selfies",
    "gallery.gatherings": "Gatherings",
    "gallery.memories": "Memories",
    "gallery.no_results": "No photos match your search",
    "gallery.try_adjusting": "Try adjusting your search or category to see more results.",

    // Message Page
    "message.back": "Back to Home",
    "message.title": "A Message From The Heart",
    "message.dear": "Dear Mama,",
    "message.para1":
      "As I sit here reflecting on your birthday, I find myself overwhelmed with emotions that words can barely contain. Though distance and your demanding career in banking have limited our time together, the impact you've had on my life knows no bounds.",
    "message.para2":
      "You've always been more than just an uncle to me. You've been a guiding light, a source of wisdom, and an inspiration. Despite the constraints of time, every moment we've shared has been filled with valuable lessons that have shaped who I am today.",
    "message.para3":
      "I've watched you navigate life's challenges with grace and determination. Your dedication to your work in the banking sector has taught me the value of perseverance and professional integrity. Your ability to balance responsibilities while maintaining your values has shown me what true success looks like.",
    "message.para4":
      "The lessons you've imparted go far beyond financial wisdom. You've taught me that success isn't measured by material wealth, but by the lives we touch and the legacy we create. You've shown me that kindness and respect are currencies that never depreciate, and that family bonds are investments that yield the greatest returns.",
    "message.para5":
      "Though we may not have shared as many moments as I would have wished, each memory we've created together is treasured in my heart. Your laughter, your advice, your presence—all have left indelible marks on my journey.",
    "message.para6":
      "On your special day, I want you to know that the distance has never diminished my love and respect for you. You are celebrated not just today, but every day, in the values I uphold and the path I walk.",
    "message.para7":
      "Happy Birthday, Mama. May your day be as beautiful as the countless lives you've touched, including mine.",
    "message.with_love": "With all my love and respect,",
    "message.nephew": "Your loving nephew",
    "message.made_by": "This website is made with love by Aditya Chaubey as a tribute to a wonderful uncle.",
    "message.return": "Return to Homepage",

    // Common
    "common.of": "of",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.memories": "यादें",
    "nav.timeline": "जीवन रेखा",
    "nav.wishes": "शुभकामनाएँ",
    "nav.gallery": "फोटो गैलरी",
    "nav.message": "संदेश",

    // Loading
    "loading.title": "लोड हो रहा है...",
    "loading.message": "जन्मदिन समारोह की तैयारी",

    // Home Page
    "home.happy_birthday": "जन्मदिन की शुभकामनाएँ",
    "home.sonu_mama": "सोनू मामा",
    "home.celebration": "जीवन, यादों और प्रिय क्षणों का एक उत्सव",
    "home.explore_memories": "यादें देखें",
    "home.birthday_message": "जन्मदिन का संदेश",
    "home.made_with_love": "आदित्य चौबे द्वारा सोनू मामा के जन्मदिन के लिए ❤️ से बनाया गया",

    // Memories Page
    "memories.title": "यादें",
    "memories.subtitle": "सोनू मामा के साथ प्रिय क्षणों का संग्रह",
    "memories.family_moments": "परिवार के क्षण",
    "memories.family_description": "प्रियजनों के साथ प्रिय समय",
    "memories.friendships": "दोस्ती",
    "memories.friendships_description": "जीवन भर चलने वाले बंधन",
    "memories.celebrations": "उत्सव",
    "memories.celebrations_description": "विशेष अवसर और त्योहार",
    "memories.with_children": "बच्चों के साथ",
    "memories.with_children_description": "छोटों के साथ क्षण",

    // Timeline Page
    "timeline.title": "जीवन रेखा",
    "timeline.subtitle": "सोनू मामा के जीवन के अध्यायों की यात्रा",
    "timeline.early_years": "प्रारंभिक वर्ष",
    "timeline.childhood": "बचपन की यादें",
    "timeline.childhood_desc": "वे आधार वर्ष जिन्होंने सोनू मामा के चरित्र और मूल्यों को आकार दिया।",
    "timeline.growing_up": "बड़े होना",
    "timeline.school_days": "स्कूल और कॉलेज के दिन",
    "timeline.school_desc": "शैक्षिक यात्रा और महत्वपूर्ण अनुभव जिन्होंने ज्ञान और दोस्ती का निर्माण किया।",
    "timeline.family_life": "पारिवारिक जीवन",
    "timeline.relationships": "रिश्ते बनाना",
    "timeline.relationships_desc": "परिवार के सदस्यों के साथ मजबूत बंधन बनाना जो जीवन भर चलते हैं।",
    "timeline.career": "करियर पथ",
    "timeline.professional": "पेशेवर यात्रा",
    "timeline.professional_desc": "सोनू मामा के पेशेवर जीवन की उपलब्धियां और मील के पत्थर।",
    "timeline.special": "विशेष क्षण",
    "timeline.gatherings": "उत्सव और समारोह",
    "timeline.gatherings_desc": "त्योहार, जन्मदिन और विशेष अवसर जिन्होंने खुशी और एकजुटता लाई।",
    "timeline.recent": "हाल के समय",
    "timeline.new_memories": "नई यादें बनाना",
    "timeline.new_memories_desc": "हाल के साहसिक कार्य और क्षण जो जीवन की यात्रा को समृद्ध करते रहते हैं।",

    // Wishes Page
    "wishes.title": "जन्मदिन की शुभकामनाएँ",
    "wishes.subtitle": "सोनू मामा के विशेष दिन के लिए अपनी हार्दिक शुभकामनाएँ साझा करें",
    "wishes.add_wish": "अपनी शुभकामना जोड़ें",
    "wishes.your_name": "आपका नाम",
    "wishes.relation": "सोनू मामा से संबंध",
    "wishes.relation_placeholder": "जैसे, भतीजा, दोस्त, सहकर्मी",
    "wishes.message": "आपकी जन्मदिन की शुभकामना",
    "wishes.message_placeholder": "अपना जन्मदिन संदेश यहां लिखें...",
    "wishes.submit": "अपनी शुभकामना भेजें",
    "wishes.thank_you": "धन्यवाद!",
    "wishes.success": "आपकी जन्मदिन की शुभकामना सफलतापूर्वक जोड़ दी गई है।",
    "wishes.heartfelt": "हार्दिक शुभकामनाएँ",
    "wishes.no_wishes": "अभी तक कोई शुभकामनाएँ नहीं",
    "wishes.be_first":
      "सोनू मामा के लिए जन्मदिन की शुभकामना जोड़ने वाले पहले व्यक्ति बनें! फॉर्म का उपयोग करके अपना संदेश साझा करें और यह यहां दिखाई देगा।",
    "wishes.delete": "शुभकामना हटाएं",
    "wishes.delete_title": "शुभकामना हटाएं",
    "wishes.delete_description": "क्या आप वाकई इस शुभकामना को हटाना चाहते हैं? यह क्रिया वापस नहीं ली जा सकती।",
    "wishes.cancel": "रद्द करें",
    "wishes.confirm_delete": "हटाएं",

    // Gallery Page
    "gallery.title": "फोटो गैलरी",
    "gallery.subtitle": "सोनू मामा के जीवन और रिश्तों की एक दृश्य यात्रा",
    "gallery.search": "फोटो खोजें...",
    "gallery.all_photos": "सभी फोटो",
    "gallery.family": "परिवार",
    "gallery.celebrations": "उत्सव",
    "gallery.travel": "यात्रा",
    "gallery.friends": "दोस्त",
    "gallery.selfies": "सेल्फी",
    "gallery.gatherings": "समारोह",
    "gallery.memories": "यादें",
    "gallery.no_results": "आपकी खोज से मेल खाने वाली कोई फोटो नहीं",
    "gallery.try_adjusting": "अधिक परिणाम देखने के लिए अपनी खोज या श्रेणी को समायोजित करने का प्रयास करें।",

    // Message Page
    "message.back": "होम पर वापस जाएं",
    "message.title": "दिल से एक संदेश",
    "message.dear": "प्रिय मामा,",
    "message.para1":
      "जैसे ही मैं आपके जन्मदिन पर विचार कर रहा हूं, मैं ऐसी भावनाओं से भर जाता हूं जिन्हें शब्दों में बयां करना मुश्किल है। हालांकि दूरी और बैंकिंग क्षेत्र में आपके मांग वाले करियर ने हमारे साथ बिताए गए समय को सीमित कर दिया है, मेरे जीवन पर आपके प्रभाव की कोई सीमा नहीं है।",
    "message.para2":
      "आप हमेशा मेरे लिए सिर्फ एक मामा से ज्यादा रहे हैं। आप एक मार्गदर्शक प्रकाश, ज्ञान का स्रोत और प्रेरणा रहे हैं। समय की बाधाओं के बावजूद, हमने जो हर पल साझा किया है, वह मूल्यवान सबक से भरा रहा है जिसने मुझे आज जो मैं हूं, उसे आकार दिया है।",
    "message.para3":
      "मैंने आपको जीवन की चुनौतियों को सौम्यता और दृढ़ संकल्प के साथ नेविगेट करते देखा है। बैंकिंग क्षेत्र में आपके काम के प्रति समर्पण ने मुझे दृढ़ता और पेशेवर अखंडता के मूल्य सिखाए हैं। अपने मूल्यों को बनाए रखते हुए जिम्मेदारियों को संतुलित करने की आपकी क्षमता ने मुझे दिखाया है कि वास्तविक सफलता कैसी दिखती है।",
    "message.para4":
      "आपके द्वारा प्रदान किए गए सबक वित्तीय ज्ञान से कहीं अधिक हैं। आपने मुझे सिखाया है कि सफलता भौतिक धन से नहीं, बल्कि हम जिन जीवनों को छूते हैं और जो विरासत हम बनाते हैं, उससे मापी जाती है। आपने मुझे दिखाया है कि दया और सम्मान ऐसी मुद्राएं हैं जो कभी मूल्यह्रास नहीं होती हैं, और परिवार के बंधन ऐसे निवेश हैं जो सबसे अधिक रिटर्न देते हैं।",
    "message.para5":
      "हालांकि हमने उतने पल साझा नहीं किए जितने मैं चाहता था, हमने जो हर यादें बनाई हैं, वे मेरे दिल में संजोई हुई हैं। आपकी हंसी, आपकी सलाह, आपकी उपस्थिति - सभी ने मेरी यात्रा पर अमिट छाप छोड़ी है।",
    "message.para6":
      "आपके विशेष दिन पर, मैं चाहता हूं कि आप जानें कि दूरी ने कभी भी आपके लिए मेरे प्यार और सम्मान को कम नहीं किया है। आपका जश्न सिर्फ आज ही नहीं, बल्कि हर दिन, उन मूल्यों में मनाया जाता है जिन्हें मैं बनाए रखता हूं और जिस रास्ते पर मैं चलता हूं।",
    "message.para7": "जन्मदिन मुबारक हो, मामा। आपका दिन उतना ही सुंदर हो जितने अनगिनत जीवन आपने छुए हैं, जिनमें मेरा भी शामिल है।",
    "message.with_love": "मेरे सारे प्यार और सम्मान के साथ,",
    "message.nephew": "आपका प्यारा भतीजा",
    "message.made_by": "यह वेबसाइट आदित्य चौबे द्वारा एक अद्भुत मामा के सम्मान में प्यार से बनाई गई है।",
    "message.return": "होमपेज पर वापस जाएं",

    // Common
    "common.of": "का",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on initial render
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])

  const t = (key: string): string => {
    // Safely access translations
    if (!key) return ""

    const langTranslations = translations[language] || translations.en
    return langTranslations[key as keyof typeof langTranslations] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
