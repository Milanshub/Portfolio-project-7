import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

// Define navigation items with their respective icons and labels
// This array is used to generate the navigation links dynamically
const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
]

export function Navigation() {
    // State management for active section, theme, and navigation visibility
    const [activeSection, setActiveSection] = useState("home")
    const { theme, setTheme } = useTheme()
    const [isNavVisible, setIsNavVisible] = useState(false)

    // Throttled scroll handler to prevent excessive updates
    // Sets active section to "home" when near the top of the page
    const handleScroll = throttle(() => {
      if (window.scrollY < 100) {
        setActiveSection("home")
      }
    }, 100, { leading: true })

    // Theme toggle handler - switches between light and dark modes
    const toggleTheme = useCallback(() => {
      setTheme(theme === "dark" ? "light" : "dark")
    }, [theme, setTheme])

    // Smooth scroll handler for navigation items
    // Scrolls to top for home, or to the respective section for other items
    const scrollToSection = useCallback((id: string) => {
      if (id === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
        setActiveSection("home")
      } else {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth",
            block: "start" 
          })
        }
      }
    }, [])

    useEffect(() => {
      // Delay the navigation appearance for a smoother initial load
      const timer = setTimeout(() => setIsNavVisible(true), 500)

      // Set up Intersection Observer to track which section is currently in view
      // This updates the active navigation item based on scroll position
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
          threshold: 0.2, // 20% of the element must be visible
          rootMargin: '-20% 0px -30% 0px' // Adjusts the detection box
        }
      )

      // Observe all navigation sections
      const elements = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean)
      elements.forEach(element => element && observer.observe(element))
      window.addEventListener('scroll', handleScroll, { passive: true })

      // Cleanup function to remove observers and event listeners
      return () => {
        clearTimeout(timer)
        observer.disconnect()
        window.removeEventListener('scroll', handleScroll)
        handleScroll.cancel()
      }
    }, [handleScroll])

    // Animation variants for the main navigation container
    const navVariants = {
      hidden: { 
        opacity: 0, 
        x: 20 
      },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    }

    // Animation variants for individual navigation items
    const itemVariants = {
      hidden: { 
        opacity: 0, 
        x: 10 
      },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        }
      }
    }

    return (
      // AnimatePresence enables exit animations
      <AnimatePresence>
        {isNavVisible && (
          <motion.nav 
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Main navigation container with glass effect */}
            <motion.div 
              className="bg-background/50 dark:bg-background/30 backdrop-blur-sm dark:backdrop-blur-md
                        rounded-full p-2 border border-border dark:border-border/50
                        dark:shadow-lg dark:shadow-primary/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <ul className="flex flex-col gap-4">
                {/* Map through navigation items to create links */}
                {navItems.map(({ id, label, icon: Icon }, index) => (
                  <motion.li 
                    key={id}
                    variants={itemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={`#${id}`}
                      className="group relative flex items-center"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(id)
                      }}
                    >
                      {/* Tooltip label that appears on hover */}
                      <motion.span 
                        className="absolute right-full mr-4 px-2 py-1 rounded-md 
                                 bg-background/50 backdrop-blur-sm border border-border 
                                 text-sm opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.2 }}
                      >
                        {label}
                      </motion.span>

                      {/* Navigation icon with active/hover states */}
                      <motion.div
                        className={`p-2 rounded-full transition-all duration-200 ${
                          activeSection === id
                            ? "bg-primary/20 text-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </motion.div>
                    </a>
                  </motion.li>
                ))}

                {/* Divider line before theme toggle */}
                <div className="mx-2 border-t border-border/50" />

                {/* Theme toggle button */}
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <button
                    className="group relative flex items-center"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                  >
                    {/* Theme toggle tooltip */}
                    <motion.span 
                      className="absolute right-full mr-4 px-2 py-1 rounded-md 
                               bg-background/50 backdrop-blur-sm border border-border 
                               text-sm opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    >
                      Toggle theme
                    </motion.span>

                    {/* Theme toggle icon */}
                    <motion.div
                      className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
        )}
      </AnimatePresence>
    )
}