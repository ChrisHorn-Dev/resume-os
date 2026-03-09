"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_DURATION_MS = 1800;

export default function BootScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), BOOT_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--background)]"
          aria-live="polite"
          aria-label="Loading"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-sm font-medium text-zinc-500"
            >
              Resume OS
            </motion.div>
            <motion.div
              className="h-1 w-24 overflow-hidden rounded-full bg-zinc-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-[var(--accent)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
