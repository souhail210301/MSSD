# MSSD Backend - Complete Documentation Index

## 📚 Documentation Overview

This is your complete guide to the MSSD Backend API. All documentation files are organized for easy navigation.

---

## 📖 Available Documentation

### 1. **BACKEND-API-DOCUMENTATION.md** (Main Reference)
**70+ pages** - Complete API documentation including:
- ✅ Full endpoint listing with request/response examples
- ✅ Technology stack and architecture
- ✅ Database models and relationships
- ✅ Configuration guide
- ✅ Running instructions
- ✅ Security features
- ✅ Best practices for frontend integration

**Start here for**: Complete understanding of the backend system

---

### 2. **BACKEND-QUICK-REFERENCE.md** (Cheat Sheet)
**Quick access guide** including:
- ✅ All endpoints in table format
- ✅ Common request examples
- ✅ HTTP status codes
- ✅ Debugging tips
- ✅ Environment variables

**Start here for**: Fast lookup of endpoints and commands

---

### 3. **BACKEND-DATA-MODELS.md** (Type Definitions)
**Data structure reference** including:
- ✅ All DTOs (Data Transfer Objects)
- ✅ Request/response formats
- ✅ Validation rules
- ✅ TypeScript interface examples
- ✅ Frontend integration patterns

**Start here for**: Building type-safe frontend applications

---

## 🎯 Quick Start Guide

### Prerequisites
```bash
- Java 17+
- Maven 3.6+
- MySQL 8.0+ (or H2 for dev)
```

### Run Backend
```bash
cd mssd-backend
mvn spring-boot:run
```

### Verify Running
```bash
# Health check
curl http://localhost:8080/actuator/health

# Expected: {"status":"UP"}
```

### Base URL
```
http://localhost:8080/api
```

---

## 🗂 Project Structure

```
mssd-backend/
├── src/main/java/com/mssd/
│   ├── config/              # Spring configuration
│   ├── controller/          # REST endpoints (21 controllers)
│   ├── dto/                 # Data transfer objects
│   ├── model/               # JPA entities
│   ├── repository/          # Database access
│   ├── service/             # Business logic
│   ├── mapper/              # DTO-Entity conversion
│   ├── exception/           # Error handling
│   └── MssdApplication.java # Main application
├── src/main/resources/
│   ├── application.properties  # Configuration
│   └── static/uploads/         # File storage
├── pom.xml                  # Maven dependencies
└── README.md               # This file
```

---

## 🔌 Core Features

### 1. **Formations Management** (Training Programs)
- ✅ CRUD operations
- ✅ Filter by category, level, theme
- ✅ Publish/unpublish
- ✅ Slug-based routing
- ✅ Price and duration management

### 2. **Portfolio Management** (Success Stories)
- ✅ CRUD operations
- ✅ Link to formations
- ✅ Client information
- ✅ Project details
- ✅ Active/inactive status

### 3. **Blog System**
- ✅ CRUD with image upload
- ✅ YouTube video integration
- ✅ Search functionality
- ✅ Active/inactive toggle
- ✅ Statistics endpoint

### 4. **Calendar Events**
- ✅ Training event scheduling
- ✅ Capacity management
- ✅ Date range filtering
- ✅ Location-based search
- ✅ Join event functionality

### 5. **Reviews & Ratings**
- ✅ Formation reviews
- ✅ 1-5 star rating
- ✅ User comments
- ✅ Filter by formation

### 6. **Training Requests**
- ✅ Custom training requests
- ✅ Status workflow (Pending → Approved/Rejected)
- ✅ Email tracking
- ✅ Company information

### 7. **Contact & Newsletter**
- ✅ Contact form submissions
- ✅ Newsletter subscriptions
- ✅ Email validation

### 8. **Authentication**
- ✅ User login/register
- ✅ BCrypt password hashing
- ✅ Role-based access (foundation)

### 9. **File Management**
- ✅ Image upload (max 10MB)
- ✅ File listing
- ✅ File deletion
- ✅ Multiple format support

### 10. **Company & Highlights**
- ✅ Company information management
- ✅ Homepage highlights
- ✅ Social media links

---

## 📊 Database

### Database Name
```
MSSDD
```

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

### Auto-Created
MySQL database is created automatically on first run.

---

## 🔧 Configuration

### application.properties
```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/MSSDD
spring.datasource.username=root
spring.datasource.password=

# File Upload
spring.servlet.multipart.max-file-size=10MB
app.upload.dir=uploads

# CORS
spring.web.cors.allowed-origins=*
```

---

## 🚀 Common Operations

### 1. Get All Formations
```bash
GET http://localhost:8080/api/formations
```

### 2. Create New Blog
```bash
POST http://localhost:8080/api/blogs
Content-Type: application/json

{
  "title": "New Post",
  "description": "Content...",
  "active": true
}
```

### 3. Submit Training Request
```bash
POST http://localhost:8080/api/annex-requests
Content-Type: application/json

{
  "companyName": "Tech Corp",
  "email": "contact@techcorp.com",
  "trainingType": "in-person",
  "numParticipants": 15
}
```

### 4. Upload Blog with Image
```bash
POST http://localhost:8080/api/blogs/with-image
Content-Type: multipart/form-data

title: "My Blog"
description: "Content..."
image: [file]
```

---

## 🔒 Security

### Password Hashing
```bash
POST /api/auth/hash-password
{
  "password": "yourpassword"
}

# Returns BCrypt hash: $2a$10$...
```

### CORS
- Currently allows all origins (development)
- Configure for production in `WebConfig.java`

### File Upload
- Max size: 10MB
- Allowed types: jpg, jpeg, png, gif, svg, webp
- Storage: `src/main/resources/static/uploads/`

---

## 🐛 Troubleshooting

### Port 8080 Already in Use
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Change port in application.properties
server.port=8081
```

### Database Connection Error
```bash
# Verify MySQL is running
mysql -u root -p

# Check credentials in application.properties
spring.datasource.username=root
spring.datasource.password=yourpassword
```

### File Upload Issues
```bash
# Check upload directory exists
ls src/main/resources/static/uploads/

# Verify file size limit
spring.servlet.multipart.max-file-size=10MB
```

---

## 📈 Monitoring

### Health Check
```bash
GET /actuator/health
```

### Prometheus Metrics
```bash
GET /actuator/prometheus
```

### Application Info
```bash
GET /actuator/info
```

---

## 🎯 Frontend Integration Guide

### 1. Set Base URL
```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

### 2. Create HTTP Service
```typescript
import { HttpClient } from '@angular/common/http';

export class FormationService {
  constructor(private http: HttpClient) {}
  
  getAll() {
    return this.http.get(`${API_BASE_URL}/formations`);
  }
  
  getById(id: number) {
    return this.http.get(`${API_BASE_URL}/formations/${id}`);
  }
  
  create(data: any) {
    return this.http.post(`${API_BASE_URL}/formations`, data);
  }
}
```

### 3. Handle Errors
```typescript
import { catchError } from 'rxjs/operators';

this.http.get('/api/formations')
  .pipe(
    catchError(error => {
      console.error('API Error:', error);
      return throwError(error);
    })
  )
  .subscribe(data => {
    console.log('Success:', data);
  });
```

### 4. File Upload
```typescript
uploadBlogWithImage(title: string, description: string, file: File) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('image', file);
  
  return this.http.post('/api/blogs/with-image', formData);
}
```

---

## 📦 Dependencies

### Core
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Web
- Spring Validation

### Database
- MySQL Connector 8.0.33
- H2 Database (dev)

### Utilities
- Lombok
- BCrypt (password hashing)

### Monitoring
- Spring Actuator
- Micrometer (Prometheus)

---

## 🔄 Development Workflow

### 1. Make Changes
Edit Java files in `src/main/java/com/mssd/`

### 2. Build
```bash
mvn clean install
```

### 3. Run
```bash
mvn spring-boot:run
```

### 4. Test
```bash
curl http://localhost:8080/actuator/health
```

### 5. Package
```bash
mvn clean package
# Creates: target/mssd-backend-1.0.0.jar
```

---

## 📝 Next Steps

### For Frontend Development
1. Read **BACKEND-DATA-MODELS.md** for type definitions
2. Use **BACKEND-QUICK-REFERENCE.md** for endpoint lookup
3. Implement HTTP services based on the models
4. Handle errors and loading states
5. Test with the running backend

### For Backend Enhancement
1. Add pagination to list endpoints
2. Implement JWT authentication
3. Add role-based access control
4. Optimize database queries
5. Add caching layer (Redis)
6. Implement search with Elasticsearch

### For Production Deployment
1. Configure production database
2. Set up environment variables
3. Enable HTTPS
4. Configure CORS for specific domains
5. Set up monitoring (Prometheus + Grafana)
6. Configure backup strategy

---

## 📞 Support & Resources

### Documentation Files
- `BACKEND-API-DOCUMENTATION.md` - Full API reference
- `BACKEND-QUICK-REFERENCE.md` - Quick lookup guide
- `BACKEND-DATA-MODELS.md` - Type definitions

### Code Structure
- Controllers: `src/main/java/com/mssd/controller/`
- Services: `src/main/java/com/mssd/service/`
- Models: `src/main/java/com/mssd/model/`
- DTOs: `src/main/java/com/mssd/dto/`

### External Resources
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## ✅ Checklist for New Frontend

- [ ] Read API documentation
- [ ] Understand data models
- [ ] Set up base URL configuration
- [ ] Create HTTP client services
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Test all CRUD operations
- [ ] Handle file uploads
- [ ] Implement authentication flow
- [ ] Add form validation
- [ ] Test with real backend data

---

## 🎉 Summary

The MSSD Backend provides a **complete REST API** for managing a training center with:
- ✅ **300+ endpoints** across 21 controllers
- ✅ **12 core entities** with full CRUD
- ✅ **File upload** support
- ✅ **Search & filtering** capabilities
- ✅ **Authentication** foundation
- ✅ **Health monitoring** built-in
- ✅ **Comprehensive documentation**

**Ready to build your frontend!** 🚀

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Framework**: Spring Boot 3.2.0  
**Java**: 17
