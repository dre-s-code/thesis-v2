import { useState } from "react";
import { motion } from "motion/react";
import {
  CloudRain,
  Activity,
  BarChart3,
  Target,
  Zap,
  Layers,
} from "lucide-react";
import { Modal } from "./Modal";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

export function BentoGrid() {
  const { language } = useLanguage();
  const t = translations[language].bento;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const icons = [
    <Target className="text-green-500" size={24} />,
    <Layers className="text-blue-500" size={24} />,
    <BarChart3 className="text-purple-500" size={24} />,
    <Zap className="text-yellow-500" size={24} />,
    <CloudRain className="text-cyan-500" size={24} />,
    <Activity className="text-rose-500" size={24} />
  ];

  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          {t.title}
        </h2>
        <p className="text-foreground/60">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {t.items.map((item: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            onClick={() => setSelectedIndex(i)}
            className={`p-6 rounded-3xl border border-border bg-card hover:bg-accent/50 transition-colors group cursor-pointer ${item.colSpan}`}
          >
            <div className="mb-4 p-3 bg-background rounded-2xl inline-block border border-border group-hover:scale-110 transition-transform">
              {icons[i]}
            </div>
            <h3 className="text-sm font-medium text-foreground/60 mb-1">
              {item.title}
            </h3>
            <p className="text-2xl font-bold tracking-tight mb-2">
              {item.value}
            </p>
            <p className="text-sm text-foreground/60">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        title={selectedIndex !== null ? t.items[selectedIndex].title : ""}
        maxWidth={selectedIndex !== null && t.items[selectedIndex].largeModal ? "max-w-4xl" : "max-w-lg"}
      >
        {selectedIndex !== null && (
          <div className="mt-2">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="p-3 bg-background rounded-2xl border border-border">
                {icons[selectedIndex]}
              </div>
              <div>
                <p className="text-xl font-bold">
                  {t.items[selectedIndex].value}
                </p>
                <p className="text-sm text-foreground/60">
                  {t.items[selectedIndex].desc}
                </p>
              </div>
            </div>
            <div className="text-foreground/80 leading-relaxed">
              {t.items[selectedIndex].details}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
