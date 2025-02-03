import { memo, useRef, useMemo } from 'react'
import { projectData } from "@/config/data/projectData"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ProjectCard } from "@/components/common/ProjectCard"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { motion } from "framer-motion"
import type { EmblaOptionsType } from 'embla-carousel'

// Memoize section title
const SectionTitle = memo(() => (
  <motion.h2 
    className="text-4xl md:text-5xl py-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary/90 dark:to-secondary/90 text-center mb-16"
    animate={{ scale: [1, 1.02, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    Featured Projects
  </motion.h2>
))

// Memoize carousel navigation buttons
const CarouselNavigation = memo(() => (
  <>
    <CarouselPrevious className="hidden md:flex dark:bg-background/80 dark:hover:bg-background/90 transition-colors duration-300" />
    <CarouselNext className="hidden md:flex dark:bg-background/80 dark:hover:bg-background/90 transition-colors duration-300" />
  </>
))

function ProjectsSection() {
  // Memoize autoplay options
  const autoplayOptions = useMemo(() => ({
    delay: 3000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement as HTMLElement,
  }), [])

  // Create plugin ref
  const plugin = useRef(Autoplay(autoplayOptions))

  // Memoize carousel options with correct type
  const carouselOptions = useMemo((): EmblaOptionsType => ({
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
  }), [])

  return (
    <SectionWrapper id="projects">
      <div className="container mx-auto px-6 relative">
        <SectionTitle />

        <div className="relative">
          {/* Optional: Add a subtle gradient background for dark mode */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent dark:from-primary/5 dark:via-background/30 dark:to-primary/5 rounded-xl blur-xl" />
          
          <Carousel
            opts={carouselOptions}
            className="w-full relative"
            plugins={[plugin.current]}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projectData.map((project) => (
                <CarouselItem 
                  key={project.id} 
                  className="pl-2 md:pl-4 lg:basis-1/2 h-full"
                >
                  <div className="p-2 h-full">
                    <ProjectCard project={project} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNavigation />
          </Carousel>
        </div>
      </div>
    </SectionWrapper>
  )
}

// Add display names
SectionTitle.displayName = 'SectionTitle'
CarouselNavigation.displayName = 'CarouselNavigation'

export default ProjectsSection