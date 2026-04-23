import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { appContent } from "@/data/content";
import welcomeImg from "@/assets/onboarding-welcome.png";
import compareImg from "@/assets/onboarding-compare.png";
import labelImg from "@/assets/onboarding-label.png";
import billImg from "@/assets/onboarding-bill.png";
import saveImg from "@/assets/onboarding-save.png";

// bump key when tour content changes so existing users see it again
const STORAGE_KEY = "aec.onboarding.v3.completed";

const images = [welcomeImg, compareImg, labelImg, billImg, saveImg];
const captions = [
  "A quick tour of the app",
  "Tap any appliance to start",
  "Look for kWh/year on the label",
  "Check your municipal bill for the rate",
  "Smarter choices, lower bills",
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

  const next = () => {
    if (step < appContent.onboarding.length - 1) setStep(step + 1);
    else finish();
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const slides = appContent.onboarding;
  const slide = slides[step];
  const image = images[step] ?? images[0];
  const isLabelStep = step === 2;
  const isBillStep = step === 3;

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
                <div className="relative mb-6 flex h-56 w-56 items-center justify-center rounded-3xl bg-accent/40 shadow-card">
                  <img
                    src={image}
                    alt={slide.title}
                    loading="lazy"
                    className="h-full w-full object-contain p-3"
                  />
                  {isLabelStep && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-elevated">
                      kWh / year
                    </span>
                  )}
                  {isBillStep && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-elevated">
                      Rate / kWh
                    </span>
                  )}
                </div>
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
            <div className="flex items-center gap-3">
              {step > 0 && (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={back}
                  className="rounded-2xl border border-border bg-card px-5 py-4 text-sm font-bold text-foreground"
                >
                  Back
                </motion.button>
              )}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={next}
                className="flex-1 rounded-2xl eco-gradient py-4 text-base font-bold text-primary-foreground shadow-elevated"
              >
                {step === slides.length - 1 ? "Get Started" : "Next"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
