import { motion, useScroll, useTransform } from "framer-motion"
import { projectData } from "@/config/data/projectData"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import { ProjectCard } from "@/components/common/ProjectCard"

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
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  )

  return (
    <div className="relative min-h-screen">
      <motion.div
        className="absolute inset-0 bg-background"
        style={{
          scaleX: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
          transformOrigin: 'left'
        }}
      />
      <motion.section 
        id="projects" 
        className="min-h-screen py-20 bg-muted/50 relative overflow-hidden flex items-center"
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
              align: "start",
              loop: true,
              containScroll: false,
            }}
            className="w-full"
            plugins={[plugin.current]}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projectData.map((project) => (
                <CarouselItem 
                  key={project.id} 
                  className="pl-2 md:pl-4 lg:basis-1/2"
                >
                  <div className="p-2">
                    <ProjectCard project={project} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </motion.section>
    </div>
  )
}