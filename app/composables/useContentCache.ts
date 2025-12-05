export const useContentCache = () => {
  const getCachedFaqs = () => {
    return useAsyncData('app-cached-faqs', () =>
      queryCollection('faq').all()
    );
  };

  const getSiteConfig = () => {
    return useAsyncData('app-config', () =>
      queryCollection('config').where('stem', '=', 'config/site').first()
    );
  };

  const getFounder = () => {
    return useAsyncData('app-founder', () =>
      queryCollection('team').where('stem', '=', 'team/founder').first()
    );
  };

  return {
    getCachedFaqs,
    getSiteConfig,
    getFounder,
  };
};
