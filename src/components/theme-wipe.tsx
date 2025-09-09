'use client';

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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (wipe.show) {
      setIsWiping(true);
    }
  }, [wipe.show]);

  const handleAnimationComplete = () => {
    setIsWiping(false);
    onAnimationComplete();
  };

  const svgVariants = {
    initial: {
      d: `M0,${dimensions.height} C${dimensions.width / 2},${dimensions.height} ${dimensions.width / 2},${dimensions.height} ${dimensions.width},${dimensions.height} L${dimensions.width},${dimensions.height} L0,${dimensions.height} Z`
    },
    animate: {
      d: `M0,${dimensions.height} C${dimensions.width / 2},0 ${dimensions.width / 2},0 ${dimensions.width},${dimensions.height} L${dimensions.width},0 L0,0 Z`,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        d: `M0,0 C${dimensions.width / 2},0 ${dimensions.width / 2},0 ${dimensions.width},0 L${dimensions.width},0 L0,0 Z`,
        transition: { duration: 0.8, ease: [0.64, 0, 0.78, 0] }
    }
  };

  return (
    <AnimatePresence>
      {isWiping && dimensions.width > 0 && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.8 } }}
          onAnimationComplete={handleAnimationComplete}
        >
          <motion.svg
            className="w-full h-full"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            preserveAspectRatio="none"
          >
            <motion.path
              fill="hsl(var(--primary))"
              variants={svgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
