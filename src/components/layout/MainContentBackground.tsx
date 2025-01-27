import { motion } from "framer-motion"
import { ReactNode, Children } from "react"
import { useTheme } from "next-themes"

interface MainContentBackgroundProps {
  children: ReactNode
}

export function MainContentBackground({ children }: MainContentBackgroundProps) {
  const childrenArray = Children.toArray(children)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const gradientColors = {
    light: ["#3f51b5", "#303f9f"], // Indigo to Deep Royal Blue
    dark: ["#536dfe", "#304ffe"], // Bright Blue to Deep Blue
  }

  const colors = isDark ? gradientColors.dark : gradientColors.light

  return (
    <div className="relative">
      {/* Fixed background for main content sections */}
      <div className="fixed inset-0 z-0">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10"
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
              background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
              top: `${30 + i * 20}%`,
              left: `${20 + i * 30}%`,
              transform: 'translate(-50%, -50%)',
              filter: isDark ? 'blur(100px)' : 'blur(80px)',
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

        {/* Optional: Add a subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content container with dividers */}
      <div className="relative z-10">
        {childrenArray.map((child, index) => (
          <div key={index}>
            {index > 0 && (
              <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-border to-transparent dark:via-border/50" />
              </div>
            )}
            {child}
          </div>
        ))}
      </div>
    </div>
  )
} 