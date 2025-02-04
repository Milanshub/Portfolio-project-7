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

// SectionTitle: Animated heading for the projects section
// Memoized to prevent unnecessary re-renders
const SectionTitle = memo(() => (
  <motion.h2 
    className="text-4xl md:text-5xl py-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary/90 dark:to-secondary/90 text-center mb-16"
    animate={{ scale: [1, 1.02, 1] }}  // Subtle breathing animation
    transition={{ duration: 2, repeat: Infinity }}
  >
    Featured Projects
  </motion.h2>
))

// CarouselNavigation: Navigation buttons for the carousel
// Memoized for performance optimization
const CarouselNavigation = memo(() => (
  <>
    <CarouselPrevious className="hidden md:flex dark:bg-background/80 dark:hover:bg-background/90 transition-colors duration-300" />
    <CarouselNext className="hidden md:flex dark:bg-background/80 dark:hover:bg-background/90 transition-colors duration-300" />
  </>
))

// Main ProjectsSection component
function ProjectsSection() {
  // Memoize autoplay configuration to prevent recreation
  const autoplayOptions = useMemo(() => ({
    delay: 3000,                // Time between slides
    stopOnInteraction: true,    // Pause on user interaction
    stopOnMouseEnter: true,     // Pause on hover
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement as HTMLElement,
  }), [])

  // Create plugin ref for autoplay functionality
  const plugin = useRef(Autoplay(autoplayOptions))

  // Memoize carousel options for consistent configuration
  const carouselOptions = useMemo((): EmblaOptionsType => ({
    align: "start",            // Align slides to start
    loop: true,               // Enable infinite loop
    containScroll: "trimSnaps", // Prevent overscrolling
  }), [])

  return (
    <SectionWrapper id="projects">
      <div className="container mx-auto px-6 relative">
        <SectionTitle />

        <div className="relative">
          {/* Background gradient effect for dark mode */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent dark:from-primary/5 dark:via-background/30 dark:to-primary/5 rounded-xl blur-xl" />
          
          {/* Carousel component with autoplay */}
          <Carousel
            opts={carouselOptions}
            className="w-full relative"
            plugins={[plugin.current]}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {/* Map through project data to create carousel items */}
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
            {/* Navigation buttons */}
            <CarouselNavigation />
          </Carousel>
        </div>
      </div>
    </SectionWrapper>
  )
}

// Add display names for React DevTools debugging
SectionTitle.displayName = 'SectionTitle'
CarouselNavigation.displayName = 'CarouselNavigation'

export default ProjectsSection