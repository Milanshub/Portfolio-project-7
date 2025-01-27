import { z } from "zod"
import {
  githubContributionsSchema,
  githubEnvSchema,
  contributionDaySchema,
  contributionWeekSchema,
} from "@/lib/schemas/github.schema"

// Types inferred from schemas
export type GithubEnv = z.infer<typeof githubEnvSchema>
export type ContributionsData = z.infer<typeof githubContributionsSchema>
export type ContributionDay = z.infer<typeof contributionDaySchema>
export type ContributionWeek = z.infer<typeof contributionWeekSchema>

// Additional GitHub-related types (if needed)
export interface GithubError {
  message: string
  documentation_url?: string
}

// Response type for GitHub API errors
export interface GithubApiError {
  errors?: Array<{
    message: string
    type: string
    path: string[]
  }>
  message?: string
}