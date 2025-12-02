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
   * Fetch the primary product (marked with primary: true)
   */
  const getPrimaryProduct = () => useAsyncData('app-primary-product', () => 
      queryCollection('products').where('stem', '=', `products/${STAGE_CONFIG.products.primary}`).first()
    );

  /**
   * Fetch a specific product by id
   */
  const getProduct = (id: string) => {
    return useAsyncData(`app-product-${id}`, () => 
      queryCollection('products')
        .orWhere(q => q.where('slug', '=', id).where('stem', '=', `products/${id}`))
        .first()
    );
  };

  return {
    getSiteConfig,
    getFounder,
    getPrimaryProduct,
    getProduct,
  };
};
