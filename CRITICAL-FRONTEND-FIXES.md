# Critical Frontend-Backend API Fixes Required

## 🚨 URGENT: Application-Breaking Issues

These fixes are **REQUIRED** for the application to work properly. Without these changes, key features will fail.

---

## Issue #1: Portfolio Services URL Mismatch 🔴 CRITICAL

### Problem
Both `PortfolioService` and `PortfolioItemService` use `/api/portfolio-items/*` but the backend uses `/api/portfolio/*`

### Impact
- Portfolio CRUD operations will fail with 404 errors
- Cannot create, read, update, or delete portfolio items
- Admin portfolio management broken
- Public portfolio display broken

### Fix Required

**File 1**: `mssd-frontend/src/app/services/portfolio.service.ts`

Change line 12:
```typescript
// BEFORE:
private apiUrl = '/api/portfolio-items';

// AFTER:
private apiUrl = '/api/portfolio';
```

**File 2**: `mssd-frontend/src/app/services/portfolio-item.service.ts`

Change line 20:
```typescript
// BEFORE:
private apiUrl = '/api/portfolio-items';

// AFTER:
private apiUrl = '/api/portfolio';
```

**File 3**: `mssd-frontend/src/app/services/portfolio.service.ts`

Change line 13:
```typescript
// BEFORE:
private fileApiUrl = '/api/files';

// AFTER (if file endpoints exist):
private fileApiUrl = '/api/files';  // Keep as is, but check file upload endpoint
```

---

## Issue #2: File Upload Path Mismatch 🔴 CRITICAL

### Problem
Frontend expects `/api/files/upload` but backend has `/api/upload`

### Impact
- All file uploads will fail
- Cannot upload images for blogs, portfolios, etc.
- Upload functionality completely broken

### Fix Required

**File**: `mssd-frontend/src/app/services/file-upload.service.ts`

Change line 7:
```typescript
// BEFORE:
private uploadUrl = '/api/files/upload';

// AFTER:
private uploadUrl = '/api/upload';
```

---

## Issue #3: Portfolio Service Using Wrong Endpoints ⚠️ HIGH

### Problem
`PortfolioService.getAllPortfolios()` calls `/api/portfolio-items` but should call `/api/portfolio/admin` for admin view

### Impact
- Admin cannot see all portfolios (including inactive ones)
- Wrong data returned

### Fix Required

**File**: `mssd-frontend/src/app/services/portfolio.service.ts`

Change line 22-24:
```typescript
// BEFORE:
getAllPortfolios(): Observable<Portfolio[]> {
  return this.http.get<Portfolio[]>(this.apiUrl).pipe(

// AFTER:
getAllPortfolios(): Observable<Portfolio[]> {
  return this.http.get<Portfolio[]>(`${this.apiUrl}/admin`).pipe(
```

---

## Verification Steps

After applying these fixes:

1. **Restart Frontend**
   ```bash
   cd mssd-frontend
   npm start
   # or
   ng serve
   ```

2. **Test Portfolio Operations**
   - Navigate to admin portfolio page
   - Try creating a new portfolio item
   - Try editing an existing portfolio item
   - Verify public portfolio page loads

3. **Test File Upload**
   - Try uploading an image
   - Check browser console for any errors
   - Verify file appears in upload directory

4. **Check Browser Console**
   ```
   F12 → Console
   Look for:
   - ✅ No 404 errors on /api/portfolio-items
   - ✅ No 404 errors on /api/files/upload
   - ✅ Successful API responses
   ```

---

## Quick Fix Script (PowerShell)

Copy and run this to fix all three issues automatically:

```powershell
# Navigate to frontend directory
cd mssd-frontend\src\app\services

# Fix #1: portfolio.service.ts
(Get-Content portfolio.service.ts) -replace "private apiUrl = '/api/portfolio-items';", "private apiUrl = '/api/portfolio';" | Set-Content portfolio.service.ts

# Fix #2: portfolio-item.service.ts  
(Get-Content portfolio-item.service.ts) -replace "private apiUrl = '/api/portfolio-items';", "private apiUrl = '/api/portfolio';" | Set-Content portfolio-item.service.ts

# Fix #3: file-upload.service.ts
(Get-Content file-upload.service.ts) -replace "private uploadUrl = '/api/files/upload';", "private uploadUrl = '/api/upload';" | Set-Content file-upload.service.ts

# Fix #4: Update getAllPortfolios method
(Get-Content portfolio.service.ts) -replace "return this\.http\.get<Portfolio\[\]>\(this\.apiUrl\)\.pipe\(", "return this.http.get<Portfolio[]>(`\${this.apiUrl}/admin`).pipe(" | Set-Content portfolio.service.ts

Write-Host "✅ All critical fixes applied!" -ForegroundColor Green
Write-Host "⚠️ Please restart your frontend server!" -ForegroundColor Yellow
```

---

## Expected Results After Fixes

### Portfolio Service
- ✅ GET `/api/portfolio` → Returns active portfolios
- ✅ GET `/api/portfolio/admin` → Returns all portfolios
- ✅ GET `/api/portfolio/{id}` → Returns specific portfolio
- ✅ POST `/api/portfolio` → Creates new portfolio
- ✅ PUT `/api/portfolio/{id}` → Updates portfolio
- ✅ DELETE `/api/portfolio/{id}` → Deletes portfolio

### File Upload
- ✅ POST `/api/upload` → Uploads file successfully
- ✅ Returns filename and URL

---

## Additional Recommendations

### 1. Update Environment Configuration

**File**: `mssd-frontend/src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: '/api',  // Ensure this is set correctly
};
```

### 2. Add Error Handling

In all services, ensure proper error handling:

```typescript
.pipe(
  catchError(error => {
    console.error('API Error:', error);
    if (error.status === 404) {
      console.error('Endpoint not found. Check API URL.');
    }
    return throwError(() => error);
  })
);
```

### 3. Test Coverage

After fixes, test these scenarios:
- [ ] Create new portfolio item
- [ ] Upload image for portfolio
- [ ] View all portfolios (public)
- [ ] View all portfolios (admin)
- [ ] Edit existing portfolio
- [ ] Delete portfolio
- [ ] Upload blog image
- [ ] Upload formation image

---

## Summary

| Issue | Severity | Files to Change | Lines |
|-------|----------|----------------|-------|
| Portfolio URL | 🔴 CRITICAL | 2 files | 2 lines |
| File Upload URL | 🔴 CRITICAL | 1 file | 1 line |
| Admin Portfolio Endpoint | ⚠️ HIGH | 1 file | 1 line |
| **TOTAL** | - | **3 files** | **4 lines** |

**Estimated Fix Time**: 2 minutes  
**Testing Time**: 5 minutes  
**Total Time to Resolution**: ~10 minutes

---

**Next Steps**:
1. Apply the fixes above
2. Restart frontend server
3. Test portfolio and upload functionality
4. Check browser console for any remaining errors
5. Review `FRONTEND-BACKEND-API-MAPPING.md` for other potential issues

