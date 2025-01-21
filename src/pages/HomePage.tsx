import { Navigation } from "@/components/common/Navigation"
import { HeroSection } from "@/components/sections/HeroSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ProjectsSection } from "@/components/sections/ProjectSection"
import { FooterSection } from "@/components/sections/FooterSection"

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <FooterSection />
    </>
  )
}