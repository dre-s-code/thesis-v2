import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Instagram, MessageCircle, Github, Terminal, MessageSquare, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

export function ContactWidget() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { language } = useLanguage();
  
  // Fallback if translation is missing
  const text = translations[language]?.contactMe || "Hubungi Saya";

  const contacts = [
    { name: "Email", icon: <Mail size={18} />, href: "mailto:andreassimamora0@gmail.com", color: "text-red-500 hover:bg-red-500/10 border-red-500/20" },
    { name: "Instagram", icon: <Instagram size={18} />, href: "https://instagram.com/andreassxs", color: "text-pink-500 hover:bg-pink-500/10 border-pink-500/20" },
    { name: "WhatsApp", icon: <MessageCircle size={18} />, href: "https://wa.me/6282281935807", color: "text-green-500 hover:bg-green-500/10 border-green-500/20" },
    { name: "GitHub", icon: <Github size={18} />, href: "https://github.com/dre-s-code", color: "text-gray-800 dark:text-gray-200 hover:bg-gray-500/10 border-gray-500/20" },
    { name: "StackOverflow", icon: <Terminal size={18} />, href: "https://stackoverflow.com/users/27435662/andreasss", color: "text-orange-500 hover:bg-orange-500/10 border-orange-500/20" },
    { name: "Reddit", icon: <MessageSquare size={18} />, href: "https://www.reddit.com/user/Individual_Poet5359/", color: "text-orange-600 hover:bg-orange-600/10 border-orange-600/20" },
  ];

  const showBubbles = isHovered || isLocked;

  return (
    <div 
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
      onMouseEnter={() => !isLocked && setIsHovered(true)}
      onMouseLeave={() => !isLocked && setIsHovered(false)}
    >
      <div className="absolute right-full mr-4 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {showBubbles && contacts.map((contact, i) => (
            <motion.a
              key={contact.name}
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full bg-background/95 backdrop-blur-md border shadow-lg transition-transform hover:scale-105 ${contact.color}`}
              title={contact.name}
            >
              {contact.icon}
              <span className="font-medium text-sm whitespace-nowrap">{contact.name}</span>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative flex flex-col items-center gap-2">
        <AnimatePresence>
          {isLocked && (
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 10 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLocked(false);
                setIsHovered(false);
              }}
              className="absolute -top-12 bg-destructive text-destructive-foreground p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
              title="Tutup"
            >
              <X size={16} />
            </motion.button>
          )}
        </AnimatePresence>

        <button 
          className={`bg-blue-600 text-white shadow-lg border border-blue-500/50 transition-all duration-300 flex items-center justify-center hover:-translate-x-1 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] ${isLocked ? '-translate-x-1 shadow-[0_0_15px_rgba(59,130,246,0.6)] bg-blue-700' : ''}`}
          style={{ 
            writingMode: 'vertical-rl', 
            textOrientation: 'mixed',
            padding: '24px 8px',
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px',
          }}
          onClick={() => setIsLocked(true)}
        >
          <span className="font-medium tracking-wider text-sm rotate-180">{text}</span>
        </button>
      </div>
    </div>
  );
}
