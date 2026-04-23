import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { appContent } from "@/data/content";
import welcomeImg from "@/assets/onboarding-welcome.png";
import compareImg from "@/assets/onboarding-compare.png";
import labelImg from "@/assets/onboarding-label.png";
import billImg from "@/assets/onboarding-bill.png";

// bump key when tour content changes so existing users see it again
const STORAGE_KEY = "aec.onboarding.v6.completed";

const images = [welcomeImg, compareImg, labelImg, billImg];
const captions = [
  "What this app is for",
  "Smarter appliance choices",
  "Look for kWh/year on the label",
  "Check your municipal bill for the rate",
];

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

  const slides = appContent.onboarding;

  const next = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else finish();
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const slide = slides[step];
  const image = images[step] ?? images[0];
  const isLabelStep = step === 2;
  const isBillStep = step === 3;
  const isLastStep = step === slides.length - 1;

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
          <div className="flex items-center justify-between px-5 pt-12">
            <span className="text-xs font-semibold text-muted-foreground">
              {step + 1} / {slides.length}
            </span>
            <button
              onClick={finish}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Skip
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="flex w-full max-w-sm flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                  className="relative mb-6 flex h-56 w-56 items-center justify-center overflow-hidden rounded-3xl bg-accent/40 shadow-card"
                >
                  <motion.img
                    src={image}
                    alt={slide.title}
                    loading="lazy"
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.45, ease: "easeOut" }}
                    className="h-full w-full object-contain p-3"
                  />
                  {isLabelStep && (
                    <>
                      <motion.span
                        initial={{ opacity: 0, scaleX: 0.4 }}
                        animate={{ opacity: [0, 0.9, 0.9, 0], scaleX: [0.4, 1, 1, 1] }}
                        transition={{ delay: 0.5, duration: 2.2, repeat: Infinity, repeatDelay: 0.3, ease: "easeInOut" }}
                        className="pointer-events-none absolute left-8 right-10 top-1/2 h-2 origin-left -translate-y-1/2 rounded-full bg-secondary/70 blur-[2px]"
                      />
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.45, duration: 0.35, type: "spring", stiffness: 220 }}
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-elevated"
                      >
                        kWh / year
                      </motion.span>
                    </>
                  )}
                  {isBillStep && (
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.45, duration: 0.35, type: "spring", stiffness: 220 }}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-elevated"
                    >
                      Rate / kWh
                    </motion.span>
                  )}
                </motion.div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  {captions[step]}
                </p>
                <h2 className="text-xl font-extrabold leading-tight text-foreground">
                  {slide.title}
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {slide.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-6 pb-10">
            <div className="mb-5 flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? "w-6 bg-primary" : "w-1.5 bg-muted"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={back}
                disabled={step === 0}
                aria-label="Previous"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card disabled:opacity-30"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              {isLastStep ? (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={finish}
                  className="rounded-full eco-gradient px-6 py-4 text-sm font-bold text-primary-foreground shadow-elevated"
                >
                  Get Started
                </motion.button>
              ) : (
                <span className="text-xs font-medium text-muted-foreground">
                  Tap to continue
                </span>
              )}

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={next}
                aria-label="Next"
                className="flex h-14 w-14 items-center justify-center rounded-full eco-gradient text-primary-foreground shadow-elevated"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
