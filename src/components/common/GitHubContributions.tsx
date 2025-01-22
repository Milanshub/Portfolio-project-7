import { useEffect, useState } from "react"
import { ContributionsData } from "@/types/contributions"

export function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionsData | null>(null)

  useEffect(() => {
    const fetchContributions = async () => {
      const token = import.meta.env.VITE_GITHUB_TOKEN
      const username = import.meta.env.VITE_GITHUB_USERNAME

      if (!token || !username) {
        console.error("GitHub token or username not found in environment variables")
        return
      }

      try {
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
                  contributionsCollection {
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
      }
    }

    fetchContributions()
  }, [])

  if (!contributions) {
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
      <h3 className="text-xl font-semibold mb-4">
        GitHub Contributions ({contributions.totalContributions} in the last year)
      </h3>
      <div className="bg-background rounded-lg p-4 overflow-x-auto">
        <div className="flex gap-1" style={{ minWidth: "max-content" }}>
          {contributions.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  className={`w-3 h-3 rounded-sm ${getContributionColor(
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
                className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
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
  if (count <= 3) return "bg-primary/20"
  if (count <= 6) return "bg-primary/40"
  if (count <= 9) return "bg-primary/60"
  return "bg-secondary"
}