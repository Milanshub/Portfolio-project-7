import { motion, useScroll, useTransform } from "framer-motion"
import { projectData } from "@/config/data/projectData"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

const gradientColors = [
  "#000000", // Black
  "#1a237e", // Deep Blue
  "#1565c0", // Strong Blue
  "#0d47a1", // Royal Blue
  "#002171", // Navy
]

export function ProjectsSection() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  )

  return (
    <div className="relative nin-h-screen">
      <motion.div
        className="absolute inset-0 bg-background"
        style={{
          scaleX: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
          transformOrigin: 'left'
        }}
      />
      <motion.section 
        id="projects" 
        className="min-h-screen py-24 bg-muted/50 relative overflow-hidden flex items-center"
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
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-center mb-16"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Featured Projects
          </motion.h2>

          <Carousel
            opts={{
              align: "center",
              loop: true,
              dragFree: true,
              skipSnaps: false,
              duration: 50,
              startIndex: 1,
            }}
            className="w-full max-w-[90vw] mx-auto"
            plugins={[plugin.current]}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projectData.map((project) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    className="relative bg-background/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-[600px]"
                    whileHover={{ 
                      scale: 1.05,
                      zIndex: 20,
                      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="relative h-[300px] overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="object-cover w-full h-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>

                      <div className="p-8 space-y-6 flex-1">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <p className="text-muted-foreground">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span 
                              key={tech}
                              className="px-3 py-1.5 bg-primary/10 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-base mt-6"
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </motion.section>
    </div>
  )
}