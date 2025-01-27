import { Navigation } from "@/components/common/Navigation"
import { HeroSection } from "@/components/sections/HeroSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ProjectsSection } from "@/components/sections/ProjectSection"
import { FooterSection } from "@/components/sections/FooterSection"
import { SkillsSection } from "@/components/sections/SkillsSections"
import { MainContentBackground } from "@/components/layout/MainContentBackground"

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <HeroSection />
      <MainContentBackground>
        <AboutSection />    
        <SkillsSection />
        <ProjectsSection />
      </MainContentBackground>
      <FooterSection />
    </>
  )
}