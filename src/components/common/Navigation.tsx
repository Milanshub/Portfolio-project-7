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

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
]

export function Navigation() {
    const [activeSection, setActiveSection] = useState("home")
    const { theme, setTheme } = useTheme()
    const [isNavVisible, setIsNavVisible] = useState(false)

    const handleScroll = throttle(() => {
      if (window.scrollY < 100) {
        setActiveSection("home")
      }
    }, 100, { leading: true })

    const toggleTheme = useCallback(() => {
      setTheme(theme === "dark" ? "light" : "dark")
    }, [theme, setTheme])

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
      const timer = setTimeout(() => setIsNavVisible(true), 500)

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

      const elements = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean)
      elements.forEach(element => element && observer.observe(element))
      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        clearTimeout(timer)
        observer.disconnect()
        window.removeEventListener('scroll', handleScroll)
        handleScroll.cancel()
      }
    }, [handleScroll])

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
      <AnimatePresence>
        {isNavVisible && (
          <motion.nav 
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              className="bg-background/50 dark:bg-background/30 backdrop-blur-sm dark:backdrop-blur-md
                        rounded-full p-2 border border-border dark:border-border/50
                        dark:shadow-lg dark:shadow-primary/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <ul className="flex flex-col gap-4">
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
                      <motion.span 
                        className="absolute right-full mr-4 px-2 py-1 rounded-md 
                                 bg-background/50 backdrop-blur-sm border border-border 
                                 text-sm opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.2 }}
                      >
                        {label}
                      </motion.span>

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

                <div className="mx-2 border-t border-border/50" />

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
                    <motion.span 
                      className="absolute right-full mr-4 px-2 py-1 rounded-md 
                               bg-background/50 backdrop-blur-sm border border-border 
                               text-sm opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    >
                      Toggle theme
                    </motion.span>

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