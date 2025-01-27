import { Project } from "@/types/project"

export const projectData: Project[] = [
    {
        id: 1,
        title: "Photographers Gallery",
        description: "Multi-page photography portfolio website built with React and Bootstrap. Features dynamic image galleries, responsive design, and smooth transitions.",
        image: "/src/assets/images/photography.png",
        githubUrl: "https://github.com/Milanshub/Photography-Project-1",
        technologies: ["React", "JavaScript", "Bootstrap"],
    }, 
    {
        id: 2,
        title: "Tasks Mananager",
        description: "Full-stack task management app with TypeScript integration, featuring CRUD operations and MongoDB data persistence.",
        image: "/src/assets/images/tasks.png",
        githubUrl: "https://github.com/Milanshub/Tasks-TS-project-4",
        technologies: ["React", "TypeScript", "Express", "MongoDB"],
    }, 
    {
        id: 3,
        title: "Live Chat",
        description: "Real-time chat application with Docker containerization and Kubernetes orchestration. Features WebSocket communication and MongoDB persistence.",
        image: "/src/assets/images/live-chat.png",
        githubUrl: "https://github.com/Milanshub/Chat-Docker-TS-project-5",
        technologies: ["React", "TypeScript", "Docker", "Kubernetes", "MongoDB", "WebSocket"],
    }, 
    {
        id: 4,
        title: "Inventory Management",
        description: "Full-stack inventory system with comprehensive testing using Cypress and Vitest. Features real-time data handling and TypeScript integration.",
        image: "/src/assets/images/inventory.png",
        githubUrl: "https://github.com/Milanshub/Inventory-management-ts-jest-project-6",
        technologies: ["React", "TypeScript", "Cypress", "Vitest", "Docker", "Kubernetes", "MongoDB"],
    }
]