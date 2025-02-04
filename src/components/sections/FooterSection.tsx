import { memo, useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, X, Mail } from "lucide-react"

// Define social media links configuration
// Using 'as const' for type safety and immutability
const socialLinks = [
  { 
    name: "GitHub", 
    url: "https://github.com/milanshub", 
    icon: <Github className="w-5 h-5" strokeWidth={1.5} /> 
  },
  { 
    name: "LinkedIn", 
    url: "https://www.linkedin.com/in/milan-shubaev-88276465/", 
    icon: <Linkedin className="w-5 h-5" strokeWidth={1.5} /> 
  },
  { 
    name: "X", 
    url: "https://x.com/mil_654", 
    icon: <X className="w-5 h-5" strokeWidth={1.5} /> 
  },
  { 
    name: "Email", 
    url: "mailto:shubaevmilan@gmail.com", 
    icon: <Mail className="w-5 h-5" strokeWidth={1.5} /> 
  }
] as const

// SocialLinks: Renders social media links with hover animations
// Memoized to prevent unnecessary re-renders
const SocialLinks = memo(() => {
  // Memoize animation variants for consistent behavior
  const linkAnimation = useMemo(() => ({
    hover: { 
      scale: 1.1,
      rotate: 5,
    },
    tap: { 
      scale: 0.95 
    }
  }), [])

  return (
    <div className="flex gap-4">
      {socialLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-background/50 hover:bg-primary/10 transition-colors"
          whileHover={linkAnimation.hover}
          whileTap={linkAnimation.tap}
          aria-label={link.name}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  )
})

// Copyright: Displays copyright information with fade-in animation
// Memoized for performance optimization
const Copyright = memo(() => (
  <motion.div
    className="text-sm text-muted-foreground text-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    <p>© {new Date().getFullYear()} Milan. All rights reserved.</p>
  </motion.div>
))

// Main FooterSection component
// Implements scroll-based animations and layout
function FooterSection() {
  // Create ref for scroll-based animations
  const footerRef = useRef<HTMLElement>(null)

  // Set up scroll-based opacity animation
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["end end", "end start"]  // Animate between end of viewport and start of footer
  })
  
  // Transform scroll progress into opacity value
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])

  return (
    <motion.footer 
      ref={footerRef}
      className="relative bg-muted/50 py-8"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <SocialLinks />
          <Copyright />
        </div>
      </div>
    </motion.footer>
  )
}

// Add display names for React DevTools debugging
SocialLinks.displayName = 'SocialLinks'
Copyright.displayName = 'Copyright'
FooterSection.displayName = 'FooterSection'

export default FooterSection