// NEW FILE: Extract stock logic from StockProgress.vue
import type { OfferStock, OfferID } from '#types';

export function useOfferStock(stock?: OfferStock, offerId?: OfferID) {
  // ✅ TEST TOGGLE: Check URL param for forcing sold-out state
  const route = useRoute();
  const forceSoldOut = computed(() => {
    if (import.meta.dev) {
      return route.query.soldout === 'true';
    }
    return false;
  });

  // Auto-detect if this should use live count (only for magnet offer)
  const useLiveCount = computed(() => offerId === 'magnet');
  
  // Fetch live count if enabled
  const { data: metrics } = useLiveCount.value
    ? useFetch('/api/v1/metrics/leads')
    : { data: ref(null) };
  
  // Use live count or static count
  const claimed = computed(() => {
    if (useLiveCount.value && metrics.value) {
      return metrics.value.total || 0;
    }
    return stock?.claimed || 0;
  });
  
  const isSoldOut = computed(() => {
    if (!stock) return false;
    
    // ✅ TEST TOGGLE: Override with URL param in dev
    if (forceSoldOut.value) {
      console.log('[useOfferStock] 🧪 SOLD OUT STATE FORCED via ?soldout=true');
      return true;
    }
    
    const soldOut = claimed.value >= stock.limit;
    console.log('[useOfferStock] Sold out check:', {
      offerId,
      claimed: claimed.value,
      limit: stock.limit,
      isSoldOut: soldOut,
      forceSoldOut: forceSoldOut.value,
    });
    
    return soldOut;
  });
  
  const percentClaimed = computed(() => {
    if (!stock) return 0;
    return Math.min(100, Math.round((claimed.value / stock.limit) * 100));
  });
  
  const spotsRemaining = computed(() => {
    if (!stock) return null;
    return stock.limit - claimed.value;
  });
  
  const urgencyLevel = computed(() => {
    const percent = percentClaimed.value;
    if (percent >= 90) return 'critical';
    if (percent >= 75) return 'high';
    if (percent >= 50) return 'medium';
    return 'low';
  });
  
  const urgencyColor = computed(() => {
    const level = urgencyLevel.value;
    if (level === 'critical') return 'error';
    if (level === 'high') return 'warning';
    if (level === 'medium') return 'info';
    return 'success';
  });
  
  const label = computed(() => {
    const { type = 'spots' } = stock || {};
    
    const typeLabels: Record<string, { singular: string; plural: string }> = {
      spots: { singular: 'spot', plural: 'spots' },
      hours: { singular: 'hour', plural: 'hours' },
      units: { singular: 'unit', plural: 'units' },
      licenses: { singular: 'license', plural: 'licenses' },
      seats: { singular: 'seat', plural: 'seats' },
    };
    
    const { singular, plural } = typeLabels[type] || { singular: type, plural: type };
    const remaining = spotsRemaining.value || 0;
    const typeLabel = remaining === 1 ? singular : plural;
    
    return `${remaining} ${typeLabel} remaining`;
  });
  
  return {
    isSoldOut,
    claimed,
    percentClaimed,
    spotsRemaining,
    urgencyLevel,
    urgencyColor,
    label,
    useLiveCount,
  };
}
