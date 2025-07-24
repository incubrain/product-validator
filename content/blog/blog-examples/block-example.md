---
title: "Block Example"
description: "Explore the power and flexibility of carousel components for modern web experiences, featuring multiple profiles and advanced features."
date: "2025-07-15"
category: "tech-breakthroughs"
author: "Incubrain Team"
image: "carousel-showcase-hero.jpg"
readTime: "6 min"
featured: true
tags: ["Web Components", "Carousels", "Interactive Media", "User Experience"]
ogImage:
  component: BlogPost
  props:
    title: "Mastering Carousels"
    description: "A deep dive into interactive content display"
    category: "Tech Breakthroughs"
sitemap:
  lastmod: "2025-07-15"
  changefreq: "monthly"
  priority: 0.8
robots: "index, follow"
schemaOrg:
  - "@type": "BlogPosting"
    headline: "Mastering Carousels: A Deep Dive into Interactive Content Display"
    author:
      "@type": "Organization"
      name: "Incubrain Team"
    datePublished: "2025-07-15"
    wordCount: 2000
    timeRequired: "PT6M"
---

# Page with Dynamic Sections and Blocks

This page demonstrates the new dynamic section and block architecture.

::block-section{name="Orientation" type="vertical" styles='{"padding-top": "3rem"}'}
  :::block{name="Cta" variant="compact" background="circuit" id="cta-carousel"}
  ---
  title: "Carousel CTA (Compact)"
  body: "This is a compact CTA with a circuit background, nested inside a carousel slot."
  cta:
    title: "Learn More"
    link: "/blog"
  ---
  :::

  :::block{name="Cta" variant="full-width" background="solid-blue" id="cta-full"}
  ---
  title: "Full-Width CTA Example"
  body: "This CTA spans the full width of its container and uses a solid blue background."
  cta:
    title: "View Details"
    link: "/blog"
  ---
  :::

  :::block{name="Cta" variant="default" background="gradient" id="cta-default"}
  ---
  title: "Default CTA (Gradient)"
  body: "Our standard CTA variant with a lovely green-to-teal gradient background."
  cta:
    title: "Get Started"
    link: "/blog"
  ---
  :::

  :::block{name="Cta" id="cta-invalid-1" variant="compact"}
  ---
  # title: "Missing Title" <-- This line is commented out
  body: "This CTA will show an error because the title is missing."
  cta:
    title: "Broken Link"
    link: "not-a-valid-url" # Invalid URL
  ---
  :::
::
