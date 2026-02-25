import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="border-t border-border mt-20 py-8 text-center text-foreground/50 text-sm">
      <p>© 2025 Andreas Boni Baik Simamora (121290057)</p>
      <p className="mt-1">
        {t.program}
      </p>
    </footer>
  );
}
