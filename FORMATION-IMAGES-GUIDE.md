# Formation Images Setup Guide

## 📸 Images to Add

Please save the following formation training images to the specified locations:

### Directory Structure
```
mssd-frontend/
└── src/
    └── assets/
        └── img/
            └── formations/
                ├── formation-1.jpg  (Instructor presenting in blue room)
                ├── formation-2.jpg  (Group photo with certificates - Jan 26, 2025)
                ├── formation-3.jpg  (MSSD training room with welcome banner)
                ├── formation-4.jpg  (Small group training session)
                ├── formation-5.jpg  (Conference room training)
                ├── formation-6.jpg  (Training with city view)
                ├── formation-7.jpg  (Large group with MSSD branding)
                ├── formation-8.jpg  (Hotel conference room training)
                └── formation-9.jpg  (Synchronization training presentation)
```

### Image Descriptions

1. **formation-1.jpg**: Professional instructor presenting to engaged participants in modern training room with blue accent wall
2. **formation-2.jpg**: Successful graduates holding MSSD certificates - Rose Blanche Group - January 26, 2025
3. **formation-3.jpg**: MSSD training room with "Vous êtes les Bienvenus" welcome banner
4. **formation-4.jpg**: Interactive small group session with natural lighting
5. **formation-5.jpg**: Executive training in upscale conference room
6. **formation-6.jpg**: Corporate training with panoramic city views
7. **formation-7.jpg**: Team photo with MSSD branding wall
8. **formation-8.jpg**: Professional hotel conference room setup
9. **formation-9.jpg**: "La synchronisation" presentation training session

### Steps to Add Images

1. Create the formations directory:
```bash
mkdir -p mssd-frontend/src/assets/img/formations
```

2. Save each image with the corresponding filename:
   - Image 1 → formation-1.jpg
   - Image 2 → formation-2.jpg
   - etc.

3. Ensure images are optimized for web:
   - Recommended size: 800x600px or 1200x900px
   - Format: JPG
   - Quality: 80-85%
   - File size: Under 500KB each

### Current Implementation

The home page already references these images in the Formation Gallery section:

```html
<img src="assets/img/formations/formation-1.jpg" 
     alt="MSSD professional training session..." />
```

Once the images are added to the correct directory, they will automatically display on the homepage.

### Verification

After adding images, verify they load correctly:
1. Open browser developer tools (F12)
2. Check Network tab for any 404 errors
3. Ensure all 9 images load successfully

### Fallback Plan

If images cannot be added immediately, you can use placeholder images temporarily:
- Use existing assets from `assets/img/`
- Or use external URLs (though not recommended for production)
