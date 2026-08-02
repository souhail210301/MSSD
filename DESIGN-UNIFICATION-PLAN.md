# Design Unification Analysis & Plan

**Date**: July 8, 2026  
**Purpose**: Unify design across all pages  
**Status**: ⚠️ **INCONSISTENCIES FOUND**

---

## Current Design Issues

### 🔴 Critical Inconsistencies Found

#### 1. **Top Padding Variations**
- **Home**: `padding-top: 5rem` (80px)
- **About**: `pt-24` (96px) ❌ DIFFERENT
- **Blog**: `padding-top: 5rem` (80px)
- **Portfolio**: `padding-top: 5rem` (80px)
- **Contact**: `padding-top: 5rem` (80px)
- **Services**: No explicit padding ❌ DIFFERENT

#### 2. **Design Systems**
- **Home/Blog/Portfolio/Contact**: Modern Material Design 3 (Tailwind + custom)
- **About**: Tailwind utility classes  
- **Services**: Bootstrap-style custom CSS ❌ DIFFERENT

#### 3. **Hero Section Styles**
- **Home**: Dark gradient hero with large typography
- **About**: Light background with asymmetric layout
- **Blog**: Dark background with search bar
- **Portfolio**: Dark gradient (consistent with home)
- **Contact**: Dark gradient (consistent with home)
- **Services**: Custom hero with different styling ❌ DIFFERENT

#### 4. **Typography Inconsistencies**
- **Home**: `text-7xl`, `font-headline`, `font-extrabold`
- **About**: `text-6xl`, `text-7xl`, `font-headline`
- **Blog**: `text-6xl`, `font-extrabold`
- **Services**: Custom font sizes ❌ DIFFERENT

#### 5. **Color Schemes**
- **Home/Blog/Portfolio/Contact**: Material Design 3 tokens (primary, tertiary, surface)
- **About**: Material Design 3 tokens ✅
- **Services**: Bootstrap colors ❌ DIFFERENT

---

## Design Standards to Implement

### ✅ Unified Standards

#### 1. **Main Wrapper**
```html
<main style="padding-top: 5rem;">
  <!-- All content -->
</main>
```
**Why 5rem?** Accounts for fixed navbar height

#### 2. **Hero Section Pattern**
```html
<section class="relative py-32 overflow-hidden" 
         style="background: linear-gradient(135deg, #00183D 0%, #002C64 100%);">
  <div class="max-w-7xl mx-auto px-8 relative z-10 text-center">
    <h1 class="text-6xl font-extrabold text-white mb-6" 
        style="font-family: 'Manrope'; letter-spacing: -1.5px;">
      Page Title
    </h1>
    <p class="text-xl leading-relaxed" 
       style="font-family: 'Inter'; font-weight: 500; color: #ADC7FF;">
      Subtitle
    </p>
  </div>
</section>
```

#### 3. **Content Section**
```html
<section class="py-20 px-8 bg-white">
  <div class="max-w-7xl mx-auto">
    <!-- Content -->
  </div>
</section>
```

#### 4. **Typography Scale**
```css
/* Headlines */
h1: text-6xl (60px) - Page titles
h2: text-5xl (48px) - Section titles  
h3: text-3xl (30px) - Card titles
h4: text-xl (20px) - Small titles

/* Body */
p: text-base (16px) - Regular text
small: text-sm (14px) - Meta text
```

#### 5. **Color Tokens**
```css
Primary: #00183D (Dark blue)
Secondary: #002C64 (Medium blue)
Tertiary: #5694FF (Light blue)
Surface: #F4F3F8 (Light gray)
Text: #1A1B1F (Almost black)
Text Secondary: #43474F (Gray)
```

#### 6. **Spacing System**
```css
Section padding: py-20 (5rem top/bottom)
Container padding: px-8 (2rem left/right)
Card padding: p-8 (2rem all sides)
Grid gaps: gap-8 (2rem)
```

---

## Pages Requiring Changes

### 🔴 Priority 1: Services Page
**Current**: Bootstrap-style custom CSS  
**Issue**: Completely different design system  
**Action**: Redesign with Material Design 3

### 🟡 Priority 2: About Page  
**Current**: Tailwind but `pt-24` instead of `padding-top: 5rem`  
**Issue**: Different top padding  
**Action**: Change to `padding-top: 5rem`

### 🟢 Priority 3: All Pages
**Current**: Mixed inline styles and Tailwind  
**Action**: Standardize approach

---

## Recommended Changes

### Change 1: Standardize Main Wrapper

**All pages should use**:
```html
<main style="padding-top: 5rem;">
```

**Pages to fix**:
- About page: Change from `class="pt-24"` to `style="padding-top: 5rem;"`

### Change 2: Unified Hero Pattern

**Standard hero for all pages**:
```html
<section class="relative py-32 overflow-hidden" 
         style="background: linear-gradient(135deg, #00183D 0%, #002C64 100%);">
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" 
         style="background: rgba(86, 148, 255, 0.2);"></div>
  </div>
  <div class="max-w-7xl mx-auto px-8 relative z-10 text-center">
    <h1 class="text-6xl font-extrabold text-white mb-6" 
        style="font-family: 'Manrope'; letter-spacing: -1.5px;">
      {{ pageTitle }}
    </h1>
    <p class="text-xl leading-relaxed" 
       style="font-family: 'Inter'; font-weight: 500; color: #ADC7FF;">
      {{ pageSubtitle }}
    </p>
  </div>
</section>
```

**Pages needing update**:
- Services page: Redesign hero section

### Change 3: Services Page Redesign

**Replace Bootstrap cards with Material Design cards**:
```html
<div class="rounded-xl overflow-hidden bg-white transition-all hover:shadow-lg border border-gray-100">
  <!-- Card content -->
</div>
```

### Change 4: Standardize Section Backgrounds

**Pattern**:
- Hero: Dark gradient (`#00183D`)
- Section 1: White (`bg-white`)
- Section 2: Light gray (`bg-gray-50` or `bg-surface`)
- Section 3: White (`bg-white`)
- Alternating pattern

---

## Implementation Plan

### Phase 1: Quick Fixes (15 minutes)

**1. About Page - Fix padding**
```html
<!-- Change from -->
<main class="pt-24">

<!-- To -->
<main style="padding-top: 5rem;">
```

**2. Services Page - Add padding**
```html
<!-- Add to top of services.html -->
<main style="padding-top: 5rem;">
  <!-- existing content -->
</main>
```

### Phase 2: Services Page Redesign (30 minutes)

**1. Update Hero Section**
- Use standard dark gradient hero
- Match typography with other pages

**2. Update Formation Cards**
- Replace Bootstrap cards with Material Design
- Use consistent spacing and shadows

**3. Update Forms**
- Standardize input styling
- Match button styles with other pages

### Phase 3: Fine-tuning (15 minutes)

**1. Typography audit**
- Ensure all h1 use `text-6xl`
- Ensure all h2 use `text-5xl`

**2. Color audit**
- Replace any custom colors with design tokens

**3. Spacing audit**
- Ensure consistent padding/margins

---

## Before & After Examples

### About Page

**BEFORE**:
```html
<main class="pt-24">
```

**AFTER**:
```html
<main style="padding-top: 5rem;">
```

### Services Page Hero

**BEFORE**:
```html
<section class="services-hero">
  <div class="container">
    <h1 class="services-hero-title">Nos Formations</h1>
  </div>
</section>
```

**AFTER**:
```html
<section class="relative py-32 overflow-hidden" 
         style="background: linear-gradient(135deg, #00183D 0%, #002C64 100%);">
  <div class="max-w-7xl mx-auto px-8 relative z-10 text-center">
    <h1 class="text-6xl font-extrabold text-white mb-6" 
        style="font-family: 'Manrope'; letter-spacing: -1.5px;">
      Nos Formations
    </h1>
    <p class="text-xl leading-relaxed" 
       style="font-family: 'Inter'; font-weight: 500; color: #ADC7FF;">
      Développez vos compétences avec nos formations professionnelles certifiantes
    </p>
  </div>
</section>
```

---

## Testing Checklist

After implementing changes, verify:

- [ ] All pages have `padding-top: 5rem` on `<main>`
- [ ] All hero sections use dark gradient background
- [ ] All h1 titles are `text-6xl font-extrabold`
- [ ] All subtitles are `text-xl`
- [ ] Color scheme consistent across pages
- [ ] Spacing (py-20, px-8, gap-8) consistent
- [ ] Card styles match across pages
- [ ] Button styles consistent
- [ ] No Bootstrap classes in Material Design pages
- [ ] Typography fonts consistent (Manrope headlines, Inter body)

---

## Summary

**Issues Found**: 5 major inconsistencies  
**Pages Affected**: 3 (About, Services, and minor tweaks to others)  
**Time to Fix**: ~60 minutes  
**Priority**: High (affects user experience)

**Next Steps**:
1. Fix About page padding (2 minutes)
2. Redesign Services page (30 minutes)
3. Audit all pages (15 minutes)
4. Test on all breakpoints (15 minutes)

---

**Document Created**: July 8, 2026  
**Status**: Ready for implementation
