export const measurePerformance = (componentName: string) => {
  if (import.meta.env.DEV) {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      console.log(`${componentName} render time:`, endTime - startTime, 'ms')
    }
  }
  
  return () => {}
} 