// NEW FILE: Extract stock logic from StockProgress.vue
import type { ProductStock, ProductId } from '#types';

export function useProductStock(stock?: ProductStock, productId?: ProductId) {
  const route = useRoute();
  const forceUnavailable = computed(() => {
    if (import.meta.dev) {
      return route.query.unavailable === 'true';
    }
    return false;
  });

  const useLiveCount = computed(() => productId === 'waitlist');
  
  const { data: metrics } = useLiveCount.value
    ? useFetch('/api/v1/metrics/leads')
    : { data: ref(null) };
  
  const claimed = computed(() => {
    if (useLiveCount.value && metrics.value) {
      return metrics.value.total || 0;
    }
    return stock?.claimed || 0;
  });
  
  const isAvailable = computed(() => {
    if (!stock) return true;
    
    if (forceUnavailable.value) {
      console.log('[useProductStock] 🧪 UNAVAILABLE STATE FORCED via ?unavailable=true');
      return false;
    }
    
    const unavailable = claimed.value >= stock.limit;
    console.log('[useProductStock] Availability check:', {
      productId,
      claimed: claimed.value,
      limit: stock.limit,
      isAvailable: !unavailable,
      forceUnavailable: forceUnavailable.value,
    });
    
    return !unavailable; // Invert: true = available, false = not available
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
    isAvailable,
    claimed,
    percentClaimed,
    spotsRemaining,
    urgencyLevel,
    urgencyColor,
    label,
    useLiveCount,
  };
}
