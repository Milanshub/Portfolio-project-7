import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

const profileGradientColors = [
  "#4B0082", // Indigo
  "#6A5ACD", // Slate blue
  "#483D8B", // Dark slate blue
  "#4169E1", // Royal blue
  "#1E90FF", // Dodger blue
]

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className="container mx-auto px-6 relative">
        {/* Main Title */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-center mb-16"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          About Me
        </motion.h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div className="space-y-8">
            <div className="space-y-8 text-muted-foreground">
              {/* Technical Evolution Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="border-l-4 border-primary/20 pl-6"
              >
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Technical Evolution
                </h3>
                <p className="leading-relaxed">
                  Self-taught developer specializing in modern web architectures, transitioning from initial scripting to production-grade systems. Designed and deployed containerized applications using Docker/Kubernetes stacks, achieving 99.9% uptime on AWS ECS. Certified in advanced TypeScript patterns and cloud-native development.
                </p>
              </motion.div>

              {/* Core Competencies Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="border-l-4 border-secondary/20 pl-6"
              >
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Core Competencies
                </h3>
                <p className="leading-relaxed">
                  Full-stack engineer focused on TypeScript ecosystems: React frontends with Node.js/Express backends. Implement hybrid data solutions combining PostgreSQL's relational rigor with MongoDB's flexibility. DevOps specialist maintaining CI/CD pipelines with 85%+ test coverage via Jest, alongside infrastructure-as-code practices for AWS deployments.
                </p>
              </motion.div>

              {/* Systems Thinking Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="border-l-4 border-primary/20 pl-6"
              >
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Systems Thinking
                </h3>
                <p className="leading-relaxed">
                  Architect of real-time systems like WebSocket chat applications and inventory management APIs. Contributor to containerization best practices, optimizing Docker images by 40% through multi-stage builds. Continuously exploring microservices patterns and distributed system design to enhance scalability.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div className="flex flex-col items-center gap-8">
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Gradient Background */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: profileGradientColors.map(color => `linear-gradient(45deg, ${color} 0%, transparent 100%)`),
                }}
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
              {/* Profile Image Container */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden border-4 border-background shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src="/src/assets/images/profile.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover object-[center_35%]" // Added object-position
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>

            {/* Technical Quote */}
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
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}