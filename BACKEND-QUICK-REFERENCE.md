# MSSD Backend - Quick Reference Guide

## 🚀 Quick Start

```bash
cd mssd-backend
mvn spring-boot:run
```

**Base URL**: `http://localhost:8080/api`

---

## 📋 All Endpoints Summary

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | Register user |
| GET | `/api/auth/user/{id}` | Get user by ID |
| POST | `/api/auth/hash-password` | Generate password hash |

### Formations (Training Programs)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/formations` | All formations |
| GET | `/api/formations/published` | Published only |
| GET | `/api/formations/{id}` | By ID |
| GET | `/api/formations/slug/{slug}` | By slug |
| GET | `/api/formations/category/{category}` | By category |
| GET | `/api/formations/level/{level}` | By level |
| POST | `/api/formations` | Create |
| PUT | `/api/formations/{id}` | Update |
| DELETE | `/api/formations/{id}` | Delete |

### Themes (Categories)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/themes` | Active themes |
| GET | `/api/themes/with-formations` | With formations |
| GET | `/api/themes/{slug}/formations` | By slug with formations |
| GET | `/api/themes/{id}` | By ID |
| GET | `/api/themes/admin` | All (including inactive) |
| POST | `/api/themes` | Create |
| PUT | `/api/themes/{id}` | Update |
| DELETE | `/api/themes/{id}` | Delete |

### Portfolio
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Active portfolios |
| GET | `/api/portfolio/admin` | All portfolios |
| GET | `/api/portfolio/{id}` | By ID |
| GET | `/api/portfolio/category/{category}` | By category |
| GET | `/api/portfolio/formation/{id}` | By formation |
| GET | `/api/portfolio/formations` | List formations |
| POST | `/api/portfolio` | Create |
| PUT | `/api/portfolio/{id}` | Update |
| PUT | `/api/portfolio/{id}/activate` | Activate |
| PUT | `/api/portfolio/{id}/deactivate` | Deactivate |
| DELETE | `/api/portfolio/{id}` | Delete |

### Blogs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Active blogs |
| GET | `/api/blogs/admin` | All blogs |
| GET | `/api/blogs/recent` | Recent blogs |
| GET | `/api/blogs/{id}` | By ID |
| GET | `/api/blogs/search?q={term}` | Search |
| GET | `/api/blogs/stats` | Statistics |
| POST | `/api/blogs` | Create |
| POST | `/api/blogs/with-image` | Create with image |
| PUT | `/api/blogs/{id}` | Update |
| PUT | `/api/blogs/{id}/with-image` | Update with image |
| PATCH | `/api/blogs/{id}/toggle-status` | Toggle active |
| DELETE | `/api/blogs/{id}` | Delete |

### Calendar Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calendars` | All events |
| GET | `/api/calendars/available` | Available events |
| GET | `/api/calendars/{id}` | By ID |
| GET | `/api/calendars/range?start=&end=` | By date range |
| GET | `/api/calendars/location/{location}` | By location |
| POST | `/api/calendars` | Create |
| POST | `/api/calendars/{id}/join` | Join event |
| PUT | `/api/calendars/{id}` | Update |
| DELETE | `/api/calendars/{id}` | Delete |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews?formationId={id}` | By formation |
| GET | `/api/reviews/all` | All reviews |
| POST | `/api/reviews` | Create |
| DELETE | `/api/reviews/{id}` | Delete |

### Training Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/annex-requests` | Submit request |
| GET | `/api/annex-requests` | All requests |
| GET | `/api/annex-requests/{id}` | By ID |
| GET | `/api/annex-requests/by-email/{email}` | By email |
| PUT | `/api/annex-requests/{id}/status?status=` | Update status |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit message |
| GET | `/api/contact` | All messages |

### Newsletter
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/newsletter` | Subscribe |

### Company
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/company` | Get info |
| PUT | `/api/company` | Update info |

### Highlights
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/highlights` | Visible highlights |

### Files
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/files/images` | List images |
| DELETE | `/api/files/{filename}` | Delete file |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/actuator/health` | Health check |
| GET | `/actuator/prometheus` | Metrics |

---

## 📊 Common Request Examples

### Create Formation
```bash
POST /api/formations
Content-Type: application/json

{
  "title": "Leadership Essentials",
  "slug": "leadership-essentials",
  "description": "Master leadership fundamentals",
  "category": "Management",
  "themeId": 1,
  "price": 1500.00,
  "duration": "2 days",
  "level": "INTERMEDIATE",
  "published": true
}
```

### Create Blog with Image
```bash
POST /api/blogs/with-image
Content-Type: multipart/form-data

title: "New Training Trends"
description: "Discover the latest..."
image: [file]
publishDate: "2024-01-20T10:00:00"
active: true
```

### Submit Training Request
```bash
POST /api/annex-requests
Content-Type: application/json

{
  "companyName": "Tech Corp",
  "contactName": "Jane Smith",
  "email": "jane@techcorp.com",
  "phone": "+33123456789",
  "trainingType": "in-person",
  "theme": "Leadership",
  "numParticipants": 15,
  "notes": "Custom training needed"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

---

## 🔑 Data Models Quick Reference

### Formation Fields
- title, slug, description, category
- themeId, price, duration, imageUrl
- level: BEGINNER | INTERMEDIATE | EXPERT
- published: boolean

### Portfolio Fields
- title, description, formationId
- imageUrl, clientName, projectDate
- projectUrl, companyLogoUrl, category
- active: boolean

### Blog Fields
- title, description, youtubeUrl
- imageUrl, publishDate
- active: boolean

### Calendar Fields
- title, formationId, location
- startDate, endDate
- maxCapacity, currentCapacity
- price, description, active

### Review Fields
- formationId, userName, userEmail
- rating (1-5), comment

---

## ⚙️ Environment Variables

```properties
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=MSSDD
DB_USER=root
DB_PASSWORD=

# Server
SERVER_PORT=8080

# File Upload
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10MB
```

---

## 🐛 Debugging Tips

### Check Application Health
```bash
curl http://localhost:8080/actuator/health
```

### View All Logs
Enable DEBUG logging in `application.properties`:
```properties
logging.level.com.mssd=DEBUG
```

### Database Issues
```bash
# Check MySQL is running
mysql -u root -p

# Verify database exists
SHOW DATABASES;
USE MSSDD;
SHOW TABLES;
```

### Port Already in Use
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process
taskkill /PID <PID> /F
```

---

## 🔒 Security Notes

### Password Hashing
```bash
# Generate BCrypt hash
POST /api/auth/hash-password
{
  "password": "yourpassword"
}

# Returns:
{
  "hashedPassword": "$2a$10$..."
}
```

### CORS
Currently allows all origins. For production:
```java
@CrossOrigin(origins = "https://yourdomain.com")
```

---

## 📦 Response Formats

### Success Response
```json
{
  "id": 1,
  "title": "Formation Title",
  "...": "..."
}
```

### Error Response
```json
{
  "error": "Bad Request",
  "message": "Invalid formation ID",
  "timestamp": "2024-01-20T10:00:00"
}
```

### List Response
```json
[
  { "id": 1, "...": "..." },
  { "id": 2, "...": "..." }
]
```

---

## 🎯 HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET/PUT/PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid data |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal error |

---

## 🔄 Database Schema

### Key Tables
- `formations` - Training programs
- `themes` - Formation categories
- `portfolio` - Success stories
- `blog` - Blog posts
- `calendars` - Training events
- `reviews` - Formation reviews
- `annex_request` - Training requests
- `contact` - Contact messages
- `newsletter` - Email subscriptions
- `users` - Admin users
- `company` - Company info
- `highlights` - Homepage features

---

## 📚 Related Documentation

- Full API Documentation: `BACKEND-API-DOCUMENTATION.md`
- Frontend Documentation: See frontend docs
- Database Schema: Check entity models in `/model` directory

---

**Quick Access**: This guide provides fast reference for all backend endpoints and common operations.
