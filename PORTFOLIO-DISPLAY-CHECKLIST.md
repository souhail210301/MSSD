# Portfolio Display Checklist

## Current Status
Portfolio items added in the admin should be visible on the frontend portfolio page at `/portfolio`.

## System Overview

### Backend
- **Entity**: `PortfolioItem` with `active` field (default: `true`)
- **Endpoint**: `/api/portfolio` returns active items ordered by date
- **Logo Storage**: Logos uploaded to `uploads/` directory, filename saved to database
- **Logo Serving**: Files served at `/api/files/{filename}`

### Frontend
- **Service**: `PortfolioService.getActivePortfolios()` fetches active items
- **Image URL**: `getImageUrl()` method properly constructs `/api/files/{filename}`
- **Display Logic**: Shows uploaded logo if `logoUrl` exists, otherwise shows placeholder

## Checklist to Verify Portfolio Display

### 1. Check if Portfolio Items are Active
Run this SQL query to check:
```sql
SELECT id, company_name, training_title, training_date, logo_url, active 
FROM portfolio_items 
ORDER BY training_date DESC;
```

**Expected**: All items should have `active = 1` (true)

### 2. Check Logo URLs in Database
The `logo_url` field should contain **just the filename**, not a full path:
- ✅ Correct: `620476e4-5900-49e4-a84a-c005c1859fc4.png`
- ❌ Wrong: `/api/files/620476e4-5900-49e4-a84a-c005c1859fc4.png`
- ❌ Wrong: `http://localhost:8080/api/files/620476e4-5900-49e4-a84a-c005c1859fc4.png`

If logo URLs have paths in them, run this SQL to fix:
```sql
UPDATE portfolio_items 
SET logo_url = REPLACE(REPLACE(logo_url, '/api/files/', ''), 'http://localhost:8080/api/files/', '')
WHERE logo_url LIKE '%/api/files/%';
```

### 3. Verify Files Exist in uploads Directory
Check that the logo files actually exist:
```
mssd-backend/uploads/{filename}.png
```

### 4. Check Browser Console
Open the frontend at `http://localhost:4200/portfolio` and check the browser console for:
- `✅ Portfolio Page: Received X portfolios` - confirms items were loaded
- Any 404 errors for `/api/files/...` - indicates missing files
- Any 500 errors - indicates backend errors

### 5. Check Backend Logs
When the portfolio page loads, you should see:
```
GET "/api/portfolio-items" - Should return 200 OK
GET "/api/files/{filename}.png" - Should return 200 OK for each logo
```

If you see 404 errors, the files don't exist in the uploads folder.

### 6. Verify Angular Proxy Configuration
Check `mssd-frontend/proxy.conf.json` to ensure `/api` requests are proxied to `http://localhost:8080`:
```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false
  }
}
```

## Common Issues and Solutions

### Issue 1: Portfolio items not showing at all
**Cause**: Items have `active = 0` in database
**Solution**: Run SQL to activate them:
```sql
UPDATE portfolio_items SET active = 1;
```

### Issue 2: Placeholder icons instead of logos
**Cause 1**: `logo_url` is NULL or empty
**Solution**: Re-upload logos in admin

**Cause 2**: Logo files missing from uploads directory
**Solution**: Re-upload logos in admin

**Cause 3**: Logo URL has wrong format (contains path)
**Solution**: Run SQL cleanup script above

### Issue 3: 404 errors for logo images
**Cause**: Files don't exist in `mssd-backend/uploads/` directory
**Solution**: 
1. Check if uploads directory exists
2. Check file permissions
3. Re-upload logos in admin

### Issue 4: Items added but don't appear immediately
**Cause**: Frontend cache or not refreshing
**Solution**: 
1. Hard refresh browser (Ctrl+F5)
2. Clear browser cache
3. Restart Angular dev server

## Quick Test
1. Go to admin: `http://localhost:4200/admin/portfolio`
2. Add a test portfolio item with a logo
3. Check console for: "Portfolio item created: {data}"
4. Go to: `http://localhost:4200/portfolio`
5. Item should appear with uploaded logo

## Current Implementation Details

### Portfolio Card Display Logic (portfolio.html)
```html
<!-- Show uploaded image if exists -->
<img *ngIf="portfolio.logoUrl" 
     [src]="getImageUrl(portfolio.logoUrl)" 
     [alt]="portfolio.companyName" 
     class="w-full h-full object-cover">

<!-- Show placeholder if no image -->
<div *ngIf="!portfolio.logoUrl" 
     class="w-full h-full flex items-center justify-center">
  <i class="bi bi-building-fill"></i>
</div>
```

### Image URL Construction (portfolio.ts)
```typescript
getImageUrl(imagePath: string | undefined): string {
  if (!imagePath || imagePath.trim() === '') {
    return 'assets/img/portfolio/app-1.jpg';
  }
  const url = this.portfolioService.getImageUrl(imagePath);
  return url;
}
```

### Backend Logo URL Serving
- Files are served by Spring's `ResourceHttpRequestHandler`
- Configured in `WebConfig.java`:
  ```java
  registry.addResourceHandler("/api/portfolio/files/**", "/api/files/**")
      .addResourceLocations("file:" + uploadDir + "/");
  ```
