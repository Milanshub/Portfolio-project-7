import { AppRoutes } from "./routes/AppRoutes"
import { BrowserRouter as Router } from "react-router-dom"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import { onCLS, onFID, onLCP } from 'web-vitals'

const App = () => {
  console.log('App rendering started');
  
  useEffect(() => {  
    console.log('App mounted');
    return () => console.log('App unmounted');
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Use more generic names for metrics
      onCLS((metric) => {
        console.log('Layout Shift:', metric.value)
      })
      onFID((metric) => {
        console.log('Input Delay:', metric.value)
      })
      onLCP((metric) => {
        console.log('Render Time:', metric.value)
      })
    }
  }, [])

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