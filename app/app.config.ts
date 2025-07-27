// This will be powerful for theming
// theme: {
//   defaultVariants: {
//     color: 'neutral',
//     size: 'sm'
//   }
// },
export default defineAppConfig({
  ui: {
    theme: {
      colors: {
        primary: 'emerald',
        secondary: 'sky',
        neutral: 'zinc',
      },
    },
    link: {
      base: 'focus-visible:outline-secondary-800',
      variants: {
        active: {
          true: 'text-secondary',
          false: 'text-muted',
        },
      },
      compoundVariants: [
        {
          active: false,
          disabled: false,
          class: ['hover:text-secondary-800', 'transition-colors'],
        },
      ],
    },
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
        dots:
          'absolute inset-x-0 -bottom-7 flex items-center justify-center gap-3',
        dot:
          'cursor-pointer size-3 bg-gray-400 rounded-full transition-colors data-[active=true]:bg-accented',
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
            prev:
              'top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90',
            next:
              'bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90',
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
})
