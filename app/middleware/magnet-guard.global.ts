export default defineNuxtRouteMiddleware((to) => {
  // Only run on magnet routes
  if (!to.path.startsWith('/magnet')) return;

  const { isAccessible, getLatestUnlockedStep } = useMagnetProgress();

  // If the target path is not accessible
  if (!isAccessible(to.path)) {
    const latestStep = getLatestUnlockedStep();
    
    // Redirect to the latest unlocked step
    if (latestStep && latestStep !== to.path) {
      return navigateTo(latestStep);
    }
  }
});
