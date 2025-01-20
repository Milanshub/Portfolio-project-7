import { AppRoutes } from "./routes/AppRoutes"
import { BrowserRouter as Router } from "react-router-dom"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AppRoutes />
      </Router>
    </ErrorBoundary>
  )
}

export default App;