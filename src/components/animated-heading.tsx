'use client';

import { motion } from 'framer-motion';

const letterVariant = {
  hover: {
    scale: 1.5,
    transition: { type: 'spring', stiffness: 300 },
  },
  initial: {
    scale: 1,
  },
};

export function AnimatedHeading({ text, className }: { text: string, className?: string }) {
  return (
    <h1 className={className}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-4">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              variants={letterVariant}
              whileHover="hover"
              initial="initial"
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}
