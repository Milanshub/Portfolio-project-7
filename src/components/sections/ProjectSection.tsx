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
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { motion } from "framer-motion"

export function ProjectsSection() {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  )

  return (
    <SectionWrapper id="projects">
      <div className="container mx-auto px-6 relative">
        <motion.h2 
          className="text-4xl md:text-5xl py-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-center mb-16"
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
                className="pl-2 md:pl-4 lg:basis-1/2 h-full"
              >
                <div className="p-2 h-full">
                  <ProjectCard project={project} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </SectionWrapper>
  )
}