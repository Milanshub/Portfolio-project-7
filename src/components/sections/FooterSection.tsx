import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, X, Mail } from "lucide-react"

const socialLinks = [
  { name: "GitHub", url: "https://github.com/milanshub", icon: <Github className="w-5 h-5" /> },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/milan-shubaev-88276465/", icon: <Linkedin className="w-5 h-5" /> },
  { name: "X", url: "https://x.com/mil_654", icon: <X className="w-5 h-5" /> },
  { name: "Email", url: "mailto:shubaevmilan@gmail.com", icon: <Mail className="w-5 h-5" /> }
]

export function FooterSection() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])

  return (
    <motion.footer 
      className="relative bg-muted/50 py-8"
      style={{ opacity }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/50 hover:bg-primary/10 transition-colors"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">{link.name}</span>
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            className="text-sm text-muted-foreground text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>
              © {new Date().getFullYear()} Milan. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}