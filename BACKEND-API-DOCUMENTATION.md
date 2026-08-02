# MSSD Backend API Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Database Models](#database-models)
5. [API Endpoints](#api-endpoints)
6. [Configuration](#configuration)
7. [Running the Backend](#running-the-backend)

---

## 🎯 Overview

The MSSD Backend is a RESTful API built with Spring Boot that manages a training center management system. It provides comprehensive endpoints for managing formations, portfolios, blogs, calendar events, user authentication, and more.

**Base URL**: `http://localhost:8080`  
**API Prefix**: `/api`

---

## 🛠 Technology Stack

### Core Framework
- **Spring Boot**: 3.2.0
- **Java**: 17
- **Maven**: Build tool

### Dependencies
- **Spring Web**: RESTful API development
- **Spring Data JPA**: Database ORM
- **Spring Validation**: Request validation
- **Spring Actuator**: Health checks and monitoring
- **Spring Security Crypto**: Password hashing (BCrypt)
- **Micrometer**: Prometheus metrics
- **MySQL Connector**: Production database
- **H2 Database**: Development/testing
- **Lombok**: Reduce boilerplate code

### Database
- **Production**: MySQL 8.0
- **Development**: H2 (in-memory option)
- **Database Name**: `MSSDD`

---

## 🏗 Architecture

### Project Structure
```
mssd-backend/
├── src/main/java/com/mssd/
│   ├── config/           # Configuration classes
│   │   ├── SecurityConfig.java
│   │   ├── WebConfig.java
│   │   ├── SeedDataConfig.java
│   │   └── FileStorageInitializer.java
│   ├── controller/       # REST Controllers
│   ├── dto/             # Data Transfer Objects
│   ├── entity/          # JPA Entities (legacy)
│   ├── model/           # Domain Models
│   ├── repository/      # JPA Repositories
│   ├── service/         # Business Logic
│   │   └── impl/        # Service Implementations
│   ├── mapper/          # DTO-Entity Mappers
│   ├── exception/       # Custom Exceptions
│   └── MssdApplication.java
└── src/main/resources/
    ├── application.properties
    └── static/uploads/  # File storage
```

### Design Patterns
- **Repository Pattern**: Data access abstraction
- **Service Layer Pattern**: Business logic separation
- **DTO Pattern**: Data transfer between layers
- **Mapper Pattern**: Entity-DTO conversion
- **Exception Handling**: Global exception handler

---

## 📊 Database Models

### Core Entities

#### 1. **Formation** (Training Programs)
- `id`: Long (Primary Key)
- `title`: String
- `slug`: String (Unique)
- `description`: Text
- `category`: String (legacy field)
- `theme`: Theme (ManyToOne)
- `price`: BigDecimal
- `duration`: String
- `imageUrl`: String
- `level`: Enum (BEGINNER, INTERMEDIATE, EXPERT)
- `published`: Boolean
- `createdAt`: LocalDateTime
- `updatedAt`: LocalDateTime

#### 2. **Theme** (Formation Categories)
- `id`: Long
- `name`: String
- `slug`: String (Unique)
- `description`: Text
- `iconUrl`: String
- `active`: Boolean
- `formations`: List<Formation> (OneToMany)

#### 3. **Portfolio** (Training Success Stories)
- `id`: Long
- `title`: String
- `description`: Text
- `formation`: Formation (ManyToOne)
- `imageUrl`: String
- `clientName`: String
- `projectDate`: LocalDate
- `projectUrl`: String
- `companyLogoUrl`: String
- `category`: String
- `active`: Boolean
- `createdAt`: LocalDateTime
- `updatedAt`: LocalDateTime

#### 4. **Blog** (Blog Posts)
- `id`: Long
- `title`: String
- `description`: Text
- `youtubeUrl`: String
- `imageUrl`: String
- `publishDate`: LocalDateTime
- `active`: Boolean
- `createdAt`: LocalDateTime
- `updatedAt`: LocalDateTime

#### 5. **Calendar** (Training Events)
- `id`: Long
- `title`: String
- `formation`: Formation (ManyToOne)
- `startDate`: LocalDateTime
- `endDate`: LocalDateTime
- `location`: String
- `maxCapacity`: Integer
- `currentCapacity`: Integer
- `description`: Text
- `price`: BigDecimal
- `active`: Boolean

#### 6. **Review** (Formation Reviews)
- `id`: Long
- `formation`: Formation (ManyToOne)
- `userName`: String
- `userEmail`: String
- `rating`: Integer (1-5)
- `comment`: Text
- `createdAt`: LocalDateTime

#### 7. **AnnexRequest** (Training Requests)
- `id`: Long
- `companyName`: String
- `contactName`: String
- `email`: String
- `phone`: String
- `trainingType`: String (in-person, remote, hybrid)
- `theme`: String
- `numParticipants`: Integer
- `notes`: Text
- `status`: Enum (PENDING, APPROVED, REJECTED)
- `createdAt`: LocalDateTime

#### 8. **Contact** (Contact Messages)
- `id`: Long
- `name`: String
- `email`: String
- `subject`: String
- `message`: Text
- `createdAt`: LocalDateTime

#### 9. **Newsletter** (Email Subscriptions)
- `id`: Long
- `email`: String (Unique)
- `subscribedAt`: LocalDateTime

#### 10. **User** (Admin Users)
- `id`: Long
- `username`: String (Unique)
- `email`: String
- `password`: String (BCrypt hashed)
- `role`: String
- `active`: Boolean

#### 11. **Company** (Company Information)
- `id`: Long
- `name`: String
- `description`: Text
- `email`: String
- `phone`: String
- `address`: String
- `logoUrl`: String

#### 12. **Highlight** (Homepage Highlights)
- `id`: Long
- `title`: String
- `description`: String
- `iconClass`: String
- `displayOrder`: Integer
- `visible`: Boolean

---

## 🔌 API Endpoints

### 1. Authentication & Users

#### POST `/api/auth/login`
**Description**: Authenticate user and get login response  
**Request Body**:
```json
{
  "username": "admin",
  "password": "password123"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "userId": 1,
  "username": "admin",
  "role": "ADMIN"
}
```

#### POST `/api/auth/register`
**Description**: Register a new user  
**Request Body**:
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "securepassword",
  "role": "USER"
}
```

#### GET `/api/auth/user/{id}`
**Description**: Get user by ID  
**Response**: UserDto object

#### POST `/api/auth/hash-password`
**Description**: Generate BCrypt hash for a password (utility endpoint)  
**Request Body**:
```json
{
  "password": "plaintext"
}
```
**Response**:
```json
{
  "hashedPassword": "$2a$10$..."
}
```

---

### 2. Formations (Training Programs)

#### GET `/api/formations`
**Description**: Get all formations  
**Response**: Array of FormationDto

#### GET `/api/formations/published`
**Description**: Get only published formations  
**Response**: Array of FormationDto

#### GET `/api/formations/{id}`
**Description**: Get formation by ID  
**Response**: FormationDto object

#### GET `/api/formations/slug/{slug}`
**Description**: Get formation by slug  
**Example**: `/api/formations/slug/leadership-essentials`  
**Response**: FormationDto object

#### GET `/api/formations/category/{category}`
**Description**: Get formations by category  
**Response**: Array of FormationDto

#### GET `/api/formations/level/{level}`
**Description**: Get formations by level (BEGINNER, INTERMEDIATE, EXPERT)  
**Response**: Array of FormationDto

#### POST `/api/formations`
**Description**: Create new formation  
**Request Body**:
```json
{
  "title": "Advanced Leadership",
  "slug": "advanced-leadership",
  "description": "Master leadership skills",
  "category": "Management",
  "themeId": 1,
  "price": 2500.00,
  "duration": "3 days",
  "imageUrl": "/uploads/image.jpg",
  "level": "EXPERT",
  "published": true
}
```

#### PUT `/api/formations/{id}`
**Description**: Update existing formation  
**Request Body**: Same as POST

#### DELETE `/api/formations/{id}`
**Description**: Delete formation  
**Response**: 204 No Content

---

### 3. Themes (Formation Categories)

#### GET `/api/themes`
**Description**: Get all active themes  
**Response**: Array of ThemeDto

#### GET `/api/themes/with-formations`
**Description**: Get themes with their formations included  
**Response**: Array of ThemeDto with nested formations

#### GET `/api/themes/{slug}/formations`
**Description**: Get theme with formations by slug  
**Example**: `/api/themes/leadership/formations`  
**Response**: ThemeDto with formations

#### GET `/api/themes/{id}`
**Description**: Get theme by ID  
**Response**: ThemeDto object

#### GET `/api/themes/admin`
**Description**: Get all themes including inactive (admin only)  
**Response**: Array of ThemeDto

#### POST `/api/themes`
**Description**: Create new theme  
**Request Body**:
```json
{
  "name": "Sales Training",
  "slug": "sales-training",
  "description": "Sales and negotiation courses",
  "iconUrl": "/icons/sales.svg",
  "active": true
}
```

#### PUT `/api/themes/{id}`
**Description**: Update existing theme  
**Request Body**: Same as POST

#### DELETE `/api/themes/{id}`
**Description**: Delete theme (only if no formations attached)  
**Response**: 204 No Content

---

### 4. Portfolio (Success Stories)

#### GET `/api/portfolio`
**Description**: Get all active portfolios (public view)  
**Response**: Array of PortfolioDto

#### GET `/api/portfolio/admin`
**Description**: Get all portfolios including inactive (admin)  
**Response**: Array of PortfolioDto

#### GET `/api/portfolio/{id}`
**Description**: Get portfolio by ID  
**Response**: PortfolioDto object

#### GET `/api/portfolio/category/{category}`
**Description**: Get portfolios by category  
**Response**: Array of PortfolioDto

#### GET `/api/portfolio/formation/{formationId}`
**Description**: Get portfolios by formation ID  
**Response**: Array of PortfolioDto

#### GET `/api/portfolio/formations`
**Description**: Get all formations for portfolio dropdown  
**Response**: Array of FormationDto

#### POST `/api/portfolio`
**Description**: Create new portfolio  
**Request Body**:
```json
{
  "title": "Leadership Training Success",
  "description": "Successful implementation at Tech Corp",
  "formationId": 1,
  "imageUrl": "/uploads/portfolio1.jpg",
  "clientName": "Tech Corp",
  "projectDate": "2024-01-15",
  "projectUrl": "https://example.com",
  "companyLogoUrl": "/uploads/logo.png",
  "category": "Corporate",
  "active": true
}
```

#### PUT `/api/portfolio/{id}`
**Description**: Update existing portfolio  
**Request Body**: Same as POST

#### PUT `/api/portfolio/{id}/activate`
**Description**: Activate portfolio  
**Response**: 200 OK

#### PUT `/api/portfolio/{id}/deactivate`
**Description**: Deactivate portfolio  
**Response**: 200 OK

#### DELETE `/api/portfolio/{id}`
**Description**: Delete portfolio  
**Response**: 204 No Content

---

### 5. Blogs

#### GET `/api/blogs`
**Description**: Get all active blogs (public view)  
**Response**: Array of Blog objects

#### GET `/api/blogs/admin`
**Description**: Get all blogs including inactive (admin)  
**Response**: Array of Blog objects

#### GET `/api/blogs/recent`
**Description**: Get recent blogs  
**Response**: Array of Blog objects

#### GET `/api/blogs/{id}`
**Description**: Get blog by ID  
**Response**: Blog object

#### GET `/api/blogs/search?q={searchTerm}`
**Description**: Search blogs by title or description  
**Example**: `/api/blogs/search?q=leadership`  
**Response**: Array of Blog objects

#### GET `/api/blogs/stats`
**Description**: Get blog statistics  
**Response**:
```json
{
  "total": 50,
  "active": 45,
  "inactive": 5
}
```

#### POST `/api/blogs`
**Description**: Create new blog  
**Request Body**:
```json
{
  "title": "New Training Methods",
  "description": "Explore innovative approaches...",
  "youtubeUrl": "https://youtube.com/...",
  "imageUrl": "/uploads/blog1.jpg",
  "publishDate": "2024-01-20T10:00:00",
  "active": true
}
```

#### POST `/api/blogs/with-image`
**Description**: Create blog with image upload  
**Content-Type**: multipart/form-data  
**Form Fields**:
- `title`: String (required)
- `description`: String (required)
- `youtubeUrl`: String (optional)
- `publishDate`: String (optional, ISO format)
- `active`: Boolean (default: true)
- `image`: File (optional)

#### PUT `/api/blogs/{id}`
**Description**: Update existing blog  
**Request Body**: Same as POST

#### PUT `/api/blogs/{id}/with-image`
**Description**: Update blog with image upload  
**Content-Type**: multipart/form-data  
**Form Fields**: Same as POST with-image

#### PATCH `/api/blogs/{id}/toggle-status`
**Description**: Toggle blog active/inactive status  
**Response**: Updated Blog object

#### DELETE `/api/blogs/{id}`
**Description**: Delete blog  
**Response**: 204 No Content

---

### 6. Calendar (Training Events)

#### GET `/api/calendars`
**Description**: Get all calendar events  
**Response**: Array of CalendarDto

#### GET `/api/calendars/available`
**Description**: Get available calendar events (with capacity)  
**Response**: Array of CalendarDto

#### GET `/api/calendars/{id}`
**Description**: Get calendar event by ID  
**Response**: CalendarDto object

#### GET `/api/calendars/range?start={startDate}&end={endDate}`
**Description**: Get calendar events by date range  
**Example**: `/api/calendars/range?start=2024-01-01T10:00:00&end=2024-01-31T18:00:00`  
**Response**: Array of CalendarDto

#### GET `/api/calendars/location/{location}`
**Description**: Get calendar events by location  
**Response**: Array of CalendarDto

#### POST `/api/calendars`
**Description**: Create new calendar event  
**Request Body**:
```json
{
  "title": "Leadership Workshop",
  "formationId": 1,
  "startDate": "2024-03-15T09:00:00",
  "endDate": "2024-03-15T17:00:00",
  "location": "Paris",
  "maxCapacity": 20,
  "currentCapacity": 0,
  "description": "Full day workshop",
  "price": 500.00,
  "active": true
}
```

#### PUT `/api/calendars/{id}`
**Description**: Update existing calendar event  
**Request Body**: Same as POST

#### POST `/api/calendars/{id}/join`
**Description**: Join event (increment currentCapacity)  
**Response**: Updated CalendarDto

#### DELETE `/api/calendars/{id}`
**Description**: Delete calendar event  
**Response**: 204 No Content

---

### 7. Reviews (Formation Reviews)

#### GET `/api/reviews?formationId={id}`
**Description**: Get reviews for a specific formation  
**Example**: `/api/reviews?formationId=1`  
**Response**: Array of Review objects

#### GET `/api/reviews/all`
**Description**: Get all reviews  
**Response**: Array of ReviewDto

#### POST `/api/reviews`
**Description**: Create new review  
**Request Body**:
```json
{
  "formationId": 1,
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "rating": 5,
  "comment": "Excellent training program!"
}
```

#### DELETE `/api/reviews/{id}`
**Description**: Delete review  
**Response**: 204 No Content

---

### 8. Annex Requests (Training Requests)

#### POST `/api/annex-requests`
**Description**: Submit new training request  
**Request Body**:
```json
{
  "companyName": "Tech Corp",
  "contactName": "Jane Smith",
  "email": "jane@techcorp.com",
  "phone": "+33 1 23 45 67 89",
  "trainingType": "in-person",
  "theme": "Leadership",
  "numParticipants": 15,
  "notes": "Looking for custom leadership training",
  "agreeToTerms": true
}
```

#### GET `/api/annex-requests`
**Description**: Get all training requests (admin)  
**Response**: Array of AnnexRequestResponseDto

#### GET `/api/annex-requests/{id}`
**Description**: Get training request by ID  
**Response**: AnnexRequestResponseDto

#### GET `/api/annex-requests/by-email/{email}`
**Description**: Get training requests by email  
**Response**: Array of AnnexRequestResponseDto

#### PUT `/api/annex-requests/{id}/status?status={status}`
**Description**: Update request status (admin)  
**Status Values**: PENDING, APPROVED, REJECTED  
**Example**: `/api/annex-requests/5/status?status=APPROVED`  
**Response**: Updated AnnexRequestResponseDto

---

### 9. Contact Messages

#### POST `/api/contact`
**Description**: Submit contact message  
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about training",
  "message": "I would like to know more about..."
}
```

#### GET `/api/contact`
**Description**: Get all contact messages (admin)  
**Response**: Array of ContactDto

---

### 10. Newsletter

#### POST `/api/newsletter`
**Description**: Subscribe to newsletter  
**Request Body**:
```json
{
  "email": "subscriber@example.com"
}
```

---

### 11. Company Information

#### GET `/api/company`
**Description**: Get company information  
**Response**: Company object

#### PUT `/api/company`
**Description**: Update company information (admin)  
**Request Body**:
```json
{
  "name": "MSSD Training Center",
  "description": "Leading training provider...",
  "email": "contact@mssd.com",
  "phone": "+33 1 23 45 67 89",
  "address": "123 Training St, Paris",
  "logoUrl": "/uploads/logo.png"
}
```

---

### 12. Highlights (Homepage Features)

#### GET `/api/highlights`
**Description**: Get visible homepage highlights  
**Response**: Array of Highlight objects  
**Example Response**:
```json
[
  {
    "id": 1,
    "title": "Expert Trainers",
    "description": "Learn from industry experts",
    "iconClass": "bi-people",
    "displayOrder": 1,
    "visible": true
  }
]
```

---

### 13. File Management

#### GET `/api/files/images`
**Description**: Get list of available images  
**Response**:
```json
[
  {
    "name": "portfolio-1.jpg",
    "path": "uploads/portfolio-1.jpg",
    "type": "uploaded",
    "size": "2.5 MB"
  },
  {
    "name": "portfolio-2.jpg",
    "path": "assets/img/portfolio-2.jpg",
    "type": "asset",
    "size": "N/A"
  }
]
```

#### DELETE `/api/files/{filename}`
**Description**: Delete uploaded file  
**Response**:
```json
{
  "message": "File deleted successfully"
}
```

---

### 14. Health & Monitoring

#### GET `/actuator/health`
**Description**: Application health check  
**Response**:
```json
{
  "status": "UP"
}
```

#### GET `/actuator/prometheus`
**Description**: Prometheus metrics endpoint  
**Response**: Prometheus formatted metrics

---

## ⚙️ Configuration

### Database Configuration
Located in `application.properties`:

```properties
# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/MSSDD?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

### Server Configuration
```properties
server.port=8080
```

### File Upload Configuration
```properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
app.upload.dir=src/main/resources/static/uploads
```

### CORS Configuration
```properties
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

### Logging Configuration
```properties
logging.level.root=info
logging.level.com.mssd=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

---

## 🚀 Running the Backend

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+ (or use H2 for development)

### Steps

1. **Clone the repository**
```bash
cd mssd-backend
```

2. **Configure database**
- Ensure MySQL is running on localhost:3306
- Database `MSSDD` will be created automatically
- Update credentials in `application.properties` if needed

3. **Build the project**
```bash
mvn clean install
```

4. **Run the application**
```bash
mvn spring-boot:run
```

5. **Verify it's running**
- Open browser: http://localhost:8080/actuator/health
- Should see: `{"status":"UP"}`

### Alternative: Run as JAR
```bash
mvn clean package
java -jar target/mssd-backend-1.0.0.jar
```

---

## 📦 Data Seeding

The application automatically seeds initial data on startup via `SeedDataConfig.java`:

- **Admin User**: username: `admin`, password: (set via hash-password endpoint)
- **Company Information**: Default company details
- **Highlights**: Homepage feature highlights
- **Sample Calendar Events**: Demo training events

To disable seeding, modify `SeedDataConfig.java`.

---

## 🔒 Security Features

### Password Hashing
- Uses BCrypt for password hashing
- Configurable strength (default: 10 rounds)
- Utility endpoint: `/api/auth/hash-password`

### CORS
- Configured for all origins (development)
- Restrict in production to specific frontend domains

### File Upload Security
- File size limits: 10MB max
- Supported image formats: jpg, jpeg, png, gif, svg, webp
- Files stored in: `src/main/resources/static/uploads/`

---

## 📝 Common Response Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid request body/parameters |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server-side error |

---

## 🎯 Best Practices for Frontend Integration

### 1. API Base URL
Set up environment-specific base URLs:
```typescript
const API_BASE_URL = environment.apiUrl; // http://localhost:8080/api
```

### 2. Error Handling
All endpoints return consistent error responses:
```json
{
  "error": "Resource not found",
  "message": "Formation with ID 999 not found",
  "timestamp": "2024-01-20T10:00:00"
}
```

### 3. Date Formats
- All dates are in ISO 8601 format: `2024-01-20T10:00:00`
- Timezone: UTC

### 4. File Uploads
For endpoints accepting file uploads (multipart/form-data):
```typescript
const formData = new FormData();
formData.append('title', 'Blog Title');
formData.append('description', 'Description');
formData.append('image', fileBlob);
```

### 5. Pagination
Currently not implemented. All list endpoints return full arrays.  
**Recommendation**: Implement pagination for large datasets in frontend.

---

## 🔧 Future Enhancements

Recommended improvements for production:

1. **Authentication & Authorization**
   - Implement JWT tokens
   - Role-based access control (RBAC)
   - OAuth2 integration

2. **API Improvements**
   - Add pagination to list endpoints
   - Implement sorting and filtering
   - Add API versioning (/api/v1/)

3. **Performance**
   - Add caching (Redis)
   - Database query optimization
   - CDN for file uploads

4. **Security**
   - Rate limiting
   - API key authentication
   - Input sanitization enhancement

5. **Monitoring**
   - Enhanced Prometheus metrics
   - Application performance monitoring (APM)
   - Error tracking (Sentry)

---

## 📞 Support

For backend-related issues:
- Check logs: `logging.level.com.mssd=DEBUG`
- Database issues: Verify MySQL connection and credentials
- Port conflicts: Change `server.port` in application.properties

---

**Last Updated**: January 2024  
**Backend Version**: 1.0.0  
**Spring Boot Version**: 3.2.0
