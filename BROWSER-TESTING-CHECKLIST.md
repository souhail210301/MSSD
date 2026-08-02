# MSSD Application - Browser Testing Checklist
**Complete Manual Testing Guide**

---

## 🚀 Pre-Testing Setup

### 1. Start Backend Server
```bash
cd mssd-backend
mvn spring-boot:run
# OR
./start-backend.bat

# Verify: http://localhost:8080/api/health
# Expected: {"status":"UP","portfolioCount":1,"formationCount":8}
```

### 2. Start Frontend Server
```bash
cd mssd-frontend
npm start
# OR
ng serve

# Access: http://localhost:4200
```

### 3. Open Browser Developer Tools
- Press **F12** or right-click → Inspect
- Go to **Console** tab to monitor errors
- Go to **Network** tab to see API calls

---

## 📋 Testing Checklist

### 🏠 Homepage Tests

#### Page Load
- [ ] Homepage loads without errors
- [ ] No console errors in browser
- [ ] All images load properly
- [ ] Navigation menu displays correctly
- [ ] Hero section visible

#### Navigation
- [ ] Click "Formations" → Should navigate to formations page
- [ ] Click "Portfolio" → Should navigate to portfolio page
- [ ] Click "Blog" → Should navigate to blog page
- [ ] Click "Contact" → Should navigate to contact page
- [ ] Click "Annexes" → Should navigate to annexes page

#### Newsletter Subscription
- [ ] Enter email in newsletter form
- [ ] Click subscribe button
- [ ] **Expected**: Success message
- [ ] **Check Console**: POST /api/newsletter (Status 200)

---

### 📚 Formations/Services Page Tests

#### View Formations
- [ ] Navigate to formations/services page
- [ ] **Expected**: List of 8 formations displays
- [ ] **Check Console**: GET /api/formations (Status 200)
- [ ] Each formation shows:
  - [ ] Title
  - [ ] Description
  - [ ] Price
  - [ ] Duration
  - [ ] Level (Beginner/Intermediate/Expert)

#### Filter Formations
- [ ] Filter by category (if available)
- [ ] Filter by level
- [ ] Filter by theme
- [ ] **Check Console**: Appropriate API calls

#### View Formation Details
- [ ] Click on a formation card
- [ ] Should navigate to formation detail page
- [ ] **Expected**: Full formation information
- [ ] **Check Console**: GET /api/formations/{id} (Status 200)

---

### 🎨 Portfolio Page Tests

#### View Portfolio Items
- [ ] Navigate to portfolio page
- [ ] **Expected**: At least 1 portfolio item displays
- [ ] **Check Console**: GET /api/portfolio (Status 200)
- [ ] Each portfolio shows:
  - [ ] Company name
  - [ ] Training title
  - [ ] Date
  - [ ] Logo/image
  - [ ] Description

#### Portfolio Details
- [ ] Click on a portfolio item (if clickable)
- [ ] **Expected**: Detailed view opens
- [ ] **Check Console**: GET /api/portfolio/{id} (Status 200)

---

### 📝 Blog Page Tests

#### View Blog Posts
- [ ] Navigate to blog page
- [ ] **Expected**: List of blog posts
- [ ] **Check Console**: GET /api/blogs (Status 200)
- [ ] Each blog post shows:
  - [ ] Title
  - [ ] Description
  - [ ] Publish date
  - [ ] Image or YouTube thumbnail

#### View Blog Post Details
- [ ] Click on a blog post
- [ ] Should navigate to blog detail page
- [ ] **Expected**: Full blog content
- [ ] **Check Console**: GET /api/blogs/{id} (Status 200)
- [ ] If YouTube URL: Video player embeds correctly

---

### 📅 Calendar Page Tests

#### View Calendar Events
- [ ] Navigate to calendar/events page
- [ ] **Expected**: List of available events
- [ ] **Check Console**: GET /api/calendars/available (Status 200)
- [ ] Each event shows:
  - [ ] Title
  - [ ] Date and time
  - [ ] Location
  - [ ] Available spots

#### Make Reservation
- [ ] Click on an event
- [ ] Fill reservation form:
  - [ ] Name
  - [ ] Email
  - [ ] Phone
- [ ] Submit form
- [ ] **Expected**: Success message
- [ ] **Check Console**: POST /api/calendar-reservations (Status 200)

---

### 💼 Annexes/Themes Page Tests

#### View Themes
- [ ] Navigate to annexes page
- [ ] **Expected**: List of themes with formations
- [ ] **Check Console**: GET /api/themes/with-formations (Status 200)
- [ ] **IMPORTANT**: Check for circular reference error!
- [ ] Each theme shows:
  - [ ] Theme name
  - [ ] Description
  - [ ] List of formations under that theme

#### Submit Training Request
- [ ] Fill out annexes request form:
  - [ ] Full name
  - [ ] Email
  - [ ] Phone
  - [ ] Company
  - [ ] Modality (In-person/Remote/Hybrid)
  - [ ] Message
- [ ] Submit form
- [ ] **Expected**: Success message
- [ ] **Check Console**: POST /api/annex-requests (Status 200)

---

### 📞 Contact Page Tests

#### Submit Contact Form
- [ ] Navigate to contact page
- [ ] Fill out form:
  - [ ] Full name: "Test User"
  - [ ] Email: "test@example.com"
  - [ ] Phone: "+1234567890"
  - [ ] Subject: "Testing Contact Form"
  - [ ] Message: "This is a test message"
- [ ] Submit form
- [ ] **Expected**: Success message
- [ ] **Check Console**: POST /api/contact (Status 200)

#### Form Validation
- [ ] Try submitting empty form
- [ ] **Expected**: Validation errors
- [ ] Try invalid email format
- [ ] **Expected**: Email validation error

---

### 🔐 Admin Login Tests

#### Navigate to Admin
- [ ] Go to: http://localhost:4200/admin/login
- [ ] **Expected**: Login page displays

#### Login
- [ ] Enter credentials:
  - [ ] Email: `admin@mssd.com`
  - [ ] Password: `admin123`
- [ ] Click login
- [ ] **Expected**: Redirect to admin dashboard
- [ ] **Check Console**: POST /api/auth/login (Status 200)

---

### 👨‍💼 Admin Dashboard Tests

#### Dashboard Overview
- [ ] View dashboard statistics
- [ ] **Expected**: Charts and metrics display
- [ ] **Check Console**: Various GET requests for stats

#### Sidebar Navigation
- [ ] Check all menu items:
  - [ ] Dashboard
  - [ ] Formations
  - [ ] Portfolio
  - [ ] Blog
  - [ ] Themes
  - [ ] Calendar
  - [ ] Reservations
  - [ ] Reviews
  - [ ] Contacts
  - [ ] Annex Requests

---

### 📖 Admin - Formations Management

#### View Formations
- [ ] Navigate to Formations in admin
- [ ] **Expected**: Table of all formations
- [ ] **Check Console**: GET /api/formations (Status 200)

#### Create Formation
- [ ] Click "Add New Formation"
- [ ] Fill form:
  - [ ] Title: "Test Formation"
  - [ ] Slug: "test-formation"
  - [ ] Description: "Test description"
  - [ ] Category: "Development"
  - [ ] Price: 999.99
  - [ ] Duration: "3 days"
  - [ ] Level: "Intermediate"
  - [ ] Published: ✓
- [ ] Submit
- [ ] **Expected**: Success message
- [ ] **Check Console**: POST /api/formations (Status 201)

#### Edit Formation
- [ ] Click edit on a formation
- [ ] Modify some fields
- [ ] Save changes
- [ ] **Expected**: Success message
- [ ] **Check Console**: PUT /api/formations/{id} (Status 200)

#### Delete Formation
- [ ] Click delete on test formation
- [ ] Confirm deletion
- [ ] **Expected**: Formation removed from list
- [ ] **Check Console**: DELETE /api/formations/{id} (Status 204)

---

### 🎨 Admin - Portfolio Management

#### View Portfolio Items
- [ ] Navigate to Portfolio in admin
- [ ] **Expected**: Table of all portfolio items
- [ ] **Check Console**: GET /api/portfolio/admin (Status 200)

#### Create Portfolio Item
- [ ] Click "Add New Portfolio"
- [ ] Fill form:
  - [ ] Company Name: "Test Company"
  - [ ] Training Title: "Test Training"
  - [ ] Training Date: Select date
  - [ ] Description: "Test description"
  - [ ] Active: ✓
- [ ] Upload logo (optional)
- [ ] Submit
- [ ] **Expected**: Success message
- [ ] **Check Console**: 
  - POST /api/upload (Status 200) - if file uploaded
  - POST /api/portfolio (Status 201)

#### Edit Portfolio Item
- [ ] Click edit on a portfolio item
- [ ] Modify fields
- [ ] Save changes
- [ ] **Expected**: Success message
- [ ] **Check Console**: PUT /api/portfolio/{id} (Status 200)

#### Delete Portfolio Item
- [ ] Click delete
- [ ] Confirm deletion
- [ ] **Expected**: Item removed
- [ ] **Check Console**: DELETE /api/portfolio/{id} (Status 204)

---

### 📰 Admin - Blog Management

#### View Blogs
- [ ] Navigate to Blog in admin
- [ ] **Expected**: Table of all blogs
- [ ] **Check Console**: GET /api/blogs/admin (Status 200)

#### Create Blog Post
- [ ] Click "Add New Blog"
- [ ] Fill form:
  - [ ] Title: "Test Blog Post"
  - [ ] Description: "Test content"
  - [ ] YouTube URL: (optional)
  - [ ] Publish Date: Select date
  - [ ] Active: ✓
- [ ] Upload image (optional)
- [ ] Submit
- [ ] **Expected**: Success message
- [ ] **Check Console**: POST /api/blogs (Status 201)

#### Test Known Issues
- [ ] Try to edit blog post
- [ ] **Expected**: May fail (endpoint not implemented)
- [ ] **Check Console**: PUT /api/blogs/{id} (Status 404)
- [ ] Try to delete blog post
- [ ] **Expected**: May fail (endpoint not implemented)
- [ ] **Check Console**: DELETE /api/blogs/{id} (Status 404)

---

### 🎭 Admin - Themes Management

#### View Themes
- [ ] Navigate to Themes in admin
- [ ] **Expected**: List of all themes
- [ ] **Check Console**: GET /api/themes/admin (Status 200)

#### Create Theme
- [ ] Click "Add New Theme"
- [ ] Fill form:
  - [ ] Name: "Test Theme"
  - [ ] Slug: "test-theme"
  - [ ] Description: "Test description"
  - [ ] Active: ✓
- [ ] Submit
- [ ] **Expected**: Success message
- [ ] **Check Console**: POST /api/themes (Status 201)

#### Edit Theme
- [ ] Click edit on a theme
- [ ] Modify fields
- [ ] Save
- [ ] **Expected**: Success message
- [ ] **Check Console**: PUT /api/themes/{id} (Status 200)

#### Delete Theme
- [ ] Click delete (only if no formations)
- [ ] Confirm
- [ ] **Expected**: Theme removed or error if has formations
- [ ] **Check Console**: DELETE /api/themes/{id}

---

### 📅 Admin - Calendar Management

#### View Calendar Events
- [ ] Navigate to Calendar in admin
- [ ] **Expected**: List of all events
- [ ] **Check Console**: GET /api/calendars (Status 200)

#### Test Known Issues
- [ ] Try to create calendar event
- [ ] **Expected**: May fail (endpoint not implemented)
- [ ] **Check Console**: POST /api/calendars (Status 404)

---

### 🎫 Admin - Reservations Management

#### View Reservations
- [ ] Navigate to Reservations in admin
- [ ] **Expected**: List of all reservations
- [ ] **Check Console**: GET /api/calendar-reservations (Status 200)
- [ ] Each reservation shows:
  - [ ] Client name
  - [ ] Email
  - [ ] Event title
  - [ ] Date
  - [ ] Status

#### Update Reservation Status
- [ ] Try to change status
- [ ] **Expected**: May fail (endpoint not implemented)
- [ ] **Check Console**: PATCH /api/calendar-reservations/{id}/status

---

### ⭐ Admin - Reviews Management

#### View Reviews
- [ ] Navigate to Reviews in admin
- [ ] **Expected**: List of all reviews
- [ ] **Check Console**: GET /api/reviews/all (Status 200)

#### Delete Review
- [ ] Click delete on a review
- [ ] Confirm
- [ ] **Expected**: Review removed
- [ ] **Check Console**: DELETE /api/reviews/{id} (Status 204)

---

### 📧 Admin - Contacts Management

#### View Contact Messages
- [ ] Navigate to Contacts in admin
- [ ] **Expected**: List of all contact submissions
- [ ] **Check Console**: GET /api/contact (Status 200)
- [ ] Each message shows:
  - [ ] Name
  - [ ] Email
  - [ ] Subject
  - [ ] Message
  - [ ] Date

---

### 📋 Admin - Annex Requests Management

#### View Annex Requests
- [ ] Navigate to Annex Requests in admin
- [ ] **Expected**: List of all training requests
- [ ] **Check Console**: GET /api/annex-requests (Status 200)
- [ ] Each request shows:
  - [ ] Full name
  - [ ] Email
  - [ ] Phone
  - [ ] Company
  - [ ] Modality
  - [ ] Status

---

## 🐛 Error Checking

### Console Errors to Look For

#### ✅ Good Signs
```
✓ Status 200 OK
✓ Status 201 Created
✓ Status 204 No Content
✓ No CORS errors
✓ No 404 errors on expected endpoints
```

#### ❌ Bad Signs
```
✗ Status 404 Not Found (on expected endpoints)
✗ Status 500 Internal Server Error
✗ CORS policy errors
✗ Network errors
✗ Infinite recursion (StackOverflowError)
✗ Failed to load resource
```

### Network Tab Verification

For each action, check Network tab:
- [ ] Request URL is correct
- [ ] Request Method matches (GET/POST/PUT/DELETE)
- [ ] Response status is 2xx or 3xx
- [ ] Response payload contains expected data
- [ ] No excessive requests (check for loops)

---

## 📊 Test Results Template

### Issues Found

| Page/Feature | Issue Description | Console Error | Priority |
|--------------|-------------------|---------------|----------|
| Example: Portfolio | Cannot create portfolio | POST /api/portfolio 404 | HIGH |
| | | | |
| | | | |

### Working Features

| Page/Feature | Status | Notes |
|--------------|--------|-------|
| Homepage | ✅ Working | All elements load correctly |
| Contact Form | ✅ Working | Successfully submits |
| | | |

---

## 🎯 Success Criteria

### Minimum Viable Application
- [ ] Homepage loads without errors
- [ ] Users can view formations
- [ ] Users can view portfolio
- [ ] Users can submit contact form
- [ ] Users can subscribe to newsletter
- [ ] Admin can login
- [ ] Admin can view dashboard

### Full Feature Application
- [ ] All CRUD operations work
- [ ] File uploads successful
- [ ] No console errors
- [ ] No broken images
- [ ] All forms submit correctly
- [ ] Navigation works smoothly
- [ ] Responsive design works

---

## 📝 Test Execution Log

**Date**: ___________  
**Tester**: ___________  
**Browser**: ___________ (Chrome/Firefox/Safari/Edge)  
**Version**: ___________

### Summary
- Total Tests: _____
- Passed: _____
- Failed: _____
- Skipped: _____

### Critical Issues
1. _______________________
2. _______________________
3. _______________________

### Notes
_________________________________
_________________________________
_________________________________

---

## 🚀 After Testing

### If Everything Works
1. ✅ Application is production-ready
2. ✅ Document any minor issues for future improvement
3. ✅ Consider performance optimization
4. ✅ Set up monitoring

### If Issues Found
1. ⚠️ Review console errors
2. ⚠️ Check `FRONTEND-BACKEND-API-MAPPING.md` for known issues
3. ⚠️ Implement missing backend endpoints
4. ⚠️ Fix URL mismatches (already fixed in code)
5. ⚠️ Re-test after fixes

---

**Happy Testing! 🎉**

Remember: Check the browser console for every action!
