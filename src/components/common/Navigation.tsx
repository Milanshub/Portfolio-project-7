import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Home,
  User,
  Code2,
  FolderGit2,
} from "lucide-react"

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-background/50 backdrop-blur-sm rounded-full p-2 border border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ul className="flex flex-col gap-4">
          {navItems.map(({ id, label, icon: Icon }) => (
            <motion.li 
              key={id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.findIndex(item => item.id === id) * 0.1 }}
            >
              <a
                href={`#${id}`}
                className="group relative flex items-center"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {/* Label tooltip */}
                <motion.span 
                  className="absolute right-full mr-4 px-2 py-1 rounded-md bg-background/50 backdrop-blur-sm border border-border text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  {label}
                </motion.span>

                {/* Icon container */}
                <motion.div
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    activeSection === id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </motion.div>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  )
}