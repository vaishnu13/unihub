'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Ripple = {
  x: number;
  y: number;
  show: boolean;
};

type ThemeRippleProps = {
  ripple: Ripple;
  onAnimationComplete: () => void;
};

export function ThemeRipple({ ripple, onAnimationComplete }: ThemeRippleProps) {
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (ripple.show) {
      setIsRippling(true);
    }
  }, [ripple.show]);

  const handleAnimationComplete = () => {
    setIsRippling(false);
    onAnimationComplete();
  };

  return (
    <AnimatePresence>
      {isRippling && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute rounded-full bg-primary/20"
            style={{
              top: ripple.y,
              left: ripple.x,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 1, width: 0, height: 0 }}
            animate={{
              scale: 1,
              opacity: 0,
              width: Math.max(window.innerWidth, window.innerHeight) * 2.5,
              height: Math.max(window.innerWidth, window.innerHeight) * 2.5,
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onAnimationComplete={handleAnimationComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
