import { ReactNode, Children, memo } from "react"

interface MainContentBackgroundProps {
  children: ReactNode
}

// Type definition for Section component props
interface SectionProps {
  child: ReactNode
  showDivider: boolean
}

// SectionDivider: Creates a horizontal gradient line between sections
// Memoized to prevent unnecessary re-renders
const SectionDivider = memo(() => (
  <div className="max-w-4xl mx-auto px-6 py-16">
    {/* Gradient line with transparent edges and solid middle */}
    <div className="h-[3px] bg-gradient-to-r from-transparent via-border to-transparent dark:via-border/50" />
  </div>
))

// Section: Wraps individual content sections and manages dividers
// Memoized to prevent unnecessary re-renders when other sections update
const Section = memo(({ child, showDivider }: SectionProps) => (
  <div>
    {/* Only render divider if this isn't the first section */}
    {showDivider && <SectionDivider />}
    {child}
  </div>
))

// MainContentBackground: Main layout component that manages content sections and background
// Memoized to optimize performance for the entire content structure
export const MainContentBackground = memo(({ children }: MainContentBackgroundProps) => {
  // Convert children to array for mapping and indexing
  const childrenArray = Children.toArray(children)

  return (
    // Main container with background styling
    <div className="relative bg-background">
      {/* Content wrapper with elevated z-index to ensure content stays above background */}
      <div className="relative z-10">
        {/* Map through each child section */}
        {childrenArray.map((child, index) => (
          <Section 
            key={index} 
            child={child} 
            showDivider={index > 0}  // Show divider for all sections except the first
          />
        ))}
      </div>
    </div>
  )
})

// Add display names for React DevTools debugging
SectionDivider.displayName = 'SectionDivider'
Section.displayName = 'Section'
MainContentBackground.displayName = 'MainContentBackground'