export default defineAppConfig({
  icon: {
    aliases: {
      'arrow-left': 'lucide:arrow-left',
      'arrow-right': 'lucide:arrow-right',
      'check': 'lucide:check',
      'close': 'lucide:x',
      'search': 'lucide:search',
      // {DX}: Offer status icon aliases
      'status-available': 'lucide:check status-available',
      'status-beta': 'lucide:flask-conical status-beta',
      'status-coming-soon': 'lucide:clock status-coming-soon',
    },
  },
  ui: {
    button: {
      defaultVariants: {
        color: 'secondary',
        variant: 'solid',
        size: 'md',
      },
    },
    pricingTable: {
      variants: {
        section: {
          true: {
            tr: '*:pt-8',
          },
        },
        active: {
          true: {
            tierFeatureIcon: 'text-primary',
          },
        },
        highlight: {
          true: {
            tier: 'bg-info/20 border-x border-t-0 border-default rounded-none',
            td: 'bg-info/20 border-default',
            item: 'bg-info/20',
          },
        },
      },
    },
    pageFeature: {
      slots: {
        root: 'relative',
        wrapper: '',
        leading: 'inline-flex items-center justify-center',
        leadingIcon: 'size-5 shrink-0 text-secondary',
        title: 'text-base text-pretty font-semibold text-highlighted',
        description: 'text-[15px] text-pretty text-muted',
      },
    },
    pageSection: {
      slots: {
        leadingIcon: 'size-10 shrink-0 text-secondary',
      },
      variants: {
        headline: {
          true: {
            headline:
              'font-semibold text-primary uppercase flex items-center gap-1.5',
          },
        },
      },
    },
    // NEEDS REVIEW
    carousel: {
      slots: {
        root: 'relative focus:outline-none',
        viewport: 'overflow-hidden',
        container: 'flex items-center -ms-4',
        item: 'min-w-0 shrink-0 basis-full ps-4 transition-all duration-300',
        controls: '',
        arrows: '',
        prev: 'absolute start-4 top-1/2 -translate-y-1/2',
        next: 'absolute end-4 top-1/2 -translate-y-1/2',
        dots: 'absolute inset-x-0 -bottom-7 flex items-center justify-center gap-3',
        dot: 'cursor-pointer size-3 bg-gray-400 rounded-full transition-colors data-[active=true]:bg-accented',
      },
      variants: {
        orientation: {
          horizontal: {
            container: 'flex-row -ms-4',
            item: 'ps-4',
            prev: 'start-4 sm:-start-12 top-1/2 -translate-y-1/2',
            next: 'end-4 sm:-end-12 top-1/2 -translate-y-1/2',
          },
          vertical: {
            container: 'flex-col -mt-4',
            item: 'pt-4',
            prev: 'top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90',
            next: 'bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90',
          },
        },
        variant: {
          gallery: {
            item: 'basis-full md:basis-1/2 lg:basis-1/3 transition-all duration-300 [&:last-child]:mr-4',
            container: 'flex items-center gap-4',
          },
          hero: {
            item: 'basis-full transition-all duration-300 [&:last-child]:mr-4',
            container: 'flex items-center',
          },
          thumbnail: {
            item: 'basis-1/4 md:basis-1/6 transition-all duration-300 [&:last-child]:mr-2',
            container: 'flex items-center gap-2',
          },
        },
        active: {
          true: {
            dot: 'data-[state=active]:bg-inverted',
          },
        },
      },
      defaultVariants: {
        variant: 'gallery',
      },
    },
  },
});
