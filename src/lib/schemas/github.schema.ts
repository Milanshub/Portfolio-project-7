import { z } from "zod"

// Schema for GitHub contribution data
export const contributionDaySchema = z.object({
  contributionCount: z.number(),
  date: z.string(),
})

export const contributionWeekSchema = z.object({
  contributionDays: z.array(contributionDaySchema),
})

export const githubContributionsSchema = z.object({
  totalContributions: z.number(),
  weeks: z.array(contributionWeekSchema),
})

// Schema for environment variables
export const githubEnvSchema = z.object({
  VITE_GITHUB_TOKEN: z.string().min(1, "GitHub token is required"),
  VITE_GITHUB_USERNAME: z.string().min(1, "GitHub username is required"),
})

// Validation function for env variables
export function validateGithubEnv() {
  try {
    return githubEnvSchema.parse({
      VITE_GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN,
      VITE_GITHUB_USERNAME: import.meta.env.VITE_GITHUB_USERNAME,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `GitHub environment variable validation failed: ${error.errors
          .map((e) => e.message)
          .join(", ")}`
      )
    }
    throw error
  }
}