// composables/useTrafficSource.ts
/**
 * UTM parameter capture and retrieval
 * Stores traffic source data for campaign attribution
 */

export const useTrafficSource = () => {
  const route = useRoute();
  const { session } = useAppStorage();
  const TRAFFIC_SOURCE_KEY = 'trafficSource';

  /**
   * Extract UTM params from URL and store in sessionStorage
   * Always stores (even without UTMs) to capture referrer + landing page
   */
  const captureSource = () => {
    if (import.meta.server) return;

    const utmSource = (route.query.utm_source as string) || null;
    const utmMedium = (route.query.utm_medium as string) || null;
    const utmCampaign = (route.query.utm_campaign as string) || null;
    const utmContent = (route.query.utm_content as string) || null;
    const utmTerm = (route.query.utm_term as string) || null;

    const hasUtms = !!(utmSource || utmMedium || utmCampaign || utmContent || utmTerm);

    const source: TrafficSource = {
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      referrer: document.referrer || null,
      landingPage: route.path,
      hasUtms,
    };

    // Always store to capture referrer + landing page
    session.set(TRAFFIC_SOURCE_KEY, JSON.stringify(source));
  };

  /**
   * Get stored traffic source from sessionStorage
   */
  const getSource = (): TrafficSource | null => {
  if (import.meta.server) return null;
  
  const stored = session.get(TRAFFIC_SOURCE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.warn('Failed to parse traffic source:', error);
    return null;
  }
};

  return { captureSource, getSource };
};
