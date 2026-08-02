# Social Media Links Updated ✅

## Changes Made

### 1. Footer (app.component.html) ✅
Updated the main footer social media links:
- **LinkedIn**: https://www.linkedin.com/company/mssd/posts/?feedView=all
- **Facebook**: https://www.facebook.com/MSSD2016FormationConsulting (replaced Twitter)
- Added `target="_blank"` and `rel="noopener noreferrer"` for security
- Added proper titles for accessibility

### 2. Contact Page ✅
Updated contact page social links and phone number:
- **Phone**: Changed from +33 1 44 67 90 00 to **+216 29 557 078**
- **LinkedIn**: https://www.linkedin.com/company/mssd/posts/?feedView=all
- **Facebook**: https://www.facebook.com/MSSD2016FormationConsulting (replaced Twitter/X)
- **YouTube**: https://www.youtube.com/@MSSD-Training (kept existing)
- Added proper titles and attributes

### 3. Blog Detail Page ✅
Updated social sharing buttons:
- Removed Twitter/X share button
- Kept **LinkedIn** share button
- Kept **Facebook** share button
- Reordered: LinkedIn first, then Facebook

## Icons Changed

### Twitter → Facebook
Changed from Twitter icon:
```html
<i class="bi bi-twitter-x"></i>
```

To Facebook icon:
```html
<i class="bi bi-facebook"></i>
```

## Social Media URLs

### LinkedIn
- **Company Page**: https://www.linkedin.com/company/mssd/posts/?feedView=all
- Icon: `bi-linkedin`

### Facebook  
- **Page**: https://www.facebook.com/MSSD2016FormationConsulting
- Icon: `bi-facebook`

### YouTube (on contact page only)
- **Channel**: https://www.youtube.com/@MSSD-Training
- Icon: `bi-youtube`

## Phone Number
- **Old**: +33 1 44 67 90 00 (France)
- **New**: +216 29 557 078 (Tunisia)

## Files Updated

1. `mssd-frontend/src/app/app.component.html` - Footer
2. `mssd-frontend/src/app/pages/contact/contact.html` - Contact page
3. `mssd-frontend/src/app/pages/blog-detail/blog-detail.html` - Blog sharing

## Security & Best Practices

All external links now include:
- `target="_blank"` - Opens in new tab
- `rel="noopener noreferrer"` - Security best practice
- `title` attributes - Accessibility for screen readers

## Testing

Visit these pages to verify:
1. **Footer** (any page) - LinkedIn and Facebook icons
2. **Contact page** (/contact) - Phone number and 3 social icons
3. **Blog detail page** (/blog/:id) - LinkedIn and Facebook share buttons

All links should:
✅ Open in new tabs
✅ Link to correct social media profiles
✅ Show correct icons
✅ Have hover effects

---

*All social media links are now correctly configured with the MSSD official profiles!*
