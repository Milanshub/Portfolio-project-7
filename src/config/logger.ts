// Define possible log levels in order of severity
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Configuration interface for logger settings
interface LogConfig {
  level: LogLevel;      // Minimum level to log
  enabled: boolean;     // Whether logging is enabled
  prefix?: string;      // Optional prefix for log messages
}

// Define types that can be logged as arguments
// Allows for flexible logging of different data types
type LogArgs = (string | number | boolean | null | undefined | Error | object)[];

/**
 * Logger class implementing the Singleton pattern for consistent logging across the application
 * Features:
 * - Different log levels (debug, info, warn, error)
 * - Configurable logging threshold
 * - Development/Production mode awareness
 * - Custom prefix support
 * - Type-safe logging
 */
class Logger {
  // Singleton instance
  private static instance: Logger;

  // Default configuration
  private config: LogConfig = {
    level: 'info',                                    // Default to info level
    enabled: process.env.NODE_ENV !== 'production',   // Disabled in production
    prefix: '🚀 [Portfolio]'                         // Custom prefix for logs
  };

  // Priority mapping for log levels
  // Higher number means higher priority
  private readonly levelPriority: Record<LogLevel, number> = {
    debug: 0,  // Lowest priority
    info: 1,   // General information
    warn: 2,   // Warnings
    error: 3   // Highest priority
  };

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Singleton pattern implementation
  // Ensures only one logger instance exists
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Determines if a message should be logged based on:
  // 1. Whether logging is enabled
  // 2. If the message's level meets the minimum threshold
  private shouldLog(level: LogLevel): boolean {
    return (
      this.config.enabled &&
      this.levelPriority[level] >= this.levelPriority[this.config.level]
    );
  }

  // Formats the log message with the configured prefix
  private formatMessage(message: string): string {
    return `${this.config.prefix} ${message}`;
  }

  // Debug level logging
  // Used for detailed debugging information
  debug(message: string, ...args: LogArgs): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage(message), ...args);
    }
  }

  // Info level logging
  // Used for general information about application flow
  info(message: string, ...args: LogArgs): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage(message), ...args);
    }
  }

  // Warning level logging
  // Used for potentially problematic situations
  warn(message: string, ...args: LogArgs): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage(message), ...args);
    }
  }

  // Error level logging
  // Used for error conditions that should be investigated
  error(message: string, error?: Error, ...args: LogArgs): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage(message), error, ...args);
    }
  }

  // Allows runtime configuration updates
  // Useful for changing log levels or enabling/disabling logging
  setConfig(config: Partial<LogConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Export a singleton instance of the logger
export const logger = Logger.getInstance(); 