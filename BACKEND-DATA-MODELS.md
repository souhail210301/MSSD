# MSSD Backend - Data Models Reference

Complete reference for all DTOs (Data Transfer Objects) and request/response formats.

---

## 📋 Table of Contents
1. [Authentication Models](#authentication-models)
2. [Formation Models](#formation-models)
3. [Theme Models](#theme-models)
4. [Portfolio Models](#portfolio-models)
5. [Blog Models](#blog-models)
6. [Calendar Models](#calendar-models)
7. [Review Models](#review-models)
8. [Request Models](#request-models)
9. [Contact Models](#contact-models)
10. [Common Models](#common-models)

---

## 1. Authentication Models

### LoginRequest
**POST** `/api/auth/login`
```typescript
{
  username: string;     // Required, 3-50 chars
  password: string;     // Required, min 6 chars
}
```

### LoginResponse
```typescript
{
  success: boolean;
  message: string;
  userId?: number;
  username?: string;
  role?: string;
  token?: string;       // Future: JWT token
}
```

### UserDto
```typescript
{
  id: number;
  username: string;     // Unique
  email: string;        // Valid email format
  password?: string;    // Write-only, BCrypt hashed
  role: string;         // e.g., "ADMIN", "USER"
  active: boolean;
  createdAt: string;    // ISO 8601 format
  updatedAt: string;
}
```

---

## 2. Formation Models

### FormationDto
**Complete formation object**
```typescript
{
  id: number;
  title: string;                    // Required, max 255 chars
  slug: string;                     // Required, unique, URL-friendly
  description: string;              // Text, can be long
  category: string;                 // Legacy field
  theme?: ThemeDto;                 // Related theme object
  themeId?: number;                 // Foreign key to theme
  price: number;                    // Decimal(10,2), e.g., 1500.00
  duration: string;                 // e.g., "2 days", "40 hours"
  imageUrl?: string;                // Path to image
  level: "BEGINNER" | "INTERMEDIATE" | "EXPERT";
  published: boolean;               // Visibility flag
  createdAt: string;                // ISO 8601
  updatedAt: string;                // ISO 8601
  reviews?: ReviewDto[];            // Optional, includes reviews
}
```

### FormationRequestDto
**For creating/updating formations**
```typescript
{
  title: string;                    // Required
  slug: string;                     // Required, unique
  description: string;              // Required
  category: string;                 // Required
  themeId?: number;                 // Optional
  price: number;                    // Required, positive
  duration: string;                 // Required
  imageUrl?: string;                // Optional
  level: "BEGINNER" | "INTERMEDIATE" | "EXPERT";  // Required
  published: boolean;               // Default: false
}
```

### FormationSummaryDto
**Lightweight formation object**
```typescript
{
  id: number;
  title: string;
  slug: string;
  price: number;
  duration: string;
  level: string;
  imageUrl?: string;
}
```

---

## 3. Theme Models

### ThemeDto
**Complete theme object**
```typescript
{
  id: number;
  name: string;                     // Required, max 100 chars
  slug: string;                     // Required, unique, URL-friendly
  description?: string;             // Text
  iconUrl?: string;                 // Path to icon/image
  active: boolean;                  // Default: true
  formations?: FormationDto[];      // Optional, nested formations
  createdAt: string;                // ISO 8601
  updatedAt: string;                // ISO 8601
}
```

### ThemeCreateUpdateDto
**For creating/updating themes**
```typescript
{
  name: string;                     // Required
  slug: string;                     // Required, unique
  description?: string;             // Optional
  iconUrl?: string;                 // Optional
  active: boolean;                  // Default: true
}
```

---

## 4. Portfolio Models

### PortfolioDto
**Complete portfolio object**
```typescript
{
  id: number;
  title: string;                    // Required, max 255 chars
  description: string;              // Text
  formationId: number;              // Required, FK to formation
  formation?: FormationDto;         // Optional, nested formation
  imageUrl?: string;                // Project image
  clientName?: string;              // Client/company name
  projectDate?: string;             // ISO date (YYYY-MM-DD)
  projectUrl?: string;              // External link
  companyLogoUrl?: string;          // Client logo
  category: string;                 // Default: "General"
  active: boolean;                  // Default: true
  createdAt: string;                // ISO 8601
  updatedAt: string;                // ISO 8601
}
```

### PortfolioItemDto
**Alternative portfolio representation**
```typescript
{
  id: number;
  title: string;
  description: string;
  formationId: number;
  imageUrl?: string;
  clientName?: string;
  projectDate?: string;
  active: boolean;
}
```

---

## 5. Blog Models

### Blog
**Complete blog object**
```typescript
{
  id: number;
  title: string;                    // Required, max 255 chars
  description: string;              // Text, can be very long
  youtubeUrl?: string;              // YouTube video URL
  imageUrl?: string;                // Featured image
  publishDate: string;              // ISO 8601, defaults to now
  active: boolean;                  // Visibility flag
  createdAt: string;                // ISO 8601
  updatedAt: string;                // ISO 8601
}
```

### BlogSimple
**Lightweight blog for listings**
```typescript
{
  id: number;
  title: string;
  description: string;              // Truncated
  imageUrl?: string;
  publishDate: string;
  active: boolean;
}
```

### Blog Create/Update (multipart/form-data)
```typescript
{
  title: string;                    // Required
  description: string;              // Required
  youtubeUrl?: string;              // Optional
  publishDate?: string;             // Optional, ISO 8601
  active: boolean;                  // Default: true
  image?: File;                     // Optional, max 10MB
}
```

### BlogStats
```typescript
{
  total: number;
  active: number;
  inactive: number;
}
```

---

## 6. Calendar Models

### CalendarDto
**Complete calendar event**
```typescript
{
  id: number;
  title: string;                    // Required
  formationId: number;              // Required, FK to formation
  formation?: FormationDto;         // Optional, nested
  startDate: string;                // Required, ISO 8601
  endDate: string;                  // Required, ISO 8601
  location: string;                 // Required, e.g., "Paris"
  maxCapacity: number;              // Required, positive
  currentCapacity: number;          // Default: 0
  description?: string;             // Text
  price: number;                    // Decimal(10,2)
  active: boolean;                  // Default: true
  createdAt: string;                // ISO 8601
  updatedAt: string;                // ISO 8601
}
```

### CalendarRequestDto
**For creating/updating events**
```typescript
{
  title: string;                    // Required
  formationId: number;              // Required
  startDate: string;                // Required, ISO 8601
  endDate: string;                  // Required, ISO 8601
  location: string;                 // Required
  maxCapacity: number;              // Required, min: 1
  currentCapacity?: number;         // Optional, default: 0
  description?: string;             // Optional
  price: number;                    // Required
  active: boolean;                  // Default: true
}
```

### CalendarReservation
**User reservation for event**
```typescript
{
  id: number;
  calendarId: number;               // FK to calendar
  userEmail: string;                // Required, valid email
  userName: string;                 // Required
  numberOfAttendees: number;        // Required, min: 1
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;                // ISO 8601
}
```

---

## 7. Review Models

### ReviewDto
**Formation review**
```typescript
{
  id: number;
  formationId: number;              // Required, FK to formation
  formation?: FormationDto;         // Optional, nested
  userName: string;                 // Required, max 100 chars
  userEmail: string;                // Required, valid email
  rating: number;                   // Required, 1-5
  comment: string;                  // Text
  createdAt: string;                // ISO 8601
  approved?: boolean;               // Moderation flag
}
```

### Review Create
```typescript
{
  formationId: number;              // Required
  userName: string;                 // Required
  userEmail: string;                // Required
  rating: number;                   // Required, 1-5
  comment: string;                  // Required, min 10 chars
}
```

---

## 8. Request Models

### AnnexRequestDto
**Submit training request**
```typescript
{
  companyName: string;              // Required, max 255 chars
  contactName: string;              // Required, max 100 chars
  email: string;                    // Required, valid email
  phone?: string;                   // Optional
  trainingType: "in-person" | "remote" | "hybrid";  // Required
  theme: string;                    // Required, formation theme
  numParticipants: number;          // Required, min: 1
  notes?: string;                   // Optional, additional info
  agreeToTerms?: boolean;           // Optional checkbox
}
```

### AnnexRequestResponseDto
**Response with status**
```typescript
{
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  trainingType: string;
  theme: string;
  numParticipants: number;
  notes?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;                // ISO 8601
  updatedAt: string;                // ISO 8601
}
```

---

## 9. Contact Models

### ContactDto
**Contact form submission**
```typescript
{
  id?: number;                      // Response only
  name: string;                     // Required, max 100 chars
  email: string;                    // Required, valid email
  subject: string;                  // Required, max 200 chars
  message: string;                  // Required, min 10 chars
  createdAt?: string;               // Response only, ISO 8601
}
```

### NewsletterDto
**Newsletter subscription**
```typescript
{
  id?: number;                      // Response only
  email: string;                    // Required, unique, valid
  subscribedAt?: string;            // Response only, ISO 8601
  active?: boolean;                 // Response only
}
```

---

## 10. Common Models

### Company
**Company information**
```typescript
{
  id: number;
  name: string;                     // Required
  description?: string;             // Text
  email: string;                    // Required, valid
  phone: string;                    // Required
  address?: string;                 // Full address
  logoUrl?: string;                 // Company logo
  website?: string;                 // URL
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  createdAt: string;                // ISO 8601
  updatedAt: string;                // ISO 8601
}
```

### Highlight
**Homepage feature highlights**
```typescript
{
  id: number;
  title: string;                    // Required, max 100 chars
  description: string;              // Required, max 255 chars
  iconClass: string;                // Bootstrap icon class
  displayOrder: number;             // Sort order
  visible: boolean;                 // Show/hide flag
}
```

### Category
**Legacy category system**
```typescript
{
  id: number;
  name: string;                     // Unique
  description?: string;
  iconClass?: string;
}
```

### FileInfo
**File metadata**
```typescript
{
  name: string;                     // Filename
  path: string;                     // Relative path
  type: "uploaded" | "asset";       // Source type
  size: string;                     // Human-readable size
  url?: string;                     // Full URL
}
```

---

## 📝 Common Patterns

### Timestamps
All entities include:
```typescript
{
  createdAt: string;  // ISO 8601: "2024-01-20T10:00:00Z"
  updatedAt: string;  // ISO 8601: "2024-01-20T15:30:00Z"
}
```

### Relationships
**Many-to-One**:
```typescript
{
  formationId: number;        // Foreign key
  formation?: FormationDto;   // Nested object (optional)
}
```

**One-to-Many**:
```typescript
{
  reviews: ReviewDto[];       // Array of related objects
}
```

### Pagination (Future)
```typescript
{
  content: T[];               // Array of items
  page: number;               // Current page (0-based)
  size: number;               // Items per page
  totalElements: number;      // Total items
  totalPages: number;         // Total pages
}
```

---

## ✅ Validation Rules

### Common Validations

**Email**:
- Format: `^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$`
- Example: `user@example.com`

**Slug**:
- Format: `^[a-z0-9]+(?:-[a-z0-9]+)*$`
- Example: `advanced-leadership-training`

**Price**:
- Type: Decimal(10,2)
- Min: 0
- Example: `1500.00`

**Rating**:
- Type: Integer
- Min: 1
- Max: 5

**Phone**:
- Format: International format recommended
- Example: `+33 1 23 45 67 89`

**URL**:
- Format: Valid HTTP/HTTPS URL
- Example: `https://example.com`

**Date**:
- Format: ISO 8601
- Example: `2024-01-20` (date) or `2024-01-20T10:00:00Z` (datetime)

---

## 🎯 Frontend Integration Examples

### TypeScript Interfaces

```typescript
// formations.model.ts
export interface Formation {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  themeId?: number;
  price: number;
  duration: string;
  imageUrl?: string;
  level: FormationLevel;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum FormationLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT'
}

// portfolio.model.ts
export interface Portfolio {
  id: number;
  title: string;
  description: string;
  formationId: number;
  imageUrl?: string;
  clientName?: string;
  projectDate?: string;
  projectUrl?: string;
  companyLogoUrl?: string;
  category: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// blog.model.ts
export interface Blog {
  id: number;
  title: string;
  description: string;
  youtubeUrl?: string;
  imageUrl?: string;
  publishDate: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// calendar.model.ts
export interface CalendarEvent {
  id: number;
  title: string;
  formationId: number;
  startDate: string;
  endDate: string;
  location: string;
  maxCapacity: number;
  currentCapacity: number;
  description?: string;
  price: number;
  active: boolean;
}

// request.model.ts
export interface TrainingRequest {
  id?: number;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  trainingType: 'in-person' | 'remote' | 'hybrid';
  theme: string;
  numParticipants: number;
  notes?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}
```

---

## 🔄 Request/Response Examples

### Create Formation
**Request**:
```json
POST /api/formations
Content-Type: application/json

{
  "title": "Advanced Leadership Skills",
  "slug": "advanced-leadership-skills",
  "description": "Develop advanced leadership capabilities",
  "category": "Management",
  "themeId": 1,
  "price": 2500.00,
  "duration": "3 days",
  "imageUrl": "/uploads/leadership.jpg",
  "level": "EXPERT",
  "published": true
}
```

**Response** (201 Created):
```json
{
  "id": 15,
  "title": "Advanced Leadership Skills",
  "slug": "advanced-leadership-skills",
  "description": "Develop advanced leadership capabilities",
  "category": "Management",
  "themeId": 1,
  "price": 2500.00,
  "duration": "3 days",
  "imageUrl": "/uploads/leadership.jpg",
  "level": "EXPERT",
  "published": true,
  "createdAt": "2024-01-20T10:00:00Z",
  "updatedAt": "2024-01-20T10:00:00Z"
}
```

### Get Formations
**Request**:
```
GET /api/formations?level=EXPERT
```

**Response** (200 OK):
```json
[
  {
    "id": 15,
    "title": "Advanced Leadership Skills",
    "slug": "advanced-leadership-skills",
    "price": 2500.00,
    "level": "EXPERT",
    "published": true,
    "...": "..."
  },
  {
    "id": 16,
    "title": "Executive Coaching",
    "slug": "executive-coaching",
    "price": 3000.00,
    "level": "EXPERT",
    "published": true,
    "...": "..."
  }
]
```

---

## 📊 Error Response Format

```typescript
{
  error: string;          // Error type
  message: string;        // Human-readable message
  details?: string;       // Additional context
  timestamp: string;      // ISO 8601
  path?: string;          // Request path
  status?: number;        // HTTP status code
}
```

**Example**:
```json
{
  "error": "ResourceNotFound",
  "message": "Formation with ID 999 not found",
  "timestamp": "2024-01-20T10:00:00Z",
  "path": "/api/formations/999",
  "status": 404
}
```

---

## 🎨 Design System Data

### Formation Levels
```typescript
const FORMATION_LEVELS = {
  BEGINNER: {
    label: 'Débutant',
    color: '#4CAF50',
    icon: 'bi-star'
  },
  INTERMEDIATE: {
    label: 'Intermédiaire',
    color: '#FF9800',
    icon: 'bi-star-fill'
  },
  EXPERT: {
    label: 'Expert',
    color: '#F44336',
    icon: 'bi-star-fill'
  }
};
```

### Training Types
```typescript
const TRAINING_TYPES = {
  'in-person': {
    label: 'Présentiel',
    icon: 'bi-people-fill',
    description: 'Formation dans vos locaux'
  },
  'remote': {
    label: 'Distanciel',
    icon: 'bi-display',
    description: 'Classes virtuelles'
  },
  'hybrid': {
    label: 'Hybride',
    icon: 'bi-layers',
    description: 'Combinaison présentiel et e-learning'
  }
};
```

### Request Status
```typescript
const REQUEST_STATUS = {
  PENDING: {
    label: 'En attente',
    color: '#FFC107',
    icon: 'bi-clock'
  },
  APPROVED: {
    label: 'Approuvé',
    color: '#4CAF50',
    icon: 'bi-check-circle'
  },
  REJECTED: {
    label: 'Rejeté',
    color: '#F44336',
    icon: 'bi-x-circle'
  }
};
```

---

**Reference**: Use these models to build type-safe frontend applications with TypeScript, Angular, React, Vue, or any other framework.
