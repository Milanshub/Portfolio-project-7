import { memo } from "react"
import { motion } from "framer-motion"
import { Contributions } from "@/components/features/github/Contributions"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { skillsData, type Skill } from "@/config/data/skillsData"

// Memoize section title
const SectionTitle = memo(() => (
  <motion.h2 
    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-center mb-16"
    animate={{ scale: [1, 1.02, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    Skills & Expertise
  </motion.h2>
))

// Memoize skill progress bar
const SkillProgressBar = memo(({ level, color, index }: { 
  level: number
  color: string
  index: number 
}) => (
  <div className="h-2 bg-muted rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      transition={{ duration: 1.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full rounded-full relative"
      style={{ backgroundColor: color }}
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
))

// Memoize skill card
const SkillCard = memo(({ skill, index }: { 
  skill: Skill
  index: number 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-background/50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center gap-3 mb-4">
      <motion.div
        className="text-foreground"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {skill.icon}
      </motion.div>
      <span className="text-lg font-medium">{skill.name}</span>
      <span className="ml-auto text-lg">{skill.level}%</span>
    </div>
    <SkillProgressBar level={skill.level} color={skill.color} index={index} />
  </motion.div>
))

// Memoize skills grid
const SkillsGrid = memo(() => (
  <motion.div
    className="w-full"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    viewport={{ once: true }}
  >
    <h3 className="text-3xl font-semibold mb-8 text-center">Technical Skills</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillsData.map((skill, index) => (
        <SkillCard key={skill.name} skill={skill} index={index} />
      ))}
    </div>
  </motion.div>
))

function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <div className="container mx-auto px-6 relative">
        <SectionTitle />

        <div className="mt-24 space-y-16">
          <SkillsGrid />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-background/50 rounded-lg p-8 shadow-lg"
          >
            <Contributions />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// Add display names for debugging
SectionTitle.displayName = 'SectionTitle'
SkillProgressBar.displayName = 'SkillProgressBar'
SkillCard.displayName = 'SkillCard'
SkillsGrid.displayName = 'SkillsGrid'

export default SkillsSection
