package com.mssd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MssdApplication {

    public static void main(String[] args) {
        // Render injects DATABASE_URL as "postgres://user:pass@host:port/db"
        // but Spring Boot needs "jdbc:postgresql://host:port/db".
        // Convert it automatically when detected.
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            if (databaseUrl.startsWith("postgres://")) {
                databaseUrl = databaseUrl.replace("postgres://", "jdbc:postgresql://");
            } else if (databaseUrl.startsWith("postgresql://")) {
                databaseUrl = "jdbc:" + databaseUrl;
            }
            // Parse user:pass from the URL and set as Spring properties
            // jdbc:postgresql://user:pass@host:port/db
            try {
                java.net.URI uri = new java.net.URI(databaseUrl.replace("jdbc:", ""));
                String userInfo = uri.getUserInfo();
                if (userInfo != null && userInfo.contains(":")) {
                    String[] parts = userInfo.split(":", 2);
                    System.setProperty("spring.datasource.username", parts[0]);
                    System.setProperty("spring.datasource.password", parts[1]);
                    // Reconstruct URL without credentials
                    int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                    String cleanUrl = "jdbc:postgresql://" + uri.getHost() + ":" + port + uri.getPath();
                    if (uri.getQuery() != null && !uri.getQuery().isEmpty()) {
                        cleanUrl += "?" + uri.getQuery();
                    }
                    System.setProperty("spring.datasource.url", cleanUrl);
                } else {
                    System.setProperty("spring.datasource.url", databaseUrl);
                }
                System.out.println("DATABASE_URL detected and configured for Spring Boot (host: " + uri.getHost() + ")");
            } catch (Exception e) {
                // Fallback: set the URL directly, Spring may still parse it
                System.setProperty("spring.datasource.url", databaseUrl);
                System.err.println("Warning: Could not fully parse DATABASE_URL: " + e.getMessage());
            }
        } else {
            // Log which PG* vars are present for debugging
            System.out.println("No DATABASE_URL found. Using PG* env vars:");
            System.out.println("  PGHOST=" + (System.getenv("PGHOST") != null ? System.getenv("PGHOST") : "(not set → defaults to localhost)"));
            System.out.println("  PGPORT=" + (System.getenv("PGPORT") != null ? System.getenv("PGPORT") : "(not set → defaults to 5432)"));
            System.out.println("  PGDATABASE=" + (System.getenv("PGDATABASE") != null ? System.getenv("PGDATABASE") : "(not set → defaults to mssd)"));
            System.out.println("  PGUSER=" + (System.getenv("PGUSER") != null ? "(set)" : "(not set → defaults to postgres)"));
            System.out.println("  PGPASSWORD=" + (System.getenv("PGPASSWORD") != null ? "(set)" : "(not set → defaults to postgres)"));
        }

        SpringApplication.run(MssdApplication.class, args);
    }
}
