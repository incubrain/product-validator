## **🎨 Color Usage Rulebook**

### **HIERARCHY: Single Primary Action Per Section**
- **1 PRIMARY button** per viewport/section maximum
- **Secondary** for alternative actions only  
- **Neutral** for tertiary/ghost actions

---

## **🎯 PRIMARY - Brand Authority & Main Actions**

**Purpose:** Establish brand identity and drive primary conversions  
**Psychology:** Authority, trust, confidence, action-oriented decision making

**Reasoning:** Primary color creates visual hierarchy and guides user attention to most important actions. Overuse dilutes impact and reduces conversion rates.

**✅ USE FOR:**
- Main CTA buttons (`color="primary"`)
- Brand headlines and key messaging
- Active/selected states
- Key metrics and achievements
- Logo and brand elements

**❌ NEVER USE FOR:**
- Multiple CTAs in same section
- Decorative elements without purpose
- Body text (reduces readability)
- Secondary navigation

**Shade Usage:**
- `primary-500`: Core buttons, primary actions
- `primary-300-400`: Links, interactive elements on dark backgrounds
- `primary-50-100`: Highlighted text, subtle emphasis
- `primary/5-20`: Subtle backgrounds, gentle borders
- `primary-600-700`: Hover/active states, deeper emphasis
- `primary-800+`: **Rarely used** - only for high-contrast text on light backgrounds

---

## **🔧 SECONDARY - Supporting Brand Actions**

**Purpose:** Complement primary actions without competing  
**Psychology:** Professional competence, reliability, supporting choice

**Reasoning:** Creates action hierarchy while maintaining brand consistency. Offers users alternative paths without overwhelming the primary goal.

**✅ USE FOR:**
- Alternative CTA buttons when choice is needed
- Supporting brand elements
- Professional credentials/badges
- Hover states for neutral elements
- Secondary navigation that relates to brand

**❌ AVOID:**
- Competing with primary CTAs
- Main conversion paths
- When neutral would be more appropriate

**Shade Usage:**
- `secondary-500`: Core supporting actions
- `secondary-300-400`: Supporting links, subtle interactions
- `secondary-50-100`: Light emphasis, backgrounds
- `secondary/5-20`: Very subtle backgrounds
- `secondary-600+`: **Rarely used** - only for high-contrast scenarios

---

## **✅ SUCCESS (Green) - Positive Validation**

**Purpose:** Communicate completion, achievement, and positive outcomes  
**Psychology:** Achievement, correctness, safety, progress, growth

**Reasoning:** Green universally signals "go," "correct," and "positive." Essential for user confidence and progress validation.

**✅ USE FOR:**
- Checkmarks and completion icons
- Success messages and confirmations
- Positive metrics and growth indicators
- Value propositions and benefits
- Progress completion states
- Testimonial indicators

**Shade Usage:**
- `success-500`: Core success indicators
- `success-400-300`: Interactive success elements
- `success-600-700`: Strong success emphasis
- `success-50-200`: Success backgrounds, subtle indicators
- `success-800+`: **Rarely used** - text on light success backgrounds

---

## **⚠️ WARNING (Amber/Orange) - Urgency & Attention**

**Purpose:** Create urgency and highlight time-sensitive information  
**Psychology:** Caution, urgency, scarcity, immediate attention needed

**Reasoning:** Orange/amber triggers alertness without alarm. Drives action through scarcity psychology while maintaining trust.

**✅ USE FOR:**
- Limited time offers and scarcity indicators
- Inventory alerts and countdown timers
- "Coming soon" or pending status
- Important notifications requiring attention
- Discount/savings badges
- Progress indicators for urgent actions

**Shade Usage:**
- `warning-500`: Core urgency indicators
- `warning-400-300`: Urgent interactive elements
- `warning-600-700`: Strong urgency emphasis
- `warning-50-200`: Urgent backgrounds, highlights
- `warning-800+`: **Rarely used** - high-contrast urgent text

---

## **🚨 ERROR (Red) - Problems & Critical States**

**Purpose:** Signal problems, errors, and destructive actions  
**Psychology:** Danger, stop, critical attention, caution before action

**Reasoning:** Red universally signals danger and problems. Essential for preventing user mistakes and highlighting critical issues.

**✅ USE FOR:**
- Form validation errors
- Critical warning messages
- Destructive action confirmations
- System errors and failures
- Critical FAQ items and warnings
- Required field indicators

**Shade Usage:**
- `error-500`: Core error indicators
- `error-400-300`: Error interactive elements
- `error-600-700`: Critical error emphasis
- `error-50-200`: Error backgrounds, gentle alerts
- `error-800+`: **Rarely used** - high-contrast error text

---

## **ℹ️ INFO (Blue/Cyan) - Neutral Information**

**Purpose:** Provide neutral, informational context without bias  
**Psychology:** Calm, informative, trustworthy, educational

**Reasoning:** Blue conveys reliability and information without emotional weight. Perfect for data, credentials, and objective content.

**✅ USE FOR:**
- Data badges and research indicators
- Informational callouts and tips
- Status indicators (neutral states)
- Educational content markers
- Metadata and supplementary info
- Version numbers, dates, sample sizes

**Shade Usage:**
- `info-500`: Core informational elements
- `info-400-300`: Interactive info elements
- `info-600-700`: Emphasized information
- `info-50-200`: Info backgrounds, subtle highlights
- `info-800+`: **Rarely used** - high-contrast info text

---

## **⚪ NEUTRAL (Gray) - Foundation & Structure**

**Purpose:** Provide visual foundation without semantic meaning  
**Psychology:** Calm, professional, non-intrusive, foundational

**Reasoning:** Gray creates visual hierarchy and structure without emotional bias. Essential for readability and layout organization.

### **Text Hierarchy (Dark Theme):**
- `neutral-50-100`: Primary readable text
- `neutral-200-300`: Secondary text, captions
- `neutral-400-500`: Muted text, metadata
- `neutral-600+`: **For backgrounds only**

### **Surfaces & Backgrounds:**
- `neutral-950`: Base background (darkest)
- `neutral-900`: Section backgrounds
- `neutral-800`: Card backgrounds, elevated surfaces
- `neutral-700`: Input backgrounds, subtle accents
- `neutral-600-500`: **Rarely used** - mid-tone accents
- `neutral-400-100`: **Light theme only**

### **Actions & Interactions:**
- `color="neutral"`: Non-semantic actions, tertiary choices
- `variant="ghost"`: Minimal visual weight actions
- `variant="outline"`: Subtle but defined actions

---

## **🎨 Dark Shade Usage (800-950)**

**When to use darker shades:**
- **950**: Primary dark background only
- **900**: Secondary backgrounds, page sections
- **800**: Elevated surfaces (cards, modals, inputs)
- **700**: Accent surfaces, hover states

**For colored scales (primary/secondary):**
- **800-950**: Only for high-contrast text on light backgrounds
- **Generally avoid**: Dark colored shades on dark themes create poor contrast

---

## **📋 Quick Reference**

```vue
<!-- ✅ CORRECT HIERARCHY -->
<UButton color="primary">Main Action</UButton>
<UButton color="secondary">Alternative</UButton>  
<UButton color="neutral" variant="ghost">Tertiary</UButton>

<!-- ✅ SEMANTIC USAGE -->
<UIcon name="i-lucide-check" class="text-success" />
<UBadge color="warning">Limited Time</UBadge>
<UAlert color="error">Critical Warning</UAlert>
<UBadge color="info">Research: n=150</UBadge>

<!-- ✅ TEXT HIERARCHY -->
<h1 class="text-primary">Brand Headlines</h1>
<p class="text-neutral-200">Important Content</p>
<p class="text-neutral-300">Secondary Content</p>
<p class="text-neutral-400">Metadata</p>
```

**Ship this comprehensive rulebook?**