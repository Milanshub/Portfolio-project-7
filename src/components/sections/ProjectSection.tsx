import { motion } from "framer-motion"

interface Project {
  id: number
  title: string
  description: string
  image: string
  githubUrl: string
  technologies: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Modern portfolio built with Next.js and Framer Motion",
    image: "/images/projects/portfolio.png",
    githubUrl: "https://github.com/yourusername/portfolio",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  // Add more projects here
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-muted/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div className="space-y-32">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Background Number */}
              <div 
                className="absolute -left-8 top-0 text-[12rem] font-bold text-muted/10 select-none"
                style={{ zIndex: 0 }}
              >
                {project.id.toString().padStart(2, '0')}
              </div>

              {/* Project Card */}
              <motion.div 
                className="relative bg-background rounded-lg shadow-lg overflow-hidden z-10"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* GitHub Link */}
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                      </svg>
                      View Source Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}