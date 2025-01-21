import { motion, useScroll, useTransform } from "framer-motion"

const gradientColors = [
  "#000000", // Black
  "#1a237e", // Deep Blue
  "#1565c0", // Strong Blue
  "#0d47a1", // Royal Blue
  "#002171", // Navy
]

export function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
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
          className="absolute w-[50rem] h-[50rem] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${gradientColors[i]} 0%, transparent 70%)`,
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
            className="text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I'm{" "}
            <motion.span
              className="relative inline-block bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[2]}, ${gradientColors[4]})`,
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
            className="mt-8 text-2xl text-muted-foreground"
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
              className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium"
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