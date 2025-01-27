import { useEffect, useState, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { throttle } from 'lodash' 
import { 
  Home,
  User,
  Code2,
  FolderGit2,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
]

export function Navigation() {
    // track which section in view
    const [activeSection, setActiveSection] = useState("home")
    // theme handling with next-themes
    const { theme, setTheme } = useTheme()
    // reduce motion state
    const shouldReduceMotion = useReducedMotion() ?? false

    // throttle function to limit the number of times the scroll handler is called
    const handleScroll = throttle(() => {
      if (window.scrollY < 100) {
        setActiveSection("home")
      }
    }, 100)

    // toggle theme function - simplified with next-themes
    const toggleTheme = useCallback(() => {
      setTheme(theme === "dark" ? "light" : "dark")
    }, [theme, setTheme])

    // Intersection Observer setup
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              requestAnimationFrame(() => {
                setActiveSection(entry.target.id)
              })
            }
          })
        },
        { 
          threshold: 0.2,
          rootMargin: '-20% 0px -30% 0px'
        }
      )
      // get the elements to observe
      const elements = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean)
      // observe the elements
      elements.forEach(element => element && observer.observe(element))
  
      // add event listener for scroll
      window.addEventListener('scroll', handleScroll, { passive: true })
  
      // cleanup function to disconnect the observer and remove the event listener
      return () => {
        observer.disconnect()
        window.removeEventListener('scroll', handleScroll)
        handleScroll.cancel()
      }
    }, [handleScroll])

    // Motion variants
    const navVariants = shouldReduceMotion ? {
      hidden: { opacity: 1, x: 0 },
      visible: { opacity: 1, x: 0 }
    } : {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 }
    }

    return (
        <motion.nav 
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
            <motion.div 
                className="
                bg-background/50 dark:bg-background/30
                backdrop-blur-sm dark:backdrop-blur-md
                rounded-full p-2 
                border border-border dark:border-border/50
                dark:shadow-lg dark:shadow-primary/5"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            >
                <ul className="flex flex-col gap-4">
                    {navItems.map(({ id, label, icon: Icon }) => (
                        <motion.li 
                            key={id}
                            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: shouldReduceMotion ? 0 : navItems.findIndex(item => item.id === id) * 0.1 
                            }}
                        >
                            <a
                                href={`#${id}`}
                                className="group relative flex items-center"
                                onClick={(e) => {
                                    e.preventDefault()
                                    document.getElementById(id)?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" })
                                }}
                            >
                                <motion.span 
                                    className="absolute right-full mr-4 px-2 py-1 rounded-md bg-background/50 backdrop-blur-sm border border-border text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    {label}
                                </motion.span>

                                <motion.div
                                    className={`p-2 rounded-full transition-colors duration-200 ${
                                        activeSection === id
                                            ? "bg-primary/20 text-primary"
                                            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                                    }`}
                                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                                >
                                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                                </motion.div>
                            </a>
                        </motion.li>
                    ))}

                    <div className="mx-2 border-t border-border/50" />

                    <motion.li
                        initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: shouldReduceMotion ? 0 : 0.5 }}
                    >
                        <button
                            className="group relative flex items-center"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            <motion.span 
                                className="absolute right-full mr-4 px-2 py-1 rounded-md bg-background/50 backdrop-blur-sm border border-border text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                                Toggle theme
                            </motion.span>

                            <motion.div
                                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                            >
                                {theme === "dark" ? (
                                    <Sun className="w-5 h-5" strokeWidth={1.5} />
                                ) : (
                                    <Moon className="w-5 h-5" strokeWidth={1.5} />
                                )}
                            </motion.div>
                        </button>
                    </motion.li>
                </ul>
            </motion.div>
        </motion.nav>
    )
}