<!-- components/layout/TestimonialCard.vue -->
<script setup lang="ts">
interface TestimonialItem {
  quote: string
  author: string
  title: string
  company: string
  initials?: string
  rating?: number
  avatar?: string
}

interface Props {
  items: TestimonialItem[]
  variant?: 'card' | 'minimal' | 'featured'
  showRating?: boolean
  showAvatar?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'card',
  showRating: true,
  showAvatar: true,
})

// For carousel compatibility, we'll render the first item or loop through all
const testimonial = computed(() => props.items[0] || ({} as TestimonialItem))
</script>

<template>
  <!-- Featured variant (for single testimonial showcase) -->
  <div
    v-if="variant === 'featured'"
    class="bg-elevated/50 backdrop-blur-sm border border-muted rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500"
  >
    <LayoutGradientCard gradient-color="secondary">
      <div class="p-8 lg:p-12">
        <div class="grid lg:grid-cols-3 gap-8 items-center">
          <!-- Quote Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Star Rating -->
            <div
              v-if="showRating && testimonial?.rating"
              class="flex items-center gap-1 mb-4"
            >
              <div
                v-for="star in testimonial.rating || 5"
                :key="star"
                class="text-amber-400"
              >
                <UIcon
                  name="i-lucide-star"
                  class="size-5 fill-current"
                />
              </div>
            </div>

            <!-- Quote -->
            <blockquote
              class="text-2xl lg:text-3xl text-highlighted leading-relaxed font-medium relative"
            >
              <UIcon
                name="i-lucide-quote"
                class="absolute -top-2 -left-4 size-8 text-secondary/20"
              />
              {{ testimonial.quote }}
            </blockquote>

            <!-- Author -->
            <div class="flex items-center gap-6 pt-4 border-t border-muted/50">
              <div
                class="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center ring-2 ring-secondary/20"
              >
                <NuxtImg
                  v-if="showAvatar && testimonial.avatar"
                  :src="testimonial.avatar"
                  :alt="testimonial.author"
                  class="w-full h-full rounded-xl object-cover"
                />
                <span
                  v-else
                  class="text-secondary font-bold text-xl"
                >
                  {{
                    testimonial.initials ||
                    testimonial.author
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                  }}
                </span>
              </div>

              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                  <div class="font-bold text-highlighted text-xl">{{ testimonial.author }}</div>
                  <div
                    class="w-5 h-5 bg-secondary/20 rounded-full flex items-center justify-center"
                  >
                    <UIcon
                      name="i-lucide-check"
                      class="size-3 text-secondary"
                    />
                  </div>
                </div>
                <div class="text-muted text-lg">{{ testimonial.title }}</div>
                <div class="text-secondary font-medium">{{ testimonial.company }}</div>
              </div>
            </div>
          </div>

          <!-- Visual Element -->
           <UIcon name="i-lucide-quote" class="text-secondary/60 hidden lg:block" size="2xl" />
        </div>
      </div>
    </LayoutGradientCard>
  </div>

  <!-- Card variant (for carousel/grid) -->
  <div
    v-else-if="variant === 'card'"
    class="bg-elevated border border-muted rounded-2xl p-6 h-full flex flex-col hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300"
  >
    <!-- Rating -->
    <div
      v-if="showRating && testimonial.rating"
      class="flex items-center gap-1 mb-4"
    >
      <div
        v-for="star in testimonial.rating || 5"
        :key="star"
        class="text-amber-400"
      >
        <UIcon
          name="i-lucide-star"
          class="size-4 fill-current"
        />
      </div>
    </div>

    <!-- Quote -->
    <blockquote class="text-lg text-highlighted mb-6 flex-1 leading-relaxed">
      "{{ testimonial.quote }}"
    </blockquote>

    <!-- Author -->
    <div class="flex items-center gap-4 mt-auto">
      <div class="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
        <NuxtImg
          v-if="showAvatar && testimonial.avatar"
          :src="testimonial.avatar"
          :alt="testimonial.author"
          class="w-full h-full rounded-xl object-cover"
        />
        <span
          v-else
          class="text-secondary font-semibold"
        >
          {{
            testimonial.initials ||
            testimonial.author
              ?.split(' ')
              .map((n) => n[0])
              .join('')
          }}
        </span>
      </div>

      <div>
        <div class="font-semibold text-highlighted">{{ testimonial.author }}</div>
        <div class="text-sm text-muted">{{ testimonial.title }}</div>
        <div class="text-sm text-secondary font-medium">{{ testimonial.company }}</div>
      </div>
    </div>
  </div>

  <!-- Minimal variant (for compact displays) -->
  <div
    v-else
    class="text-center p-4"
  >
    <div class="mb-3">
      <UIcon
        name="i-lucide-quote"
        class="size-6 text-secondary/40 mx-auto"
      />
    </div>
    <p class="text-highlighted mb-4 italic">{{ testimonial.quote }}</p>
    <div class="text-sm">
      <div class="font-semibold text-highlighted">{{ testimonial.author }}</div>
      <div class="text-muted">{{ testimonial.company }}</div>
    </div>
  </div>
</template>
