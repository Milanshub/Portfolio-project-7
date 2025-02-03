export const measurePerformance = (componentName: string) => {
  if (process.env.NODE_ENV === 'development') {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      console.log(`${componentName} render time:`, endTime - startTime, 'ms')
    }
  }
  
  return () => {}
} 