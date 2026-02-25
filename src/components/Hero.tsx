import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

export function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative pt-32 pb-16 px-4 flex flex-col items-center text-center overflow-hidden">
      {/* Subtle ITERA Logo Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Logo_ITERA.png/800px-Logo_ITERA.png"
          alt="Logo ITERA"
          className="w-[80vw] max-w-[800px] object-contain blur-sm"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-center"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent text-sm font-medium mb-6 border border-border">
            {t.badge}
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-blue-500 mb-2">
            Andreas Boni Baik Simamora
          </h2>
          <p className="text-lg text-foreground/60 font-mono">121290057</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60"
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 leading-relaxed"
        >
          {t.desc}
        </motion.p>
      </div>
    </section>
  );
}
