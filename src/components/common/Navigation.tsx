import { 
    NavigationMenu, 
    NavigationMenuList, 
    NavigationMenuItem, 
    NavigationMenuLink } from "@/components/ui/navigation-menu"

export function Navigation() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NavigationMenu className="mx-auto max-w-7xl px-6 lg:px-8">
        <NavigationMenuList className="gap-6">
          {/* Logo/Name */}
          <NavigationMenuItem>
            <NavigationMenuLink 
              className="font-display text-xl font-semibold text-foreground hover:text-primary"
              href="/"
            >
              Your Name
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Nav Items */}
          <NavigationMenuItem>
            <NavigationMenuLink 
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="#about"
            >
              About
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink 
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="#projects"
            >
              Projects
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink 
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="#resume"
            >
              Resume
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink 
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="#contact"
            >
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}