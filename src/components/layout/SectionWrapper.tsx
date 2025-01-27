import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  id: string
  className?: string
}

export function SectionWrapper({ 
  children, 
  id, 
  className = ""
}: SectionWrapperProps) {
  return (
    <motion.section 
      id={id}
      className={`min-h-screen py-20 relative flex items-center ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.section>
  )
} 