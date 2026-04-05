import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import eeiLogo from "@/assets/eei-logo.png";
import mineralLogo from "@/assets/mineral-resources-logo.png";
import sanediLogo from "@/assets/sanedi-logo.png";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-center"
          >
            <h1 className="text-lg font-extrabold text-foreground">
              Energy Efficiency
            </h1>
            <p className="text-sm font-medium text-muted-foreground">
              Appliance Calculator
            </p>
          </motion.div>

          <div className="flex items-center justify-center gap-6">
            {[
              { src: eeiLogo, alt: "EEI", delay: 0.3, h: "h-20" },
              { src: mineralLogo, alt: "Mineral Resources", delay: 0.5, h: "h-16" },
              { src: sanediLogo, alt: "SANEDI", delay: 0.7, h: "h-16" },
            ].map((logo) => (
              <motion.img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.h} w-auto object-contain`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: logo.delay, duration: 0.5 }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8"
          >
            <div className="h-1 w-24 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
