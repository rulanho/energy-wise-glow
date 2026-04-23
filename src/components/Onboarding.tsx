import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Scale, Tag, Leaf, type LucideIcon } from "lucide-react";
import { appContent } from "@/data/content";

const STORAGE_KEY = "aec.onboarding.v1.completed";

const icons: LucideIcon[] = [Sparkles, Scale, Tag, Leaf];

export function Onboarding() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  const next = () => {
    if (step < appContent.onboarding.length - 1) setStep(step + 1);
    else finish();
  };

  const slides = appContent.onboarding;
  const slide = slides[step];
  const Icon = icons[step] ?? Sparkles;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="onboarding"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex flex-col bg-background"
        >
          <div className="flex justify-end px-5 pt-12">
            <button
              onClick={finish}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Skip
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center"
              >
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl eco-gradient shadow-elevated">
                  <Icon className="h-12 w-12 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-extrabold leading-tight text-foreground">
                  {slide.title}
                </h2>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {slide.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-8 pb-12">
            <div className="mb-6 flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? "w-6 bg-primary" : "w-1.5 bg-muted"
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={next}
              className="w-full rounded-2xl eco-gradient py-4 text-base font-bold text-primary-foreground shadow-elevated"
            >
              {step === slides.length - 1 ? "Get Started" : "Next"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
