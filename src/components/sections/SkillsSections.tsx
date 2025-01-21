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

export function SkillsSection() {
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
        id="skills" 
        className="py-24 bg-muted/50 relative overflow-hidden"
        style={{ opacity }}
      >
        <div className="container mx-auto px-6 relative">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-center mb-16"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Skills & Expertise
          </motion.h2>

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