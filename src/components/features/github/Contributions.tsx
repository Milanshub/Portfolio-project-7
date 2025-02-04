import { useEffect, useState, memo } from "react";
import { validateGithubEnv } from "@/lib/schemas/github.schema";
import { ContributionsData, GithubApiError } from "@/lib/validations/github";
import { logger } from "@/config/logger";

// Type definitions for GitHub contribution data structure
interface ContributionDay {
  contributionCount: number;  // Number of contributions for a specific day
  date: string;              // Date of the contributions
}

interface ContributionWeek {
  contributionDays: ContributionDay[];  // Array of daily contributions for a week
}

// Utility function to determine the color of contribution squares
// Returns Tailwind CSS classes based on contribution count
function getContributionColor(count: number): string {
  if (count === 0) return "bg-muted";                // No contributions
  if (count <= 3) return "bg-[#1565c0]";            // Few contributions
  if (count <= 6) return "bg-[#1565c0]";            // Light activity
  if (count <= 9) return "bg-[#1565c0]";            // Medium activity
  if (count <= 12) return "bg-[#1565c0]";           // High activity
  return "bg-[#000000]";                            // Very high activity
}

// YearSelector component: Allows users to switch between different years
// Memoized to prevent unnecessary re-renders
const YearSelector = memo(
  ({
    years,              // Array of available years
    selectedYear,       // Currently selected year
    onYearChange,       // Callback function when year changes
  }: {
    years: number[];
    selectedYear: number;
    onYearChange: (year: number) => void;
  }) => (
    <div className="flex gap-2">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onYearChange(year)}
          className={`px-3 py-1 rounded-md transition-colors ${
            selectedYear === year
              ? "bg-[#2d72c1] text-primary-foreground"  // Selected year styling
              : "bg-muted hover:bg-muted/80"            // Unselected year styling
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  )
);

// ContributionGrid component: Displays the contribution squares grid
// Memoized to prevent unnecessary re-renders
const ContributionGrid = memo(({ weeks }: { weeks: ContributionWeek[] }) => (
  <div
    className="flex gap-1 w-full justify-between"
    style={{ minWidth: "max-content" }}  // Ensures grid doesn't shrink below content size
  >
    {/* Map through each week */}
    {weeks.map((week, weekIndex) => (
      <div key={weekIndex} className="flex flex-col gap-1">
        {/* Map through each day in the week */}
        {week.contributionDays.map((day: ContributionDay) => (
          <div
            key={day.date}
            className={`w-3 h-3 rounded-sm contribution-square ${getContributionColor(
              day.contributionCount
            )}`}
            title={`${day.contributionCount} contributions on ${new Date(
              day.date
            ).toLocaleDateString()}`}  // Tooltip showing contribution count and date
          />
        ))}
      </div>
    ))}
  </div>
));

// Main Contributions component
// Memoized to prevent unnecessary re-renders
export const Contributions = memo(() => {
  // State management
  const [contributions, setContributions] = useState<ContributionsData | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch GitHub contributions data
  useEffect(() => {
    const fetchContributions = async () => {
      logger.info("Fetching GitHub contributions");
      setLoading(true);
      try {
        // Validate GitHub environment variables
        const env = validateGithubEnv();
        
        // Set date range for the selected year
        const fromDate = `${selectedYear}-01-01T00:00:00`;
        const toDate = `${selectedYear}-12-31T23:59:59`;

        // GraphQL query to GitHub API
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
        });

        // Error handling for HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Error handling for GitHub API errors
        if ((data as GithubApiError).errors) {
          throw new Error(
            (data as GithubApiError).errors?.[0]?.message ||
              "Unknown GitHub API Error"
          );
        }

        // Update state with fetched data
        setContributions(
          data.data.user.contributionsCollection.contributionCalendar
        );
      } catch (error) {
        logger.error("Error fetching GitHub contributions:", error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [selectedYear]);  // Re-fetch when selected year changes

  // Calculate available years (current year and 2 years back)
  const availableYears = Array.from(
    { length: 3 },
    (_, i) => new Date().getFullYear() - i
  );

  // Loading state UI
  if (!contributions || loading) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">GitHub Contributions</h3>
        <div className="bg-background rounded-lg p-4">
          Loading contributions...
        </div>
      </div>
    );
  }

  // Main render UI
  return (
    <div className="mt-8">
      {/* Header section with title and year selector */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">
          GitHub Contributions ({contributions.totalContributions} in{" "}
          {selectedYear})
        </h3>
        <YearSelector
          years={availableYears}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
      </div>

      {/* Contribution grid section */}
      <div className="bg-background rounded-lg p-4 overflow-x-auto">
        <ContributionGrid weeks={contributions.weeks} />
        {/* Legend for contribution levels */}
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
  );
});

// Set display names for React DevTools
YearSelector.displayName = "YearSelector";
ContributionGrid.displayName = "ContributionGrid";
Contributions.displayName = "Contributions"; 