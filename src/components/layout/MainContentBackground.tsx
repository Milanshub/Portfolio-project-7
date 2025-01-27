import { motion } from "framer-motion"
import { ReactNode, Children } from "react"

interface MainContentBackgroundProps {
  children: ReactNode
}

export function MainContentBackground({ children }: MainContentBackgroundProps) {
  const childrenArray = Children.toArray(children)

  return (
    <div className="relative">
      {/* Fixed background for main content sections */}
      <div className="fixed inset-0 z-0">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"
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
              background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
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
      </div>

      {/* Content container with simple line divider */}
      <div className="relative z-10">
        {childrenArray.map((child, index) => (
          <div key={index}>
            {index > 0 && (
              <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="h-[2px] bg-gray-800/30" />
              </div>
            )}
            {child}
          </div>
        ))}
      </div>
    </div>
  )
} 