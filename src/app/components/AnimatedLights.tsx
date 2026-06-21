import React from 'react';
import { motion } from 'motion/react';

export function AnimatedLights() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-40 overflow-hidden pointer-events-none">
      {/* Light moving left to right */}
      <motion.div
        className="absolute h-full w-96 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70 blur-xl"
        animate={{
          x: ['-100%', '100vw'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
      />
      
      {/* Light moving right to left */}
      <motion.div
        className="absolute h-full w-96 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-70 blur-xl"
        animate={{
          x: ['100vw', '-100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Additional blue light */}
      <motion.div
        className="absolute h-full w-96 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70 blur-xl"
        animate={{
          x: ['-100%', '100vw'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
          delay: 1.5
        }}
      />

      {/* Orange/Yellow light */}
      <motion.div
        className="absolute h-full w-96 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70 blur-xl"
        animate={{
          x: ['100vw', '-100%'],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          repeatDelay: 1.8,
          ease: "easeInOut",
          delay: 4.5
        }}
      />
    </div>
  );
}
