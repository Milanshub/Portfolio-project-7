import { ProjectCardProps } from "@/types/project"
import { motion } from "framer-motion"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// ProjectCard component: Displays a single project with image, title, description, and technologies
// Takes ProjectCardProps which includes project details like title, description, image, etc.
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    // Wrapper motion.div for card entrance animation
    <motion.div
      className="relative"
      // Animation properties for card entrance
      initial={{ opacity: 0, y: 50 }}      // Start invisible and 50px below
      whileInView={{ opacity: 1, y: 0 }}   // Animate to visible and original position when in view
      viewport={{ once: true }}            // Only animate once when first coming into view
      transition={{ duration: 0.5 }}       // Animation takes 0.5 seconds
    >
      {/* Main card component with glass effect styling */}
      <Card className="relative z-10 overflow-hidden h-[32rem] border-border/50 dark:border-border/30 dark:bg-background/50 dark:backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/10">
        <div className="flex flex-col h-full">
          {/* Project image container */}
          <div className="relative h-48 overflow-hidden">
            {/* Animated image with hover effect */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full"
              whileHover={{ scale: 1.05 }}     // Image scales up slightly on hover
              transition={{ duration: 0.2 }}
            />
          </div>

          {/* Card content container */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Project title and description section */}
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-bold line-clamp-1 dark:text-primary/90">
                {project.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 dark:text-muted-foreground/80">
                {project.description}
              </CardDescription>
            </CardHeader>

            {/* Technologies section - displays tech stack used */}
            <CardContent className="p-0 mt-4 flex-grow">
              <div className="flex flex-wrap gap-2">
                {/* Map through technologies and display as pills/tags */}
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full text-sm dark:text-primary-foreground/90 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>

            {/* Card footer with GitHub link */}
            <CardFooter className="p-0 mt-6">
              {/* Animated GitHub button */}
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-all duration-300 dark:shadow-lg dark:shadow-primary/20"
                whileHover={{ scale: 1.05 }}    // Button scales up on hover
                whileTap={{ scale: 0.95 }}      // Button scales down when clicked
              >
                {/* GitHub SVG icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                </svg>
                View Source Code
              </motion.a>
            </CardFooter>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}