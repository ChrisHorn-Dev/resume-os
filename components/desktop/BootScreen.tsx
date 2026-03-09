"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_DURATION_MS = 2400;

export default function BootScreen() {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState<"brand" | "bar">("brand");

  useEffect(() => {
    const t1 = setTimeout(() => setStep("bar"), 600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    const t2 = setTimeout(() => setVisible(false), BOOT_DURATION_MS);
    return () => clearTimeout(t2);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-[var(--background)]"
          aria-live="polite"
          aria-label="Loading"
        >
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
                Chris Horn OS
              </h2>
              <p className="mt-2 text-[13px] text-zinc-500">
                {step === "brand"
                  ? "Initializing..."
                  : "Loading workspace..."}
              </p>
            </div>
            {step === "bar" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="h-1 w-32 overflow-hidden rounded-full bg-white/[0.08]"
              >
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1.1,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
