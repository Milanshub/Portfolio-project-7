export interface Project {
    id: number
    title: string
    description: string
    image: string
    githubUrl: string
    technologies: string[]
}

export interface ProjectCardProps {
    project: Project
}
