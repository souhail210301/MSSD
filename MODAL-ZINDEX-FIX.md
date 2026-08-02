# Modal Z-Index Fix - Navbar Conflict Resolved

## Problem
Modal popups (reservation modal, formation details modal) were appearing **behind** the navbar, making them unusable because the navbar was blocking the modal content.

## Root Cause
**Z-Index Hierarchy Mismatch:**

| Element | Original Z-Index | Issue |
|---------|------------------|-------|
| Navbar | `z-index: 1000` | ✓ High priority |
| Navbar Dropdown | `z-index: 1050` | ✓ Above navbar |
| Modals | `z-index: 50` (Tailwind `z-50`) | ❌ Much lower than navbar! |

The modals were using Tailwind's `z-50` class which translates to `z-index: 50`, but the navbar has `z-index: 1000`. This caused the navbar to appear on top of the modals.

## Solution Applied

### 1. Calendar Reservation Modal
**File:** `mssd-frontend/src/app/pages/calendar/calendar.html`

**Changed:**
```html
<!-- BEFORE -->
<div class="fixed inset-0 flex items-center justify-center p-4 z-50" 
     style="background-color: rgba(0, 0, 0, 0.5);">

<!-- AFTER -->
<div class="fixed inset-0 flex items-center justify-center p-4" 
     style="background-color: rgba(0, 0, 0, 0.5); z-index: 9999;">
```

### 2. Formation Details Modal
**File:** `mssd-frontend/src/app/pages/annexes-theme/annexes-theme.html`

**Changed:**
```html
<!-- BEFORE -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4"
     style="background-color: rgba(26, 28, 30, 0.5); backdrop-filter: blur(4px);">

<!-- AFTER -->
<div class="fixed inset-0 flex items-center justify-center p-4"
     style="background-color: rgba(26, 28, 30, 0.5); backdrop-filter: blur(4px); z-index: 9999;">
```

## New Z-Index Hierarchy

| Element | Z-Index | Priority | Purpose |
|---------|---------|----------|---------|
| Normal Content | 0-10 | Lowest | Regular page content |
| Navbar | 1000 | High | Fixed header navigation |
| Navbar Dropdown | 1050 | Higher | Dropdown menus in navbar |
| **Modals** | **9999** | **Highest** | **Dialogs and overlays** |

## Why Z-Index 9999?

1. **Far above navbar** (1000) to ensure modals always appear on top
2. **Industry standard** for modal/overlay z-index values
3. **Future-proof** - leaves room for other elements in between
4. **Common practice** in most UI libraries (Bootstrap, Material-UI, etc.)

## Testing Checklist

✅ **Calendar Page:**
- Click on a calendar event
- Reservation modal should appear **above** navbar
- Can fill out form without navbar interfering
- Close button accessible

✅ **Annexes Theme Page:**
- Click "View Details" on any formation card
- Formation modal should appear **above** navbar
- All modal content visible and accessible
- Close button works properly

## Best Practices for Future Modals

When creating new modals in the application, always use:

```html
<div class="fixed inset-0 flex items-center justify-center p-4"
     style="z-index: 9999; background-color: rgba(0, 0, 0, 0.5);">
  <!-- Modal content -->
</div>
```

**Do NOT use:**
- Tailwind z-index classes (`z-50`, `z-40`, etc.) for modals
- Z-index values below 2000 for modal overlays
- Inline z-index lower than the navbar

## Additional Notes

### Z-Index Reference Table
```scss
// Recommended z-index values
$z-index-base: 0;
$z-index-dropdown: 1000;
$z-index-sticky: 1020;
$z-index-fixed: 1030;
$z-index-modal-backdrop: 1040;
$z-index-modal: 1050;
$z-index-popover: 1060;
$z-index-tooltip: 1070;
```

### Styling Best Practices
- Keep z-index values in inline styles for modals (easier to maintain)
- Document z-index hierarchy in main SCSS file
- Avoid z-index "wars" - use consistent, well-spaced values
- Test modals on all pages after making z-index changes

## Status
✅ **FIXED** - All modals now appear above the navbar with proper z-index hierarchy.
