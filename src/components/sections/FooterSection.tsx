import { memo, useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, X, Mail } from "lucide-react"

// Move static data outside component
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

// Memoize social links component
const SocialLinks = memo(() => {
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

// Memoize copyright component
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

function FooterSection() {
  // Create ref for footer element
  const footerRef = useRef<HTMLElement>(null)

  // Optimize scroll-based animations
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["end end", "end start"]
  })
  
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

// Add display names for debugging
SocialLinks.displayName = 'SocialLinks'
Copyright.displayName = 'Copyright'
FooterSection.displayName = 'FooterSection'

export default FooterSection