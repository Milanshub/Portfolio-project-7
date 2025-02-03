import { ReactNode, Children, memo } from "react"

interface MainContentBackgroundProps {
  children: ReactNode
}

// Memoize divider component
const SectionDivider = memo(() => (
  <div className="max-w-4xl mx-auto px-6 py-16">
    <div className="h-[3px] bg-gradient-to-r from-transparent via-border to-transparent dark:via-border/50" />
  </div>
))

// Memoize section wrapper
const Section = memo(({ child, showDivider }: { 
  child: ReactNode
  showDivider: boolean 
}) => (
  <div>
    {showDivider && <SectionDivider />}
    {child}
  </div>
))

export const MainContentBackground = memo(({ children }: MainContentBackgroundProps) => {
  const childrenArray = Children.toArray(children)

  return (
    <div className="relative bg-background">
      <div className="relative z-10">
        {childrenArray.map((child, index) => (
          <Section 
            key={index} 
            child={child} 
            showDivider={index > 0} 
          />
        ))}
      </div>
    </div>
  )
})

// Add display names
SectionDivider.displayName = 'SectionDivider'
Section.displayName = 'Section'
MainContentBackground.displayName = 'MainContentBackground'