# Theme Icon Upload Feature - URL to File Upload Conversion

## Overview
Converted the theme creation/editing form from entering a URL for the icon to uploading an actual image file.

## Changes Made

### 1. Frontend Service (`theme.service.ts`)
**Added Method:**
```typescript
uploadThemeIcon(file: File): Observable<{url: string}> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<{url: string}>(`${this.apiUrl}/themes/upload-icon`, formData);
}
```

### 2. Frontend Component (`admin-themes.ts`)
**Added Properties:**
```typescript
selectedFile: File | null = null;
uploadingIcon = false;
iconPreview: string | null = null;
```

**Added Methods:**
- `onFileSelected(event: Event)` - Handles file selection with validation
  - Validates file type (must be image)
  - Validates file size (max 2MB)
  - Creates preview using FileReader
- `removeIcon()` - Removes selected file and preview
- `saveTheme()` - Private method to handle theme creation/update after upload
- Modified `onSubmit()` - Now uploads file first if selected, then saves theme

**Validation:**
- ✅ File type: Only image files (image/*)
- ✅ File size: Maximum 2MB
- ✅ Creates image preview before upload
- ✅ Shows upload progress indicator

### 3. Frontend HTML (`admin-themes.html`)
**Before:**
```html
<div class="form-group form-full">
  <label>URL de l'icône</label>
  <input type="url" formControlName="iconUrl" placeholder="https://example.com/icon.png">
  <span class="form-hint">URL vers une image d'icône pour ce thème</span>
</div>
```

**After:**
```html
<div class="form-group form-full">
  <label>Icône du thème</label>
  <div class="file-upload-container">
    <!-- Hidden file input -->
    <input type="file" #fileInput accept="image/*" (change)="onFileSelected($event)" style="display: none;">
    
    <!-- Empty state - Click to upload -->
    <div *ngIf="!iconPreview" class="file-upload-empty" (click)="fileInput.click()">
      <i class="bi bi-cloud-upload"></i>
      <span>Cliquez pour télécharger une icône</span>
      <small>JPG, PNG, SVG (Max: 2MB)</small>
    </div>
    
    <!-- Preview with actions -->
    <div *ngIf="iconPreview" class="file-upload-preview">
      <img [src]="iconPreview" alt="Preview">
      <div class="file-upload-actions">
        <button type="button" class="btn-sm btn-secondary" (click)="fileInput.click()">
          <i class="bi bi-pencil"></i> Changer
        </button>
        <button type="button" class="btn-sm btn-danger" (click)="removeIcon()">
          <i class="bi bi-trash3"></i> Supprimer
        </button>
      </div>
    </div>
  </div>
  <span class="form-hint">Image d'icône pour représenter ce thème (optionnel)</span>
</div>
```

**Submit Button Update:**
- Shows loading state while uploading
- Disabled during upload
- Shows spinner with "Téléchargement..." text

### 4. Frontend Styles (`admin-themes.scss`)
**Added Styles:**

```scss
// File Upload Container
.file-upload-container { margin-top: 0.5rem; }

// Empty State (Drop Zone)
.file-upload-empty {
  display: flex; flex-direction: column; align-items: center;
  padding: 2rem 1rem; border: 2px dashed $admin-border;
  background: $admin-body-bg; cursor: pointer;
  
  &:hover {
    border-color: $admin-primary;
    background: $admin-primary-light;
  }
}

// Preview with Image
.file-upload-preview {
  display: flex; flex-direction: column; align-items: center;
  padding: 1rem; border: 1px solid $admin-border;
  
  img {
    max-width: 200px; max-height: 150px;
    object-fit: contain; border-radius: 4px;
  }
}

// Action Buttons
.btn-sm {
  padding: 0.4rem 0.8rem; font-size: 0.8rem;
  border-radius: 6px; cursor: pointer;
}

// Upload Spinner
.spinner-sm {
  width: 14px; height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
```

### 5. Backend Controller (`ThemeController.java`)
**Added Imports:**
```java
import com.mssd.service.FileStorageService;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
```

**Added Dependency:**
```java
private final FileStorageService fileStorageService;
```

**Added Endpoint:**
```java
@PostMapping("/upload-icon")
public ResponseEntity<Map<String, String>> uploadIcon(@RequestParam("file") MultipartFile file) {
    // Validates file (not null, not empty)
    // Validates file size (max 2MB)
    // Validates file type (must be image/*)
    // Stores file using FileStorageService
    // Returns filename: {"url": "abc-123.png"}
}
```

**Validation:**
- ✅ Null/empty check
- ✅ File size: Maximum 2MB
- ✅ File type: Only image/* MIME types
- ✅ Error handling with descriptive messages

## API Endpoint

### POST `/api/themes/upload-icon`

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (image file)

**Success Response (200):**
```json
{
  "url": "abc-123-def-456.png"
}
```

**Error Response (400):**
```json
{
  "error": "File size must not exceed 2MB"
}
```

**Error Response (500):**
```json
{
  "error": "Failed to upload file: [error message]"
}
```

## User Flow

### Creating a New Theme
1. Click "Nouveau thème"
2. Fill in theme name (slug auto-generated)
3. Add description
4. **Click upload area** to select icon image
5. **Preview appears** with "Changer" and "Supprimer" buttons
6. Click "Créer"
7. **File uploads first** (shows "Téléchargement..." spinner)
8. **Theme created** with uploaded icon filename
9. Success message shows, modal closes

### Editing Existing Theme
1. Click edit icon on theme row
2. **Existing icon shows in preview** (if theme has icon)
3. Can click "Changer" to select new file
4. Can click "Supprimer" to remove icon
5. Click "Modifier"
6. If new file selected, uploads first then updates theme
7. If no new file, just updates theme data

## File Storage

**Location:** `uploads/` directory (created automatically on startup)

**Naming:** UUID-based filename with original extension
- Example: `a1b2c3d4-e5f6-7890-abcd-ef1234567890.png`
- Prevents filename conflicts
- Preserves file extension

**Access:** Files accessible via `/api/files/{filename}` endpoint

## Validation Rules

### Frontend Validation
- **File Type:** Only image files allowed (checked by `accept="image/*"` and JS validation)
- **File Size:** Maximum 2MB (checked in `onFileSelected()`)
- **Immediate Feedback:** Error message shown instantly if validation fails

### Backend Validation
- **File Presence:** Must not be null or empty
- **File Size:** Maximum 2MB (2,097,152 bytes)
- **MIME Type:** Must start with "image/"
- **Security:** Prevents directory traversal with ".." in filename

## Benefits

### Before (URL Input)
❌ Users had to host images elsewhere first
❌ External URLs could break or become unavailable
❌ No validation of image validity
❌ Extra step in workflow

### After (File Upload)
✅ Direct upload from local machine
✅ Files stored reliably on server
✅ Automatic validation (type & size)
✅ Image preview before submission
✅ Streamlined single-step process

## Testing Checklist

### Create Theme with Icon
- [ ] Click upload area, select valid image
- [ ] Preview appears correctly
- [ ] Click "Créer", upload succeeds
- [ ] Theme created with icon visible in table
- [ ] Icon displays on public annexes page

### Create Theme without Icon
- [ ] Don't select any file
- [ ] Click "Créer", theme created successfully
- [ ] Placeholder icon shown in table

### Edit Theme - Add Icon
- [ ] Edit theme that has no icon
- [ ] Upload new icon
- [ ] Theme updated with icon

### Edit Theme - Change Icon
- [ ] Edit theme that has icon
- [ ] Click "Changer", select different image
- [ ] Old icon replaced with new one

### Edit Theme - Remove Icon
- [ ] Edit theme that has icon
- [ ] Click "Supprimer"
- [ ] Save changes, icon removed

### Validation Tests
- [ ] Try uploading non-image file → Error message
- [ ] Try uploading file > 2MB → Error message
- [ ] Try submitting form while upload in progress → Button disabled

## File Types Supported

✅ **Supported:**
- PNG (.png)
- JPEG (.jpg, .jpeg)
- GIF (.gif)
- SVG (.svg)
- WebP (.webp)
- BMP (.bmp)
- ICO (.ico)

❌ **Not Supported:**
- PDF, Word, Excel documents
- Video files
- Audio files
- Text files

## Status
✅ **COMPLETE** - Theme icon field converted from URL input to file upload with preview, validation, and backend storage.

## Next Steps (Optional Enhancements)

1. **Image Cropping:** Add image cropping tool before upload
2. **Drag & Drop:** Allow drag-and-drop in addition to click-to-upload
3. **Multiple Icons:** Support multiple icon sizes (thumbnail, full)
4. **Icon Library:** Pre-built icon picker with common icons
5. **Bulk Upload:** Upload multiple theme icons at once
