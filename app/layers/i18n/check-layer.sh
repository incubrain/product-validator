#!/bin/bash
# Quick test script for the i18n layer

echo "🔍 Checking layer structure..."

# Check if all components exist
echo "📁 Components:"
ls -la /Users/mac/Development/incubrain/nuxt-launch-kit/app/layers/i18n/app/components/ib/

echo ""
echo "📁 Composables:"
ls -la /Users/mac/Development/incubrain/nuxt-launch-kit/app/layers/i18n/app/composables/

echo ""
echo "📁 Types:"
ls -la /Users/mac/Development/incubrain/nuxt-launch-kit/app/layers/i18n/types/

echo ""
echo "📁 Locales:"
ls -la /Users/mac/Development/incubrain/nuxt-launch-kit/app/layers/i18n/locales/

echo ""
echo "✅ Layer structure check complete!"
echo "🚀 Ready to test with: npm run dev"
