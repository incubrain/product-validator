// NEW FILE: Offer-specific analytics tracking
import type { Offer } from '#types';

export function useOfferAnalytics(offer: Ref<Offer>) {
  const { trackEvent } = useEvents();
  
  // Track page view on mount
  onMounted(() => {
    trackEvent({
      id: `offer_${offer.value.slug}_view`,
      type: 'element_viewed',
      location: `offer-page-${offer.value.slug}`,
      action: 'page_view',
      target: `/get/${offer.value.slug}`,
      data: {
        offerId: offer.value.slug,
        metadata: {
          offer_slug: offer.value.slug,
          offer_type: offer.value.type,
          offer_price: offer.value.price,
          is_primary: offer.value.primary,
        },
      },
    });
  });
  
  // Track CTA clicks
  const trackCtaClick = (ctaType: 'primary' | 'secondary') => {
    const cta = ctaType === 'primary' ? offer.value.cta : offer.value.secondaryCta;
    if (!cta) return;
    
    trackEvent({
      id: `offer_${offer.value.slug}_cta_${ctaType}`,
      type: 'element_clicked',
      location: `offer-page-${offer.value.slug}`,
      action: 'cta_click',
      target: typeof cta.to === 'string' ? cta.to : (cta.to?.path || 'modal'),
      data: {
        offerId: offer.value.slug,
        metadata: {
          offer_slug: offer.value.slug,
          cta_type: ctaType,
          cta_label: cta.label,
        },
      },
    });
  };
  
  // Track sold out impressions
  const trackSoldOut = () => {
    trackEvent({
      id: `offer_${offer.value.slug}_sold_out`,
      type: 'element_viewed',
      location: `offer-page-${offer.value.slug}`,
      action: 'sold_out_view',
      target: offer.value.slug,
      data: {
        offerId: offer.value.slug,
        metadata: {
          offer_slug: offer.value.slug,
        },
      },
    });
  };
  
  return { trackCtaClick, trackSoldOut };
}
