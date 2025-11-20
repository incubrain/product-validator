export default defineNuxtRouteMiddleware(async (to) => {
  // Only run on magnet routes
  if (!to.path.startsWith('/magnet')) return;

  const { isAccessible, getLatestUnlockedStep, flatSteps, initialize } = useMagnetProgress();

  // Ensure progress is initialized
  if (flatSteps.value.length === 0) {
    try {
      const navigation = await queryCollectionNavigation('magnet');
      if (navigation) {
        initialize(navigation);
      }
    } catch (e) {
      console.error('Failed to initialize magnet navigation in middleware', e);
    }
  }

  // If the target path is not accessible
  if (!isAccessible(to.path)) {
    const latestStep = getLatestUnlockedStep();
    
    // Redirect to the latest unlocked step
    if (latestStep && latestStep !== to.path) {
      return navigateTo(latestStep);
    }
  }
});
