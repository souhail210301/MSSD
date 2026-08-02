# Translation Button Layout Reference

## Visual Layout

```
┌─────────────────────────────────────────────────────────┐
│  Navbar (AppFlexstartLayout)                            │
│  ┌────────┐  [Home] [About] [Portfolio]  [🌐 EN] [📅] │
│  │  Logo  │                                             │
│  └────────┘                                             │
└─────────────────────────────────────────────────────────┘
│                                                           │
│                                                           │
│                  Main Content Area                        │
│                  (router-outlet)                          │
│                                                           │
│                                                           │
│                                                           │
│  [🌐 FR]                                      [↑]        │ ← Floating Buttons
└─────────────────────────────────────────────────────────┘
   Bottom-Left                              Bottom-Right
   (Global Translator)                     (Scroll to Top)
```

## Button Positions

### 1. Navbar Translation Button (Existing)
**Location**: Top navigation bar (right side)
**Component**: `app.flexstart-layout.html`
**Visibility**: Public pages only (home, about, portfolio, blog, contact, annexes, calendar)
**Style**: Integrated into navbar design
**HTML**: 
```html
<button class="lang-toggle-btn" (click)="toggleLanguage()">
  <i class="bi bi-translate"></i> {{ currentLanguage === 'fr' ? 'EN' : 'FR' }}
</button>
```

### 2. Global Floating Translation Button (New)
**Location**: Bottom-left corner (fixed position)
**Component**: `app.component.html`
**Visibility**: ALL pages (public, admin, error pages)
**Style**: Floating pill-shaped button
**HTML**:
```html
<button class="global-lang-toggle" (click)="toggleLanguage()">
  <i class="bi bi-translate"></i>
  <span>{{ currentLanguage === 'fr' ? 'EN' : 'FR' }}</span>
</button>
```

### 3. Scroll to Top Button (Reference)
**Location**: Bottom-right corner (fixed position)
**Component**: `app.component.html`
**Visibility**: Public pages (when scrolled down)
**Style**: Circular button

## Responsive Behavior

### Desktop View (> 768px)
```
Global Translation Button:
- Position: bottom: 2rem, left: 2rem
- Padding: 0.75rem 1rem
- Font size: 0.9rem

Scroll to Top Button:
- Position: bottom: 2rem, right: 2rem
- Size: 50px × 50px
```

### Mobile View (≤ 768px)
```
Global Translation Button:
- Position: bottom: 1rem, left: 1rem
- Padding: 0.6rem 0.85rem
- Font size: 0.85rem

Scroll to Top Button:
- Position: bottom: 1rem, right: 1rem
- Size: 45px × 45px
```

## Page-Specific Visibility

### Public Pages (with AppFlexstartLayout)
- ✅ Navbar translation button (visible)
- ✅ Global floating translation button (visible)
- ✅ Both buttons work and are synchronized

### Admin Pages
- ❌ Navbar translation button (not visible - different layout)
- ✅ Global floating translation button (visible)

### Error Pages (404, 401, 500)
- ❌ Navbar translation button (not visible - different layout)
- ✅ Global floating translation button (visible)

## Z-Index Layering

```
Navigation Bar:         z-index: 1000
Global Translation:     z-index: 1000
Scroll to Top:         z-index: 1000
Main Content:          z-index: auto
Footer:                z-index: auto
```

All floating elements are at the same z-index (1000) to ensure they appear above content but are positioned at different corners to avoid overlap.

## CSS Classes

### Global Translation Button
```scss
.global-lang-toggle {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: $primary-color;
  color: $white;
  border: none;
  border-radius: 50px; // Pill shape
  box-shadow: $shadow-lg;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: $transition;
}
```

### Navbar Translation Button
```scss
.lang-toggle-btn {
  // Defined in app.flexstart-layout.scss
  // Styled to match navbar design
}
```

## Integration Points

### Components Using Translation
1. **AppComponent** - Global button, footer translations
2. **AppFlexstartLayout** - Navbar button, navigation translations
3. **All Page Components** - Content translations via `t()` method
4. **TranslationService** - Central service managing language state

### Translation Method Call
```typescript
// In any component with TranslationService injected:
t(key: string): string {
  return this.translationService.translate(key);
}

// In templates:
{{ t('nav.home') }}
{{ t('footer.copyright') }}
```

## User Experience Flow

1. **Initial Load**: 
   - Language loaded from localStorage (default: 'fr')
   - All components display content in saved language

2. **Language Switch**:
   - User clicks any translation button (navbar or floating)
   - `toggleLanguage()` method called
   - Language switched (fr ↔ en)
   - New language saved to localStorage
   - Observable emits new language
   - All subscribed components update automatically

3. **Page Navigation**:
   - Language persists across page changes
   - Both buttons (when visible) show same language state

4. **Browser Refresh**:
   - Language loaded from localStorage
   - User's preference maintained

## Design Considerations

### Why Two Buttons?
1. **Navbar Button**: 
   - Familiar location for navigation-related actions
   - Part of the main navigation UX
   - Visible on public pages where users browse content

2. **Global Button**:
   - Ensures accessibility on ALL pages
   - Consistent position across different layouts
   - Essential for admin and error pages without navbar
   - Provides redundancy for better UX

### Button Synchronization
Both buttons are perfectly synchronized because they:
- Use the same `TranslationService`
- Subscribe to the same `currentLanguage$` observable
- Call the same `toggleLanguage()` method
- Update the same localStorage key

No conflict exists - they work together seamlessly.
