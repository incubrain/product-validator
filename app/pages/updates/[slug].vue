<script setup lang="ts">
import { STAGE_CONFIG } from '#stage-config';

const route = useRoute();
const slug = route.params.slug as string;

// Fetch update content
const { data: update } = await useAsyncData(`update-${slug}`, () =>
  queryCollection('pages').path(`/updates/${slug}`).first()
);

// Fetch surround data
const { data: surround } = await useAsyncData(`update-${slug}-surround`, () =>
  queryCollectionItemSurroundings('pages', `/updates/${slug}`, {
    fields: ['title', 'description', 'version'],
  })
);

if (!update.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Update not found',
  });
}

useHead({
  title: update.value.title,
  meta: [
    {
      name: 'description',
      content: update.value.summary,
    },
  ],
});
</script>

<template>
  <UContainer>

    <UPage>
        <template #left>
          <UPageAside>
            <div class="space-y-6 py-6">
              
    
              <div class="space-y-4">
                <div class="flex flex-col gap-1">
                  <div class="flex items-center text-sm gap-2">
                    <UIcon name="i-lucide-tag" class="size-4 text-primary" />
                    <span class="font-mono font-bold">{{ update.version }}</span>
                  </div>
                </div>
    
                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-calendar" class="size-4 text-muted" />
                    <NuxtTime
                      :datetime="update.date"
                      year="numeric"
                      month="short"
                      day="numeric"
                      class="font-medium"
                    />
                  </div>
                </div>
              </div>
    
              <USeparator />
    
              <div class="space-y-2">
                <UButton
                to="/updates"
                icon="i-lucide-arrow-left"
                color="neutral"
                variant="soft"
                size="sm"
                label="Back"
                class="justify-start"
              />
                <IConvertButton
                  :product-id="STAGE_CONFIG.products.secondary"
                  location="update-sidebar"
                  cta-name="funnel"
                  size="sm"
                  class="justify-start"
                />
              </div>
            </div>
          </UPageAside>
        </template>
    
        <UPageBody class="max-w-2xl mx-auto">
          <div >
            <!-- Mobile Header (Back + Meta) -->
            <div class="lg:hidden mb-8 space-y-6">
              <UButton
                to="/updates"
                icon="i-lucide-arrow-left"
                color="neutral"
                variant="ghost"
                label="Back to Updates"
                class="-ml-2.5"
              />
              
              <div class="flex flex-wrap items-center gap-4 text-sm">
                 <div class="flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary/5 border border-primary/10">
                    <UIcon name="i-lucide-tag" class="size-3.5 text-primary" />
                    <span class="font-mono font-bold text-primary">{{ update.version }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-muted">
                    <UIcon name="i-lucide-calendar" class="size-3.5" />
                    <NuxtTime
                      :datetime="update.date"
                      year="numeric"
                      month="long"
                      day="numeric"
                    />
                  </div>
              </div>
            </div>
    
            <h1 class="text-4xl font-bold tracking-tight mb-4">{{ update.title }}</h1>
            <p class="text-xl text-muted leading-relaxed mb-8">{{ update.summary }}</p>
    
            <article class="prose max-w-none">
              <ContentRenderer v-if="update" :value="update" />
            </article>

            <USeparator v-if="surround?.filter(Boolean).length" class="my-12" />

            <UContentSurround :surround="(surround as any)" />
    
            <!-- Mobile CTA -->
            <div class="lg:hidden mt-12 pt-8 border-t">
               <IConvertButton
                  :product-id="STAGE_CONFIG.products.secondary"
                  location="update-mobile-bottom"
                  cta-name="funnel"
                  block
                />
            </div>
          </div>
        </UPageBody>
    </UPage>
  </UContainer>
</template>
