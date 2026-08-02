# Coaching Page - Implementation Guide

## Overview
A new professional coaching page has been created following the MSSD Strategic Growth System design guidelines.

## Files Created

### 1. Component Files
- `mssd-frontend/src/app/pages/coaching/coaching.ts` - TypeScript component
- `mssd-frontend/src/app/pages/coaching/coaching.html` - HTML template
- `mssd-frontend/src/app/pages/coaching/coaching.scss` - Styles

### 2. Routes Updated
- Added coaching route in `app.routes.ts`: `/coaching`
- Imported `CoachingComponent`

### 3. Navigation Updated
- Added "Coaching" link to desktop navbar
- Added "Coaching" link to mobile menu
- Position: After "About", before "Annexes"

### 4. Translations Added
Both French and English translations for:
- Hero section (badge, title, subtitle, CTAs)
- Services section (3 services with benefits)
- Process section (4 steps)
- CTA section
- Navigation link

## Design System Compliance

### Colors Used
- **Primary Blue (#0067b1)**: Main brand color for buttons, icons, accents
- **Secondary Red (#e30613)**: Primary CTA buttons
- **Background (#f9f9fc)**: Main background
- **Surface (#ffffff)**: Card backgrounds
- **Text (#1a1c1e)**: Primary text
- **Secondary Text (#414751)**: Body copy

### Typography
- **Hanken Grotesk** font family throughout
- Headline XL (48px) for hero title
- Headline MD (24px) for service titles
- Body LG (18px) for hero subtitle
- Body MD (16px) for descriptions

### Layout
- 12-column grid system
- Max-width container: 1280px
- Consistent spacing multiples of 8px
- Responsive grid (3 columns → 2 → 1)

### Components
- Service cards with hover effects
- Numbered process steps with circle badges
- Gradient hero section with decorative background
- Icon circles (48px) for service cards
- Benefit lists with checkmark icons

## Page Structure

### 1. Hero Section
- Gradient blue background (#0067b1 to #004f89)
- Two-column layout (content + image)
- Badge label
- Main title
- Subtitle
- Two CTA buttons (primary red, secondary outlined)
- Decorative blur elements

### 2. Services Section
- White background
- Section header with label, title, subtitle
- 3-column grid of service cards:
  - **Individual Coaching**: For executives
  - **Team Coaching**: For groups
  - **Organizational Coaching**: For companies
- Each card includes:
  - Icon circle
  - Title
  - Description
  - 3 bullet points with benefits

### 3. Process Section
- Light blue background (#f2f7fa)
- Section header
- 4-column grid of process steps:
  1. Diagnosis
  2. Action Plan
  3. Support
  4. Evaluation
- Numbered circle badges (64px)

### 4. CTA Section
- Dark blue gradient background
- Centered content
- Title and subtitle
- Two buttons (book consultation, view availability)

## Image Requirements

### Hero Image
- **Path**: `assets/img/coaching-hero.jpg`
- **Recommended size**: 800x600px minimum
- **Content**: Professional business coaching scene (e.g., mentor with client, office setting)
- **Style**: Professional, modern, corporate

### Image Fallback
If the image doesn't exist, you can:
1. Use a placeholder from `assets/img/`
2. Create a solid color div with an icon
3. Add a professional coaching image to `assets/img/`

## Translation Keys Added

### Navigation
- `nav.coaching` (FR: "Coaching", EN: "Coaching")

### Coaching Page (40+ keys)
All keys prefixed with `coaching.*`:
- `hero.*` - Hero section
- `services.*` - Services section header
- `service1.*`, `service2.*`, `service3.*` - Individual services
- `process.*` - Process section
- `step1.*` through `step4.*` - Process steps
- `cta.*` - Call to action section

## Testing Checklist

1. **Navigation**
   - [ ] "Coaching" link appears in desktop navbar
   - [ ] "Coaching" link appears in mobile menu
   - [ ] Link is positioned correctly (after About, before Annexes)
   - [ ] Active state works when on coaching page

2. **Page Display**
   - [ ] Hero section displays correctly
   - [ ] Hero image loads (or gracefully shows fallback)
   - [ ] Service cards display in 3-column grid (desktop)
   - [ ] Service cards responsive (2 cols tablet, 1 col mobile)
   - [ ] Process steps display in 4-column grid
   - [ ] CTA section buttons work

3. **Translation**
   - [ ] Page loads in French by default
   - [ ] Language toggle switches all text
   - [ ] No missing translation keys
   - [ ] Nav link translates

4. **Routing**
   - [ ] `/coaching` route works
   - [ ] Clicking nav link navigates correctly
   - [ ] Page scrolls to top on load

5. **Design System**
   - [ ] Colors match design system
   - [ ] Typography follows guidelines
   - [ ] Spacing is consistent (8px multiples)
   - [ ] Hover effects work on service cards
   - [ ] Buttons have proper styles

6. **Responsiveness**
   - [ ] Hero grid stacks on mobile
   - [ ] Service cards responsive (3→2→1)
   - [ ] Process steps responsive (4→2→1)
   - [ ] CTA buttons stack on mobile
   - [ ] Text sizes adjust for mobile

## URLs

- **Development**: `http://localhost:4200/coaching`
- **Component Path**: `src/app/pages/coaching/`
- **Route**: `/coaching`

## Next Steps

1. Add hero image to `assets/img/coaching-hero.jpg`
2. Test navigation integration
3. Verify translations work
4. Test responsive behavior
5. Consider adding:
   - Testimonials section
   - Pricing information
   - FAQ section
   - Coach profiles

## Related Pages

- **Contact** (`/contact`) - Where coaching leads go
- **Calendar** (`/calendar`) - For booking coaching sessions
- **About** (`/about`) - Learn about coaches and company

---

**Created**: August 2, 2026
**Design System**: MSSD Strategic Growth System
**Status**: Ready for testing
