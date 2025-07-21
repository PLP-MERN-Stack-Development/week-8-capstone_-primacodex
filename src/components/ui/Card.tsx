import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glass = false,
}) => {
  const baseClasses = 'rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm';
  const glassClasses = 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-white/20 dark:border-gray-700/50';
  const hoverClasses = 'hover:shadow-lg transition-shadow duration-200 cursor-pointer';

  const Component = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -2 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={cn(
        baseClasses,
        glass && glassClasses,
        hover && hoverClasses,
        className
      )}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default Card;