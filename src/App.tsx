import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="p-4 space-y-4">
      <Button variant="default">Default Button</Button>
      <Button variant="destructive">Destructive Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link">Link Button</Button>
    </div>
  )
}

export default App