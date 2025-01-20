import { motion, useScroll, useTransform } from "framer-motion"
import { GitHubContributions } from "@/components/common/GitHubContributions"

const skills = [
  { name: "React", level: 90, color: "#61DAFB", icon: "⚛️" },
  { name: "TypeScript", level: 85, color: "#3178C6", icon: "📘" },
  { name: "Node.js", level: 80, color: "#339933", icon: "🟢" },
  { name: "Next.js", level: 85, color: "#000000", icon: "▲" },
  { name: "Tailwind CSS", level: 90, color: "#38B2AC", icon: "🎨" },
  { name: "PostgreSQL", level: 75, color: "#336791", icon: "🐘" },
]

const profileGradientColors = [
  "#4B0082", // Indigo
  "#6A5ACD", // Slate blue
  "#483D8B", // Dark slate blue
  "#4169E1", // Royal blue
  "#1E90FF", // Dodger blue
]

export function AboutSection() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 bg-background"
        style={{
          scaleX: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
          transformOrigin: 'left'
        }}
      />
      <motion.section 
        id="about" 
        className="py-24 bg-muted/50 relative overflow-hidden"
        style={{ opacity }}
      >
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
              {/* Bio Sections */}
              <div className="space-y-8 text-muted-foreground">
                {/* The Journey Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-primary/20 pl-6"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    The Journey
                  </h3>
                  <p className="leading-relaxed">
                    From writing my first line of code to building complex web applications, 
                    my journey in software development has been driven by curiosity and a 
                    passion for creating impactful solutions. With 3 years of hands-on 
                    experience, I've developed a deep appreciation for clean code and 
                    user-centric design.
                  </p>
                </motion.div>

                {/* What I Do Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-secondary/20 pl-6"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    What I Do
                  </h3>
                  <p className="leading-relaxed">
                    I specialize in building modern web applications using React, TypeScript, 
                    and Next.js. My focus is on creating performant, accessible, and 
                    scalable solutions that solve real-world problems. I'm particularly 
                    passionate about user experience and writing maintainable code.
                  </p>
                </motion.div>

                {/* Beyond Coding Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-primary/20 pl-6"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    Beyond Coding
                  </h3>
                  <p className="leading-relaxed">
                    When I'm not coding, you'll find me exploring new technologies, 
                    contributing to open-source projects, and sharing knowledge with the 
                    developer community. I believe in continuous learning and staying 
                    up-to-date with the latest industry trends.
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
                    src="/images/profile.jpeg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="text-center max-w-md"
              >
                <p className="italic text-muted-foreground">
                  "I'm always excited to take on new challenges and collaborate on 
                  interesting projects. Let's build something amazing together!"
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Skills and GitHub Contributions - Full Width */}
          <div className="mt-24 space-y-16">
            {/* Skills section */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-semibold mb-8 text-center">Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-background/50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <motion.span
                        className="text-3xl"
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        {skill.icon}
                      </motion.span>
                      <span className="text-lg font-medium">{skill.name}</span>
                      <span className="ml-auto text-lg">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: skill.color }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* GitHub Contributions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-background/50 rounded-lg p-8 shadow-lg"
            >
              <GitHubContributions />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}