import { Moon, Sun, Globe, ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

const languageOptions = [
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languageOptions.find(l => l.code === language) || languageOptions[0];
  const t = translations[language].nav;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-xl tracking-tighter">
          {t.title} <span className="text-blue-500">Andreas</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-accent transition-colors text-sm font-medium border border-transparent hover:border-border"
            >
              <Globe size={18} className="text-foreground/70" />
              <span className="hidden sm:inline-block">{currentLang.name}</span>
              <ChevronDown size={14} className={`text-foreground/50 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-card border border-border rounded-2xl shadow-lg flex flex-col z-50 overflow-hidden">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setLangOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-accent transition-colors ${
                      currentLang.code === lang.code ? 'bg-accent/50 font-semibold text-blue-500' : 'text-foreground/80'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-accent transition-colors border border-transparent hover:border-border"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} className="text-foreground/70" /> : <Moon size={20} className="text-foreground/70" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
