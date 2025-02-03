import { lazy, Suspense } from 'react'
import { Navigation } from "@/components/common/Navigation"
import { HeroSection } from "@/components/sections/HeroSection"
import { MainContentBackground } from "@/components/layout/MainContentBackground"

// Lazy load less critical sections
const AboutSection = lazy(() => import('@/components/sections/AboutSection'))
const SkillsSection = lazy(() => import('@/components/sections/SkillsSections'))
const ProjectsSection = lazy(() => import('@/components/sections/ProjectSection'))
const FooterSection = lazy(() => import('@/components/sections/FooterSection'))

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <HeroSection />
      <Suspense fallback={<div>Loading...</div>}>
        <MainContentBackground>
          <AboutSection />    
          <SkillsSection />
          <ProjectsSection />
        </MainContentBackground>
        <FooterSection />
      </Suspense>
    </>
  )
}