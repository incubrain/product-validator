import { STAGE_CONFIG } from '#stage-config';

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
  const getPrimaryOffer = () => useAsyncData('app-primary-offer', () => 
      queryCollection('offers').where('stem', '=', `offers/${STAGE_CONFIG.offers.primary}`).first()
    );

  /**
   * Fetch a specific offer by id
   */
  const getOffer = (id: string) => {
    return useAsyncData(`app-offer-${id}`, () => 
      queryCollection('offers').where('stem', '=', `offers/${id}`).first()
    );
  };

  return {
    getSiteConfig,
    getFounder,
    getPrimaryOffer,
    getOffer,
  };
};
