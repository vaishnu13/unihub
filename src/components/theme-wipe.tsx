'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Wipe = {
  show: boolean;
};

type ThemeWipeProps = {
  wipe: Wipe;
  onAnimationComplete: () => void;
};

export function ThemeWipe({ wipe, onAnimationComplete }: ThemeWipeProps) {
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    if (wipe.show) {
      setIsWiping(true);
    }
  }, [wipe.show]);

  const handleAnimationComplete = () => {
    setIsWiping(false);
    onAnimationComplete();
  };

  return (
    <AnimatePresence>
      {isWiping && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: 0 }}
            animate={{
              width: "100%",
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            onAnimationComplete={handleAnimationComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
