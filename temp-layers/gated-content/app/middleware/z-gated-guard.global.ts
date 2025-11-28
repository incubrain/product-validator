export default defineNuxtRouteMiddleware(async (to) => {
  // Only run on magnet routes
  if (!to.path.startsWith('/gated')) return;

  const { isAccessible, getLatestUnlockedStep, flatSteps, initialize } = useContentProgress();

  // Ensure progress is initialized
  if (flatSteps.value.length === 0) {
    try {
      const navigation = await queryCollectionNavigation('gated');
      if (navigation) {
        initialize(navigation);
      }
    } catch (e) {
      console.error('Failed to initialize gated navigation in middleware', e);
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
