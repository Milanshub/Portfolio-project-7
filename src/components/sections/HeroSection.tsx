import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import { useMemo, useCallback, useEffect } from 'react'
import { measurePerformance } from '../../utils/performance'

export function HeroSection() {
  // Performance measurement in development environment
  useEffect(() => {
    const endMeasure = measurePerformance('HeroSection')
    return endMeasure
  })

  const { theme } = useTheme()
  
  // Motion values for cursor and mouse tracking
  const mouseX = useMotionValue(0)        // Tracks mouse X position (0 to 1)
  const mouseY = useMotionValue(0)        // Tracks mouse Y position (0 to 1)
  const cursorX = useMotionValue(-100)    // Actual cursor X position in pixels
  const cursorY = useMotionValue(-100)    // Actual cursor Y position in pixels
  const cursorSize = useMotionValue(16)   // Dynamic cursor size

  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [0, 1], [-5, 5])  // Vertical tilt
  const rotateY = useTransform(mouseX, [0, 1], [5, -5])  // Horizontal tilt
  
  // Optimized mouse move handler using requestAnimationFrame
  const handleMouseMove = useCallback((e: React.PointerEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    
    requestAnimationFrame(() => {
      // Convert mouse position to normalized values (0 to 1)
      mouseX.set((e.clientX - bounds.left) / bounds.width)
      mouseY.set((e.clientY - bounds.top) / bounds.height)
      // Update actual cursor position
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    })
  }, [mouseX, mouseY, cursorX, cursorY])

  // Handlers for interactive cursor effects
  const handleNameHover = useCallback(() => {
    requestAnimationFrame(() => cursorSize.set(250))  // Expand cursor on name hover
  }, [cursorSize])

  const handleNameLeave = useCallback(() => {
    requestAnimationFrame(() => cursorSize.set(30))   // Shrink cursor when leaving name
  }, [cursorSize])

  const handleSectionLeave = useCallback(() => {
    requestAnimationFrame(() => {
      document.body.style.cursor = 'auto'
      cursorSize.set(16)
      cursorX.set(-100)
      cursorY.set(-100)
    })
  }, [cursorSize, cursorX, cursorY])

  const handleSectionEnter = useCallback(() => {
    requestAnimationFrame(() => {
      document.body.style.cursor = 'none'  // Hide default cursor
      cursorSize.set(30)                   // Set initial custom cursor size
    })
  }, [cursorSize])

  // Animation variants for custom cursor
  const cursorVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8,
      }
    }
  }), [])

  // Dynamic glow effect that follows mouse movement
  const glowBackground = useMotionTemplate`
    radial-gradient(
      circle at ${cursorX}px ${cursorY}px,
      var(--primary)/20 0%,
      var(--primary)/10 25%,
      transparent 50%
    )
  `

  return (
    <section 
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onPointerMove={handleMouseMove}
      onPointerEnter={handleSectionEnter}
      onPointerLeave={handleSectionLeave}
    >
      {/* Custom cursor element */}
      <motion.div
        className="fixed w-4 h-4 pointer-events-none mix-blend-difference"
        variants={cursorVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
          backgroundColor: 'white',
          borderRadius: '50%',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Animated grid background */}
      <motion.div 
        className="absolute inset-0 opacity-10 dark:opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 100%), repeating-linear-gradient(180deg, currentColor 0 1px, transparent 1px 100%)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)'
        }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'] 
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Mouse-following glow effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: glowBackground }}
      />

      {/* Main content container with 3D rotation */}
      <motion.div 
        className="relative z-10 text-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Animated name heading */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold tracking-tighter py-32 mb-0 px-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onMouseEnter={handleNameHover}
          onMouseLeave={handleNameLeave}
        >
          <span 
            className="text-muted-foreground px-8 py-16 inline-block"
            onMouseEnter={handleNameHover}
            onMouseLeave={handleNameLeave}
          >
            Hello, I'm{" "}
          </span>
          {/* Animated gradient name */}
          <motion.span
            className={`
              relative inline-block px-8 py-16
              bg-gradient-to-r from-primary via-secondary to-primary
              dark:from-primary/90 dark:via-secondary/90 dark:to-primary/90
              bg-clip-text text-transparent
              bg-[length:200%_auto]
              transition-all duration-300
            `}
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              color: theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--primary))',
            }}
            onMouseEnter={handleNameHover}
            onMouseLeave={handleNameLeave}
          >
            Milan.
          </motion.span>
        </motion.h1>

        {/* Subheading and button container */}
        <div className="-mt-28 relative">
          {/* Animated subheading */}
          <motion.p
            className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            A passionate developer crafting beautiful and functional web experiences.
          </motion.p>

          {/* Animated resume button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block p-8"
          >
            <button 
              className="px-12 py-4 rounded-full bg-primary/10 hover:bg-primary/20 backdrop-blur-sm border border-primary/20 text-primary font-medium transition-all"
            >
              Resume
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </section>
  )
}