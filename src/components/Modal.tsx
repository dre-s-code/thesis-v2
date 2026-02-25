import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed left-[50%] top-[50%] z-50 grid w-full ${maxWidth} translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-card p-6 shadow-lg sm:rounded-3xl`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-accent transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="text-foreground/80 leading-relaxed max-h-[80vh] overflow-y-auto pr-2">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
