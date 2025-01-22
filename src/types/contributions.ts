export interface ContributionsData {
    totalContributions: number
    weeks: {
      contributionDays: {
        contributionCount: number
        date: string
      }[]
    }[]
  }