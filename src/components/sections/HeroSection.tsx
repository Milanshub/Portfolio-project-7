import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

const gradientColors = {
  light: [
    "#000000", // Black
    "#3f51b5", // Indigo
    "#3949ab", // Royal Blue
    "#303f9f", // Deep Royal Blue
    "#283593", // Dark Royal Blue
  ],
  dark: [
    "#F4F4FF", // Bright tech white
    "#E2E1FF", // Tech purple
    "#D1D1FF", // Neon purple
    "#C0BEFF", // Deep tech purple
    "#A7A4FF"  // Rich tech purple
  ]
} as const

export function HeroSection() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [0, 1], [-5, 5])
  const rotateY = useTransform(mouseX, [0, 1], [5, -5])

  // Enhanced mouse effects
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorSize = useMotionValue(16)
  
  // Theme handling
  const { theme } = useTheme()
  const colors = theme === 'dark' ? gradientColors.dark : gradientColors.light
  
  // Create a more dynamic glow effect that follows the mouse
  const glowBackground = useMotionTemplate`
    radial-gradient(
      circle at ${cursorX}px ${cursorY}px,
      var(--primary)/20 0%,
      var(--primary)/10 25%,
      transparent 50%
    )
  `

  const handleMouseMove = (e: React.PointerEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    
    // Update rotation values
    mouseX.set((e.clientX - bounds.left) / bounds.width)
    mouseY.set((e.clientY - bounds.top) / bounds.height)
    
    // Update cursor position - Fixed positioning
    cursorX.set(e.clientX)  // Changed to use clientX directly
    cursorY.set(e.clientY)  // Changed to use clientY directly
  }

  // Remove button hover handlers and keep only name hover handlers
  const handleNameHover = () => {
    cursorSize.set(120) // Larger size for name hover
  }

  const handleNameLeave = () => {
    cursorSize.set(40) // Back to normal size
  }

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden cursor-none"
      onPointerMove={handleMouseMove}
      onPointerEnter={() => cursorSize.set(40)}
      onPointerLeave={() => cursorSize.set(16)}
    >
      {/* Custom Cursor - Updated with smoother transitions */}
      <motion.div
        className="fixed w-4 h-4 pointer-events-none mix-blend-difference"
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
        transition={{ 
          type: "spring", 
          stiffness: 300, // Reduced stiffness for smoother transitions
          damping: 25,
          mass: 0.8 // Increased mass for smoother movement
        }}
      />

      {/* Dynamic Grid Backdrop */}
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

      {/* Glow Effect Layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: glowBackground }}
      />

      {/* Floating Text Container with even more padding */}
      <motion.div 
        className="relative z-10 text-center space-y-6"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Name section with larger hover area but maintaining visual spacing */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold tracking-tighter py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onMouseEnter={handleNameHover}
          onMouseLeave={handleNameLeave}
        >
          <span 
            className="text-muted-foreground px-4 py-12 inline-block"
            onMouseEnter={handleNameHover}
            onMouseLeave={handleNameLeave}
          >
            I'm{" "}
          </span>
          <motion.span
            className="relative inline-block bg-clip-text text-transparent px-4 py-12"
            style={{
              background: `linear-gradient(60deg, 
                ${colors[0]}, 
                ${colors[1]}, 
                ${colors[2]}, 
                ${colors[3]}, 
                ${colors[4]},
                ${colors[0]})`,
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            onMouseEnter={handleNameHover}
            onMouseLeave={handleNameLeave}
          >
            Milan
          </motion.span>
          <motion.span 
            className="ml-2 text-muted-foreground px-4 py-12 inline-block"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            onMouseEnter={handleNameHover}
            onMouseLeave={handleNameLeave}
          >
            .
          </motion.span>
        </motion.h1>

        {/* Dynamic Subheading */}
        <motion.p
          className="text-xl md:text-2xl font-medium max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          A passionate developer crafting beautiful and functional web experiences.
        </motion.p>

        {/* Button with removed cursor effects */}
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
      </motion.div>

      {/* Floating Grid Particles */}
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