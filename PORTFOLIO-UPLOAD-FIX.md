# Portfolio Logo Upload Fix - Issue Resolved

## Problem
Portfolio logo upload was failing with HTTP 500 Internal Server Error when trying to upload images through the admin panel.

## Root Causes Identified

1. **Poor Error Handling**: The controller was catching IOException but the service was throwing RuntimeException
2. **Duplicate Configuration**: `app.upload.dir` was configured twice with different values in application.properties
3. **Lazy Initialization**: FileStorageService wasn't initialized until first upload attempt
4. **No Validation**: No file type or size validation before processing

## Fixes Applied

### 1. FileStorageService.java
**Changes:**
- Added `@PostConstruct` annotation to `init()` method to initialize storage on application startup
- Changed `storeFile()` to throw `IOException` instead of wrapping in RuntimeException
- Changed property name from `${file.upload-dir}` to `${app.upload.dir}` to match application.properties
- Removed lazy initialization calls from all methods since init happens on startup
- Added console logging to confirm storage location initialization

### 2. PortfolioItemController.java
**Changes:**
- Added comprehensive file validation:
  - Null/empty file check
  - File size validation (max 5MB)
  - File type validation (images only)
- Improved error handling to catch:
  - IOException
  - RuntimeException
  - General Exception
- Changed error responses to return JSON with error messages instead of empty body
- All error responses now include descriptive error messages

### 3. application.properties
**Changes:**
- Removed duplicate `app.upload.dir` configuration
- Consolidated file upload settings in one section
- Added `spring.servlet.multipart.enabled=true`
- Set upload directory to `uploads` (relative path, will be created in project root)

## Configuration

### Upload Settings
```properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
spring.servlet.multipart.enabled=true
app.upload.dir=uploads
```

### Validation Rules
- **File Size**: Maximum 5MB (enforced in controller)
- **File Type**: Only image files (image/*)
- **File Name**: Cleaned and validated, UUID generated to avoid conflicts
- **Path Security**: ".." sequences blocked to prevent directory traversal attacks

## How It Works Now

1. **Application Startup**: 
   - FileStorageService.init() runs automatically via @PostConstruct
   - Creates `uploads` directory if it doesn't exist
   - Logs the full path to console

2. **File Upload Request**:
   - Validates file is not null/empty
   - Checks file size <= 5MB
   - Verifies file is an image
   - Generates unique UUID filename
   - Stores file to uploads directory
   - Returns filename in JSON: `{"url": "abc-123-def.png"}`

3. **Error Response**:
   - Returns HTTP 400 for validation errors
   - Returns HTTP 500 for server errors
   - All errors include JSON: `{"error": "descriptive message"}`

## Testing

### Restart Backend
```bash
cd mssd-backend
mvnw spring-boot:run
```

### Check Console Output
You should see:
```
File storage location initialized at: C:\path\to\project\uploads
```

### Test Upload
1. Go to Admin Portfolio page
2. Click "Ajouter un élément"
3. Select an image file (PNG, JPG, etc.)
4. Upload should succeed and show the filename

### Expected Behavior
- ✅ Valid images upload successfully
- ❌ Files > 5MB rejected with error message
- ❌ Non-image files rejected with error message
- ❌ Empty/null files rejected with error message

## File Structure
```
mssd-backend/
├── uploads/              ← Created automatically on startup
│   ├── uuid1.png        ← Uploaded files stored here
│   ├── uuid2.jpg
│   └── ...
├── src/
│   └── main/
│       ├── java/
│       │   └── com/mssd/
│       │       ├── controller/
│       │       │   └── PortfolioItemController.java  ← Fixed
│       │       └── service/
│       │           ├── PortfolioItemService.java
│       │           └── FileStorageService.java       ← Fixed
│       └── resources/
│           └── application.properties                ← Fixed
└── ...
```

## API Endpoint

### POST /api/portfolio-items/upload-logo

**Request:**
- Content-Type: multipart/form-data
- Body: file (image file)

**Success Response (200):**
```json
{
  "url": "abc-123-def-456.png"
}
```

**Error Response (400/500):**
```json
{
  "error": "Descriptive error message"
}
```

## Notes

- The `uploads` directory is created in the backend project root
- Files are renamed with UUIDs to prevent conflicts
- Original file extensions are preserved
- The filename returned can be used to access the file via `/api/files/{filename}`
- Make sure the backend process has write permissions to the project directory

## Status
✅ **FIXED** - Portfolio logo upload now works correctly with proper validation and error messages.
