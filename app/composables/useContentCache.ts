export const useContentCache = () => {
  /**
   * Fetch site-wide configuration (business info, social links)
   * Renamed key to avoid conflict with @nuxtjs/seo
   */
  const getSiteConfig = () => {
    return useAsyncData('app-site-config', () => 
      queryCollection('config').where('stem', '=', 'config/site').first()
    );
  };

  /**
   * Fetch founder profile and story
   */
  const getFounder = () => {
    return useAsyncData('app-founder', () => 
      queryCollection('team').where('stem', '=', 'team/founder').first()
    );
  };

  /**
   * Fetch the primary offer (marked with primary: true)
   */
  const getPrimaryOffer = () => {
    return useAsyncData('app-primary-offer', () => 
      queryCollection('offers').where('primary', '=', true).first()
    );
  };

  /**
   * Fetch a specific offer by slug
   */
  const getOffer = (slug: string) => {
    return useAsyncData(`app-offer-${slug}`, () => 
      queryCollection('offers').where('slug', '=', slug).first()
    );
  };

  return {
    getSiteConfig,
    getFounder,
    getPrimaryOffer,
    getOffer,
  };
};
