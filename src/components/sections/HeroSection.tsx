import { motion, useScroll, useTransform } from "framer-motion"
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
    "#ffffff", // White
    "#8c9eff", // Light Blue
    "#536dfe", // Bright Blue
    "#3d5afe", // Vivid Blue
    "#304ffe", // Deep Blue
  ]
}

export function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const colors = isDark ? gradientColors.dark : gradientColors.light

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Large floating orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[50rem] h-[50rem] rounded-full opacity-20 dark:opacity-30"
          style={{
            background: `radial-gradient(circle, ${colors[i]} 0%, transparent 70%)`,
            top: `${30 + i * 20}%`,
            left: `${20 + i * 30}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          style={{ y, opacity }}
        >
          <motion.h1 
            className="text-8xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I'm{" "}
            <motion.span
              className="relative inline-block bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(45deg, ${colors[0]}, ${colors[2]}, ${colors[4]})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Milan
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-8 text-3xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A passionate developer crafting beautiful and functional web experiences.
          </motion.p>

          <motion.div
            className="mt-12 flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="/public/assets/resume.pdf"
              download="MyResume.pdf" 
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 dark:hover:bg-primary/80 transition-colors duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}