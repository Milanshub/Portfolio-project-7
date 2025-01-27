import { ReactNode, Children } from "react"

interface MainContentBackgroundProps {
  children: ReactNode
}

export function MainContentBackground({ children }: MainContentBackgroundProps) {
  const childrenArray = Children.toArray(children)

  return (
    <div className="relative bg-background">

      {/* Content container with dividers */}
      <div className="relative z-10">
        {childrenArray.map((child, index) => (
          <div key={index}>
            {index > 0 && (
              <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="h-[3px] bg-gradient-to-r from-transparent via-border to-transparent dark:via-border/50" />
              </div>
            )}
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}