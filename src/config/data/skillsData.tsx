import { ReactNode } from 'react'
import { 
  Blocks, 
  FileCode2, 
  Server, 
  Layers, 
  Palette, 
  Database 
} from "lucide-react"

// Define skill type
export interface Skill {
  name: string
  level: number
  color: string
  icon: ReactNode
}

// Define skills data
export const skillsData: Skill[] = [
  { 
    name: "React", 
    level: 90, 
    color: "#61DAFB",
    icon: <Blocks className="w-6 h-6" strokeWidth={1.5} /> 
  },
  { 
    name: "TypeScript", 
    level: 85, 
    color: "#3178C6",
    icon: <FileCode2 className="w-6 h-6" strokeWidth={1.5} /> 
  },
  { 
    name: "Node.js", 
    level: 85, 
    color: "#339933",
    icon: <Server className="w-6 h-6" strokeWidth={1.5} /> 
  },
  { 
    name: "Docker", 
    level: 80, 
    color: "#FF4F64",
    icon: <Layers className="w-6 h-6" strokeWidth={1.5} /> 
  },
  { 
    name: "Tailwind CSS", 
    level: 90, 
    color: "#8B5CF6",
    icon: <Palette className="w-6 h-6" strokeWidth={1.5} /> 
  },
  { 
    name: "Supabase", 
    level: 75, 
    color: "#F59E0B",
    icon: <Database className="w-6 h-6" strokeWidth={1.5} /> 
  },
] 