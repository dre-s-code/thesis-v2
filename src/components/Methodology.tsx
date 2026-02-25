import { useState } from "react";
import { motion } from "motion/react";
import { Database, Cpu, SlidersHorizontal, Layers } from "lucide-react";
import { Modal } from "./Modal";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

export function Methodology() {
  const { language } = useLanguage();
  const t = translations[language].methodology;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const icons = [
    <Database size={24} />,
    <Cpu size={24} />,
    <SlidersHorizontal size={24} />,
    <Layers size={24} />
  ];

  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          {t.title}
        </h2>
        <p className="text-foreground/60">
          {t.desc}
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {t.steps.map((step: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center text-center group cursor-pointer"
              onClick={() => setSelectedIndex(i)}
            >
              <div className="w-16 h-16 rounded-full bg-card border-2 border-border flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:border-blue-500 transition-all group-hover:text-blue-500">
                {icons[i]}
              </div>
              <h3 className="font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-foreground/60">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        title={selectedIndex !== null ? t.steps[selectedIndex].title : ""}
      >
        {selectedIndex !== null && (
          <div className="mt-2">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="p-3 bg-background rounded-2xl border border-border text-blue-500">
                {icons[selectedIndex]}
              </div>
              <div>
                <p className="text-xl font-bold">
                  {t.steps[selectedIndex].title}
                </p>
                <p className="text-sm text-foreground/60">
                  {t.steps[selectedIndex].desc}
                </p>
              </div>
            </div>
            <div className="text-foreground/80">
              {t.steps[selectedIndex].details}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
