<!-- app/components/section/Hero.vue - UPDATED WITH NEW VARIANTS -->
<script setup lang="ts">
interface Card {
  title: string
  description: string
  icon: string
  iconColor?: string
}

interface Props {
  title: string
  subtitle?: string
  description?: string
  
  // Layout & Style
  layout?: 'split' | 'centered' | 'minimal' | 'fullscreen' | 'compact'
  mediaType?: 'cards' | 'image' | 'video' | 'none'
  hasBackground?: boolean
  
  // Content
  cards?: Card[]
  
  // Media props
  mediaSrc?: string
  mediaAlt?: string
  mediaPoster?: string
  
  // CTA
  showCta?: boolean
  ctaText?: string
  ctaLink?: string
  ctaDescription?: string
  
  // Background
  backgroundPreset?: 'none' | 'neural' | 'quantum' | 'cyber' | 'circuit' | 'minimal'
  
  // Theme
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'centered',
  mediaType: 'cards',
  hasBackground: true,
  showCta: false,
  ctaText: 'Get Started',
  backgroundPreset: 'circuit',
})

// Helper function for icon colors
function getIconColor(iconColor: string | undefined, index: number): string {
  if (iconColor) {
    if (iconColor.includes('primary')) return 'text-primary'
    if (iconColor.includes('blue')) return 'text-blue-400'
    if (iconColor.includes('amber')) return 'text-amber-400'
    if (iconColor.includes('secondary')) return 'text-secondary-400'
    return iconColor
  }
  const colors = ['text-primary', 'text-blue-400', 'text-amber-400']
  return colors[index] || 'text-primary'
}

// Computed values for section variants
const sectionVariant = computed(() => {
  switch (props.layout) {
    case 'fullscreen': return 'hero'
    case 'minimal': return 'compact'
    case 'compact': return 'compact'
    default: return 'generous'
  }
})

const centerVariant = computed(() => {
  if (props.layout === 'fullscreen') return 'wide'
  return 'prose'
})

const stackVariant = computed(() => {
  switch (props.layout) {
    case 'minimal': return 'compact'
    case 'compact': return 'default'
    default: return 'spacious'
  }
})
</script>

<template>
  <LayoutSection 
    :variant="sectionVariant" 
    :background="hasBackground ? backgroundPreset : 'none'"
    :class="$attrs.class"
  >
    <!-- SPLIT LAYOUT -->
    <template v-if="layout === 'split'">
      <LayoutCenter variant="full">
        <LayoutSplit variant="default">
          <template #primary>
            <LayoutStack :variant="stackVariant">
              <!-- Text Content -->
              <LayoutStack variant="default">
                <LayoutHeading anchor variant="hero" :text="title" />

                <LayoutText 
                  v-if="subtitle"
                  variant="subtitle"
                  :text="subtitle"
                />
                
                <LayoutText 
                  v-if="description"
                  variant="description"
                  :text="description"
                />
              </LayoutStack>
              
              <!-- CTA for split layout -->
              <LayoutStack v-if="showCta" variant="compact">
                <LayoutText 
                  v-if="ctaDescription"
                  variant="caption"
                  :text="ctaDescription"
                />
                
                <LayoutCluster variant="default">
                  <UButton
                    :label="ctaText"
                    color="primary"
                    size="lg"
                    :to="ctaLink"
                    trailing-icon="i-lucide-arrow-right"
                  />
                </LayoutCluster>
              </LayoutStack>
            </LayoutStack>
          </template>
          
          <template #secondary>
            <!-- Cards for split - vertical stack -->
            <LayoutStack v-if="mediaType === 'cards' && cards?.length" variant="default">
              <LayoutCenter variant="narrow">
                <LayoutStack variant="compact">
                  <UCard
                    v-for="(card, index) in cards"
                    :key="card.title"
                    class="bg-elevated/50 backdrop-blur-sm border-default hover:border-accented transition-all duration-200"
                  >
                    <LayoutCluster variant="no-wrap">
                      <div
                        class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        :class="card.iconColor || 'bg-primary/20'"
                      >
                        <UIcon
                          :name="card.icon"
                          class="size-6"
                          :class="getIconColor(card.iconColor, index)"
                        />
                      </div>
                      <LayoutStack variant="compact">
                        <LayoutHeading variant="card" :text="card.title" />
                        <LayoutText variant="small" :text="card.description" />
                      </LayoutStack>
                    </LayoutCluster>
                  </UCard>
                </LayoutStack>
              </LayoutCenter>
            </LayoutStack>
            
            <!-- Image -->
            <LayoutFrame 
              v-else-if="mediaType === 'image' && mediaSrc"
              variant="video"
            >
              <MediaImage
                :src="mediaSrc"
                :alt="mediaAlt || title"
                :width="600"
                :height="400"
              />
            </LayoutFrame>

            <!-- Video -->
            <LayoutFrame 
              v-else-if="mediaType === 'video' && mediaSrc"
              variant="video"
            >
              <MediaVideo
                :src="mediaSrc"
                :poster="mediaPoster"
                :autoplay="false" 
                muted
              />
            </LayoutFrame>
          </template>
        </LayoutSplit>
      </LayoutCenter>
    </template>

    <!-- ALL OTHER LAYOUTS (CENTERED, MINIMAL, ETC) -->
    <template v-else>
      <LayoutCenter :variant="centerVariant">
        <LayoutStack :variant="stackVariant">
          
          <!-- Text Section -->
          <LayoutCenter variant="text-only">
            <LayoutStack variant="default">
              <LayoutHeading 
              :id="title"
              :text="title"
                anchor
                :variant="layout === 'fullscreen' ? 'hero' : 'section'"
              />
              
              <LayoutText 
              v-if="subtitle"
                :text="subtitle" 
                :variant="layout === 'fullscreen' ? 'hero-subtitle' : 'subtitle'"
              />
              
              <LayoutText 
              v-if="description"
                :text="description"
                variant="description"
              />
            </LayoutStack>
          </LayoutCenter>

          <!-- Media Section -->
          <div v-if="mediaType !== 'none'">
            
            <!-- Cards Grid -->
            <LayoutGrid v-if="mediaType === 'cards' && cards?.length" variant="thirds">
              <UCard
                v-for="(card, index) in cards"
                :key="card.title"
                class="bg-elevated/50 backdrop-blur-sm border-default hover:border-accented transition-all duration-200"
              >
                <LayoutStack variant="centered">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center"
                    :class="card.iconColor || 'bg-primary/20'"
                  >
                    <UIcon
                      :name="card.icon"
                      class="size-5"
                      :class="getIconColor(card.iconColor, index)"
                    />
                  </div>
                  <LayoutStack variant="centered">
                    <LayoutHeading :text="title" variant="card" />
                    <LayoutText :text="card.description" variant="small" />
                  </LayoutStack>
                </LayoutStack>
              </UCard>
            </LayoutGrid>
            
            <!-- Image -->
            <LayoutCenter v-else-if="mediaType === 'image' && mediaSrc">
              <LayoutFrame variant="video" class="max-w-4xl">
                <MediaImage
                  :src="mediaSrc"
                  :alt="mediaAlt || title"
                  :width="800"
                  :height="500"
                  sizes="100vw sm:80vw md:60vw lg:50vw"
                />
              </LayoutFrame>
            </LayoutCenter>

            <!-- Video -->
            <LayoutCenter v-else-if="mediaType === 'video' && mediaSrc">
              <LayoutFrame variant="video" class="max-w-4xl">
                <MediaVideo
                  :src="mediaSrc"
                  :poster="mediaPoster"
                  :autoplay="layout === 'fullscreen'"
                  muted
                />
              </LayoutFrame>
            </LayoutCenter>
          </div>

          <!-- CTA Section (for non-split layouts) -->
          <LayoutCenter v-if="showCta && layout !== 'split'">
            <LayoutStack variant="centered">
              <LayoutText 
                v-if="ctaDescription"
                variant="caption"
                :text="ctaDescription"
              />
              
              <LayoutCluster variant="centered">
                <UButton
                  :label="ctaText"
                  color="primary"
                  size="lg"
                  :to="ctaLink"
                  trailing-icon="i-lucide-arrow-right"
                />
              </LayoutCluster>
            </LayoutStack>
          </LayoutCenter>
        </LayoutStack>
      </LayoutCenter>
    </template>
  </LayoutSection>
</template>