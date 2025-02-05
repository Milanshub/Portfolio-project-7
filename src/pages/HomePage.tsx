import { lazy, Suspense, useEffect } from 'react'
import { Navigation } from "@/components/common/Navigation"
import { HeroSection } from "@/components/sections/HeroSection"
import { MainContentBackground } from "@/components/layout/MainContentBackground"
import { logger } from "@/config/logger"

// Lazy load less critical sections
const AboutSection = lazy(() => import('@/components/sections/AboutSection'))
const SkillsSection = lazy(() => import('@/components/sections/SkillsSection'))
const ProjectsSection = lazy(() => import('@/components/sections/ProjectSection'))
const FooterSection = lazy(() => import('@/components/sections/FooterSection'))

// Loading component with simple animation
function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground animate-pulse">Loading content...</p>
      </div>
    </div>
  )
}

export const HomePage = () => {
  // Performance monitoring for HomePage
  useEffect(() => {
    if (import.meta.env.DEV) {
      performance.mark('home-page-mount')
      logger.info('HomePage mounted')

      return () => {
        performance.mark('home-page-unmount')
        performance.measure('home-page-duration', 'home-page-mount', 'home-page-unmount')
        const timing = performance.getEntriesByName('home-page-duration')[0]
        logger.info('HomePage duration:', timing.duration.toFixed(2), 'ms')
      }
    }
  }, [])

  return (
    <>
      <Navigation />
      <HeroSection />
      <Suspense fallback={<PageLoading />}>
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