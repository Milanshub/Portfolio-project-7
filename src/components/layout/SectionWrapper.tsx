import { motion } from "framer-motion"
import { ReactNode, memo } from "react"

interface SectionWrapperProps {
  children: ReactNode
  id: string
  className?: string
}

// Memoize gradient overlay
const GradientOverlay = memo(() => (
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10 opacity-50" />
))

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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <GradientOverlay />
      
      <div className="relative w-full">
        {children}
      </div>
    </motion.section>
  )
})

// Add display names
GradientOverlay.displayName = 'GradientOverlay'
SectionWrapper.displayName = 'SectionWrapper' 