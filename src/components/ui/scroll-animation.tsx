'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export default function ScrollAnimation({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = ''
}: ScrollAnimationProps) {
  // Define animation variants based on direction
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: false, // Animation happens every time element enters viewport
        margin: "-100px" // Trigger animation 100px before element enters viewport
      }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// Specialized components for different animation types
export function FadeInUp({ children, delay = 0, className = '' }: { 
  children: ReactNode; 
  delay?: number; 
  className?: string;
}) {
  return (
    <ScrollAnimation direction="up" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function FadeInDown({ children, delay = 0, className = '' }: { 
  children: ReactNode; 
  delay?: number; 
  className?: string;
}) {
  return (
    <ScrollAnimation direction="down" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function FadeInLeft({ children, delay = 0, className = '' }: { 
  children: ReactNode; 
  delay?: number; 
  className?: string;
}) {
  return (
    <ScrollAnimation direction="left" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function FadeInRight({ children, delay = 0, className = '' }: { 
  children: ReactNode; 
  delay?: number; 
  className?: string;
}) {
  return (
    <ScrollAnimation direction="right" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

// Stagger animation for multiple elements
export function StaggerContainer({ children, className = '' }: {
  children: ReactNode;
  className?: string;
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each child animation
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: {
  children: ReactNode;
  className?: string;
}) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}