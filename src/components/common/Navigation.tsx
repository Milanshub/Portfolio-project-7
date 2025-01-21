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
              href="#skils"
            >
              Skills
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
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}