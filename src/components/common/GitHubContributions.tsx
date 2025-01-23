import { useEffect, useState } from "react"
import { ContributionsData } from "@/types/contributions"

export function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionsData | null>(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContributions = async () => {
      setLoading(true)
      const token = import.meta.env.VITE_GITHUB_TOKEN
      const username = import.meta.env.VITE_GITHUB_USERNAME

      if (!token || !username) {
        console.error("GitHub token or username not found in environment variables")
        return
      }

      try {
        const fromDate = `${selectedYear}-01-01T00:00:00`
        const toDate = `${selectedYear}-12-31T23:59:59`

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                user(login: "${username}") {
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
        
        if (data.errors) {
          throw new Error(data.errors[0].message)
        }

        setContributions(
          data.data.user.contributionsCollection.contributionCalendar
        )
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [selectedYear])

  // Changed from 5 to 3 years
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
        <div className="flex gap-2">
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
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
      </div>
      
      <div className="bg-background rounded-lg p-4 overflow-x-auto">
        <div className="flex gap-1 w-full justify-between" style={{ minWidth: "max-content" }}>
          {contributions.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day) => (
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
}

function getContributionColor(count: number): string {
    if (count === 0) return "bg-muted"
    if (count <= 3) return "bg-[#1565c0]"  // Light Blue
    if (count <= 6) return "bg-[#1565c0]"  // Light Blue
    if (count <= 9) return "bg-[#1565c0]"  // Light Blue
    if (count <= 12) return "bg-[#1565c0]" // Light Blue
    return "bg-[#000000]" // Black for highest contributions
}