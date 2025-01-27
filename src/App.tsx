import { AppRoutes } from "./routes/AppRoutes"
import { BrowserRouter as Router } from "react-router-dom"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"
import { ThemeProvider } from 'next-themes'
const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ErrorBoundary>
        <Router>
          <AppRoutes />
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App;