<script setup lang="ts">
useSchemaOrg([
  defineOrganization({
    name: 'Incubrain ltd.',
    description:
      'AI automation specialists with space tech expertise and global-local execution',
    url: 'https://incubrain.org',
    logo: '/logo.png', // Add when available

    // Business details
    foundingDate: '2025',

    // Contact information
    email: 'hello@incubrain.com',
    contactPoint: {
      '@type': 'ContactPoint',
      'contactType': 'Customer Service',
      'email': 'hello@incubrain.com',
      'areaServed': 'IN',
      'availableLanguage': 'English',
    },

    // Business location
    address: {
      '@type': 'PostalAddress',
      'addressLocality': 'Pune',
      'addressRegion': 'Maharashtra',
      'addressCountry': 'IN',
    },

    // Services offered
    makesOffer: [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'AI Business Process Automation',
          'description': 'Custom AI automation solutions for business processes',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Space Technology Platform Development',
          'description':
            'Specialized platform development for space technology companies',
        },
      },
    ],
  }),
])
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
/* Vue Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition-duration: 0.01ms !important;
  }

  .page-enter-from,
  .page-leave-to {
    transform: none !important;
  }
}
</style>
