import { motion } from "framer-motion"
import { ReactNode, memo } from "react"

// Type definitions for component props
interface SectionWrapperProps {
  children: ReactNode  // Content to be wrapped
  id: string          // Section identifier for navigation
  className?: string  // Optional additional styling
}

// GradientOverlay: Creates a subtle animated gradient effect
// Memoized to prevent unnecessary re-renders
const GradientOverlay = memo(() => (
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10 opacity-50" />
))

// SectionWrapper: Provides consistent styling and animations for page sections
// Memoized for performance optimization
export const SectionWrapper = memo(({ 
  children, 
  id, 
  className = ""
}: SectionWrapperProps) => {
  return (
    <motion.section 
      id={id}
      className={`
        relative min-h-screen py-20
        flex items-center 
        bg-gradient-to-b from-transparent via-background to-transparent
        dark:from-background/0 dark:via-background/80 dark:to-background/0
        ${className}
      `}
      // Animation properties for section entrance
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Gradient overlay for visual depth */}
      <GradientOverlay />
      
      {/* Content container with relative positioning */}
      <div className="relative w-full">
        {children}
      </div>
    </motion.section>
  )
})

// Add display names for React DevTools debugging
GradientOverlay.displayName = 'GradientOverlay'
SectionWrapper.displayName = 'SectionWrapper' 