import { useEffect, useState, memo } from "react"
import { validateGithubEnv } from "@/lib/schemas/github.schema"
import { ContributionsData, GithubApiError } from "@/lib/validations/github"
import { logger } from "@/config/logger"

// Define types for contribution data
interface ContributionDay {
  contributionCount: number
  date: string
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

// Helper function for contribution colors
function getContributionColor(count: number): string {
  if (count === 0) return "bg-muted"
  if (count <= 3) return "bg-[#1565c0]"  // Light Blue
  if (count <= 6) return "bg-[#1565c0]"  // Light Blue
  if (count <= 9) return "bg-[#1565c0]"  // Light Blue
  if (count <= 12) return "bg-[#1565c0]" // Light Blue
  return "bg-[#000000]" // Black for highest contributions
}

// Memoize year selector
const YearSelector = memo(({ 
  years, 
  selectedYear, 
  onYearChange 
}: {
  years: number[]
  selectedYear: number
  onYearChange: (year: number) => void
}) => (
  <div className="flex gap-2">
    {years.map((year) => (
      <button
        key={year}
        onClick={() => onYearChange(year)}
        className={`px-3 py-1 rounded-md transition-colors ${
          selectedYear === year
            ? "bg-[#2d72c1] text-primary-foreground"
            : "bg-muted hover:bg-muted/80"
        }`}
      >
        {year}
      </button>
    ))}
  </div>
))

// Memoize contribution grid
const ContributionGrid = memo(({ weeks }: { weeks: ContributionWeek[] }) => (
  <div 
    className="flex gap-1 w-full justify-between" 
    style={{ minWidth: "max-content" }}
  >
    {weeks.map((week, weekIndex) => (
      <div key={weekIndex} className="flex flex-col gap-1">
        {week.contributionDays.map((day: ContributionDay) => (
          <div
            key={day.date}
            className={`w-3 h-3 rounded-sm contribution-square ${getContributionColor(
              day.contributionCount
            )}`}
            title={`${day.contributionCount} contributions on ${new Date(
              day.date
            ).toLocaleDateString()}`}
          />
        ))}
      </div>
    ))}
  </div>
))

export const GitHubContributions = memo(() => {
  const [contributions, setContributions] = useState<ContributionsData | null>(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContributions = async () => {
      logger.info("Fetching GitHub contributions")
      setLoading(true)
      try {
        const env = validateGithubEnv()
        const fromDate = `${selectedYear}-01-01T00:00:00`
        const toDate = `${selectedYear}-12-31T23:59:59`

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `bearer ${env.VITE_GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                user(login: "${env.VITE_GITHUB_USERNAME}") {
                  contributionsCollection(from: "${fromDate}", to: "${toDate}") {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          contributionCount
                          date
                        }
                      }
                    }
                  }
                }
              }
            `,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if ((data as GithubApiError).errors) {
          throw new Error((data as GithubApiError).errors?.[0]?.message || "Unknown GitHub API Error")
        }

        setContributions(
          data.data.user.contributionsCollection.contributionCalendar
        )
      } catch (error) {
        logger.error("Error fetching GitHub contributions:", error as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [selectedYear])

  const availableYears = Array.from(
    { length: 3 },
    (_, i) => new Date().getFullYear() - i
  )

  if (!contributions || loading) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">GitHub Contributions</h3>
        <div className="bg-background rounded-lg p-4">
          Loading contributions...
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">
          GitHub Contributions ({contributions.totalContributions} in {selectedYear})
        </h3>
        <YearSelector
          years={availableYears}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
      </div>
      
      <div className="bg-background rounded-lg p-4 overflow-x-auto">
        <ContributionGrid weeks={contributions.weeks} />
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 4, 8, 12].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm contribution-square ${getContributionColor(
                  level
                )}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
})

// Add display names
YearSelector.displayName = 'YearSelector'
ContributionGrid.displayName = 'ContributionGrid'
GitHubContributions.displayName = 'GitHubContributions'