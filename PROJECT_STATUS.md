# MSSD Project Status & Roadmap

This document summarizes the recent fixes, infrastructure updates, and the remaining tasks/features that need to be finished or fixed in the application.

## ✅ What We've Done (Completed)

### 1. DevOps & Infrastructure
*   **Dockerization**: Created optimized multi-stage `Dockerfile`s for both Backend (Maven + JRE) and Frontend (Node + Nginx).
*   **Docker Compose**: Configured `docker-compose.yml` to orchestrate `mssd-frontend`, `mssd-backend`, and `mssd-db` (MySQL) with proper named volumes and networking.
*   **CI/CD Pipelines**: 
    *   Set up GitHub Actions (`ci-cd.yml`) for automated building, testing, linting, Docker image pushing, and SSH deployment.
    *   Fixed CI specific issues (handling missing secrets gracefully, fixing Surefire plugin test failures by decoupling the `dev` profile from default config).
*   **Nginx Proxy**: Configured Nginx to properly serve the Angular SPA and reverse-proxy `/api/*` requests to the Spring Boot backend to avoid CORS issues.

### 2. Backend (Spring Boot)
*   **Theme & Formations API**: Fixed the `404 Not Found` error when fetching formations by theme slug (`/api/themes/{slug}/formations`). Rewrote the JPA queries to use proper `LEFT JOIN FETCH` with `findBySlugAndActiveTrue`.
*   **Data Models**: Fixed Lombok `@Builder` initialization warnings in `Portfolio.java`.
*   **Dependencies**: Upgraded the deprecated `mysql-connector-java` to the modern `com.mysql:mysql-connector-j`.
*   **Testing Environment**: Isolated tests using `@ActiveProfiles("dev")` and cleaned up invalid `application-dev.properties` syntax.

### 3. Frontend (Angular)
*   **Mobile Navigation**: Fixed the broken mobile hamburger menu (`bi-list` to `bi-x`) by moving the DOM manipulation from vanilla JS (`main.js`) into correct Angular template bindings (`(click)`, `[class]`, etc.) in the `flexstart-layout` component.
*   **SCSS Modernization**: Resolved 41+ Sass deprecation warnings by replacing `darken()` and `lighten()` with `color.adjust()` and injecting `@use 'sass:color';` across 13 admin/page stylesheets.
*   **Template Fixes**: Fixed compilation errors related to unnecessary optional chaining (`?.`) in Angular templates (e.g., `admin-contacts.html`).
*   **Routing & UI**: Updated imports (`@import` to `@use`) in global styles and ensured clean zero-warning production builds.

---

## ❌ What's Missing & Needs Finishing (To Do)

*The following features and pages are known to be incomplete, not working properly, or requiring further integration testing.*

### 1. Admin Dashboard & CMS Features
*   **File/Image Upload Behavior**: Need to verify if image uploads (for Blogs, Portfolio, and Formations) properly persist in the Docker volumes (`/app/uploads`), and that the Angular frontend correctly displays them via the `/api/files/{filename}` endpoint.
*   **Forms Validations**: Review the Admin create/edit forms. Ensure that all required fields are validated and that appropriate error messages are shown (e.g., duplicate slugs or missing titles).

### 2. User Features & Frontend Pages
*   **Calendar & Reservations Flow**: Verify the end-to-end flow for calendar events. Ensure users can successfully make a request/reservation and that the Admin dashboard reflects these status changes (`PENDING`, `APPROVED`, etc.).
*   **Custom Requests (Devis)**: Ensure the "Demander un Devis" forms are properly linked to the backend mailer/database.
*   **Blog System**: Check the pagination, WYSIWYG editor content rendering (HTML sanitization), and ensure images in blog posts don't break the layout.
*   **Broken Links / 404s**: Perform a full click-through of the application to ensure no buttons or placeholder `href="#"` links result in dead ends.

### 3. Security & Authentication
*   **Authentication Flow**: Verify the Login/Logout system works flawlessly (JWT token storage, Interceptors attaching the Bearer token, auto-logout on token expiration).
*   **Route Guards**: Ensure that unauthenticated users cannot access `/admin/*` routes by bypassing the UI.

### 4. Production Readiness
*   **Email Configuration**: Configure the actual SMTP settings in `application-prod.properties` so the app can send out contact form notifications and reservation confirmations.
*   **SSL/HTTPS**: Implement SSL certificates (e.g., via Let's Encrypt / Certbot) on the Nginx reverse proxy for secure production traffic.

*(Note: Update this checklist as you verify and fix each feature!)*