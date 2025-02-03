import { memo, useMemo } from 'react'
import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

// Move static data outside component
const profileGradientColors = [
  "#4B0082", // Indigo
  "#6A5ACD", // Slate blue
  "#483D8B", // Dark slate blue
  "#4169E1", // Royal blue
  "#1E90FF", // Dodger blue
] as const

// Memoize static content sections
const TechnicalEvolution = memo(() => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
    viewport={{ once: true, margin: "100px" }}
    className="border-l-4 border-primary/20 pl-6"
  >
    <h3 className="text-2xl font-semibold mb-4 text-foreground">
      Technical Evolution
    </h3>
    <p className="leading-relaxed">
      Self-taught developer specializing in modern web architectures, transitioning from initial scripting to production-grade systems. Designed and deployed containerized applications using Docker/Kubernetes stacks, achieving 99.9% uptime on AWS ECS. Certified in advanced TypeScript patterns and cloud-native development.
    </p>
  </motion.div>
))

const CoreCompetencies = memo(() => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
    viewport={{ once: true, margin: "100px" }}
    className="border-l-4 border-secondary/20 pl-6"
  >
    <h3 className="text-2xl font-semibold mb-4 text-foreground">
      Core Competencies
    </h3>
    <p className="leading-relaxed">
      Full-stack engineer focused on TypeScript ecosystems: React frontends with Node.js/Express backends. Implement hybrid data solutions combining PostgreSQL's relational rigor with MongoDB's flexibility. DevOps specialist maintaining CI/CD pipelines with 85%+ test coverage via Jest, alongside infrastructure-as-code practices for AWS deployments.
    </p>
  </motion.div>
))

const SystemsThinking = memo(() => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6 }}
    viewport={{ once: true, margin: "100px" }}
    className="border-l-4 border-primary/20 pl-6"
  >
    <h3 className="text-2xl font-semibold mb-4 text-foreground">
      Systems Thinking
    </h3>
    <p className="leading-relaxed">
      Architect of real-time systems like WebSocket chat applications and inventory management APIs. Contributor to containerization best practices, optimizing Docker images by 40% through multi-stage builds. Continuously exploring microservices patterns and distributed system design to enhance scalability.
    </p>
  </motion.div>
))

// Optimize profile image with proper loading
const ProfileImage = memo(() => {
  const gradientAnimation = useMemo(() => ({
    background: profileGradientColors.map(color => 
      `linear-gradient(45deg, ${color} 0%, transparent 100%)`
    ),
  }), [])

  return (
    <motion.div
      className="relative w-64 h-64 md:w-80 md:h-80"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={gradientAnimation}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          filter: "blur(20px)",
          opacity: 0.7,
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden border-4 border-background shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="/src/assets/images/profile.jpeg"
          alt="Profile"
          width={320}
          height={320}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-[center_35%]"
        />
      </motion.div>
    </motion.div>
  )
})

// Main component with performance optimizations
function AboutSection() {
  const titleAnimation = useMemo(() => ({
    scale: [1, 1.02, 1]
  }), [])

  return (
    <SectionWrapper id="about">
      <div className="container mx-auto px-6 relative">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-center mb-16"
          animate={titleAnimation}
          transition={{ duration: 2, repeat: Infinity }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div className="space-y-8">
            <div className="space-y-8 text-muted-foreground">
              <TechnicalEvolution />
              <CoreCompetencies />
              <SystemsThinking />
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-8">
            <ProfileImage />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-md"
            >
              <p className="italic text-muted-foreground">
                "Passionate about solving complex problems through clean architecture and robust systems. Let's engineer solutions that scale."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// Name components for better debugging
TechnicalEvolution.displayName = 'TechnicalEvolution'
CoreCompetencies.displayName = 'CoreCompetencies'
SystemsThinking.displayName = 'SystemsThinking'
ProfileImage.displayName = 'ProfileImage'
AboutSection.displayName = 'AboutSection'

export default AboutSection