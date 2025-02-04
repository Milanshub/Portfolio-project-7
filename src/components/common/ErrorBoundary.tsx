import React, { Component, ReactNode } from "react";
import { logger } from "@/config/logger";

// Define the props for the ErrorBoundary component
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}
// Define the state for the ErrorBoundary component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Define the ErrorBoundary component
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // Define the componentDidCatch method for the ErrorBoundary component
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Detailed error logging
    logger.error("ErrorBoundary caught an error:", error, {
      name: error.name,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorInfo,
    });

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.group("🚨 React ErrorBoundary");
      console.error("Error:", error);
      console.error("Component Stack:", errorInfo.componentStack);
      console.groupEnd();
    }
  }

  // Define the render method for the ErrorBoundary component
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              Please try refreshing the page or contact support if the problem
              persists.
            </p>
            {/* Refresh the page */}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
